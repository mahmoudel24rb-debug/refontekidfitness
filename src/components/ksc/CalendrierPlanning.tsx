'use client'

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import FiltreActivites from './FiltreActivites'
import GrilleTemps from './GrilleTemps'
import ListePlanning from './ListePlanning'
import PopoverCreneau, { type ModePopover } from './PopoverCreneau'
import {
  JOURS,
  activitesDisponibles,
  agesPresents,
  bornesAxe,
  type CreneauCal,
} from '@/lib/planningLayout'

// Calendrier « Semaine type » de /planning.
//
// Même architecture que le calendrier livré côté Parc Beauregard : un état
// central, des vues enfants qui reçoivent les créneaux DÉJÀ filtrés, une
// bascule de vue en groupe de boutons sur desktop et en select natif sur
// mobile. Pas de CRUD, pas de drag & drop, pas de navigation de dates : un
// planning hebdomadaire type n'a ni dates ni édition.
//
// Différence KSC : la légende et les couleurs sont par TRANCHE D'ÂGE, et la
// fiche d'un créneau renvoie vers la ou les fiches de cours de sa tranche.

export type Vue = 'semaine' | 'jour' | 'liste'

export type CalendrierPlanningProps = { creneaux: CreneauCal[] }

const VUES: { cle: Vue; libelle: string }[] = [
  { cle: 'semaine', libelle: 'Semaine' },
  { cle: 'jour', libelle: 'Jour' },
  { cle: 'liste', libelle: 'Liste' },
]

const btnCls =
  'inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-[14px] font-bold text-marine transition-colors duration-150 disabled:cursor-default disabled:opacity-45'

// Deux valeurs n'existent qu'au navigateur : le jour courant (le serveur ne
// connaît pas le fuseau du visiteur) et la largeur de l'écran. Elles sont lues
// par useSyncExternalStore avec un instantané SERVEUR neutre — pas d'état posé
// dans un effet, donc pas de rendu en cascade au montage ni d'écart
// d'hydratation. Les fonctions vivent hors du composant pour rester stables.
const AUCUN_ABONNEMENT = () => () => {}

const jourCourant = (): string | null => {
  const i = new Date().getDay() // 0 = dimanche
  return i >= 1 && i <= 6 ? JOURS[i - 1] : null
}
const aucunJour = () => null

const PETIT_ECRAN = '(max-width: 1023px)'
const abonnerPetitEcran = (rappel: () => void) => {
  const mq = window.matchMedia(PETIT_ECRAN)
  mq.addEventListener('change', rappel)
  return () => mq.removeEventListener('change', rappel)
}
const estPetitEcran = () => window.matchMedia(PETIT_ECRAN).matches
const pasPetitEcran = () => false

export default function CalendrierPlanning({ creneaux }: CalendrierPlanningProps) {
  const aujourdhui = useSyncExternalStore(AUCUN_ABONNEMENT, jourCourant, aucunJour)
  const petitEcran = useSyncExternalStore(abonnerPetitEcran, estPetitEcran, pasPetitEcran)

  // Vue et jour : le choix explicite du visiteur l'emporte, sinon on retombe
  // sur le défaut déduit du contexte (vue Jour sur petit écran, jour courant).
  const [vueChoisie, setVueChoisie] = useState<Vue | null>(null)
  const vue: Vue = vueChoisie ?? (petitEcran ? 'jour' : 'semaine')
  const [jourChoisi, setJourChoisi] = useState<string | null>(null)
  const jourActif = jourChoisi ?? aujourdhui ?? JOURS[0]
  const boutonsVue = useRef<(HTMLButtonElement | null)[]>([])

  // Filtre : sélection vide = tout visible. Les bornes de l'axe et la légende
  // restent calculées sur l'ENSEMBLE des créneaux, pour que la grille ne se
  // réorganise pas sous les yeux du visiteur quand il coche une activité.
  const [activites, setActivites] = useState<string[]>([])
  const filtres = useMemo(
    () => (activites.length ? creneaux.filter((c) => activites.includes(c.activite)) : creneaux),
    [creneaux, activites],
  )
  const toutesActivites = useMemo(() => activitesDisponibles(creneaux), [creneaux])
  const bornes = useMemo(() => bornesAxe(creneaux), [creneaux])
  const tranches = useMemo(() => agesPresents(creneaux), [creneaux])

  // Fiche de créneau : une seule ouverte à la fois. L'aperçu au survol attend
  // 250 ms (le pointeur qui traverse la grille ne doit pas la faire clignoter)
  // et ne s'active qu'avec une vraie souris.
  const [fiche, setFiche] = useState<{
    creneau: CreneauCal
    rect: { top: number; left: number; bottom: number; width: number }
    mode: ModePopover
  } | null>(null)
  const ancre = useRef<HTMLElement | null>(null)
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null)

  const annulerMinuterie = () => {
    if (minuterie.current) clearTimeout(minuterie.current)
    minuterie.current = null
  }
  useEffect(() => annulerMinuterie, [])

  const rectDe = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    return { top: r.top, left: r.left, bottom: r.bottom, width: r.width }
  }

  const ouvrirFiche = (creneau: CreneauCal, el: HTMLElement) => {
    annulerMinuterie()
    ancre.current = el
    setFiche({ creneau, rect: rectDe(el), mode: 'epingle' })
  }

  const survolerFiche = (creneau: CreneauCal | null, el: HTMLElement | null) => {
    annulerMinuterie()
    if (fiche?.mode === 'epingle') return
    if (!creneau || !el) {
      setFiche(null)
      return
    }
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    minuterie.current = setTimeout(() => setFiche({ creneau, rect: rectDe(el), mode: 'apercu' }), 250)
  }

  const fermerFiche = (rendreLeFocus: boolean) => {
    annulerMinuterie()
    setFiche(null)
    if (rendreLeFocus) ancre.current?.focus()
    ancre.current = null
  }

  const indexJour = JOURS.indexOf(jourActif)
  const allerAuJour = (delta: number) => {
    const cible = indexJour + delta
    if (cible >= 0 && cible < JOURS.length) setJourChoisi(JOURS[cible])
  }

  // Groupe de boutons : une seule tabulation, flèches pour changer de vue
  // (motif « toolbar » ARIA — évite trois arrêts de tabulation avant la grille).
  const naviguerVues = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const suivant = (i + (e.key === 'ArrowRight' ? 1 : VUES.length - 1)) % VUES.length
    setVueChoisie(VUES[suivant].cle)
    boutonsVue.current[suivant]?.focus()
  }

  return (
    <section data-planning-calendrier aria-label="Calendrier des cours de la semaine">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Desktop : groupe de boutons. Mobile : select natif. */}
        <div
          role="group"
          aria-label="Choisir la vue"
          className="hidden gap-0.5 rounded-full bg-cream-2 p-1 sm:inline-flex"
        >
          {VUES.map((v, i) => (
            <button
              key={v.cle}
              type="button"
              ref={(el) => {
                boutonsVue.current[i] = el
              }}
              aria-pressed={vue === v.cle}
              tabIndex={vue === v.cle ? 0 : -1}
              onClick={() => setVueChoisie(v.cle)}
              onKeyDown={(e) => naviguerVues(e, i)}
              className={cn(
                btnCls,
                vue === v.cle ? 'bg-marine text-cream' : 'hover:bg-white',
              )}
            >
              {v.libelle}
            </button>
          ))}
        </div>
        <label className="flex-1 basis-[150px] sm:hidden">
          <span className="sr-only">Choisir la vue</span>
          <select
            value={vue}
            onChange={(e) => setVueChoisie(e.target.value as Vue)}
            className="w-full cursor-pointer rounded-xl border border-border bg-white px-3.5 py-2.5 text-[15px] font-bold text-marine"
          >
            {VUES.map((v) => (
              <option key={v.cle} value={v.cle}>
                {v.libelle}
              </option>
            ))}
          </select>
        </label>

        <FiltreActivites
          activites={toutesActivites}
          selection={activites}
          onChange={setActivites}
        />
      </div>

      {activites.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-[13.5px] text-muted-foreground">Filtres actifs :</span>
          {activites.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 rounded-full bg-magenta/10 py-1 pl-3 pr-1.5 text-[13.5px] font-bold text-magenta-hover"
            >
              {a}
              <button
                type="button"
                aria-label={`Retirer le filtre ${a}`}
                onClick={() => setActivites((s) => s.filter((x) => x !== a))}
                className="inline-flex size-5 items-center justify-center rounded-full bg-magenta/15 hover:bg-magenta/25"
              >
                <X className="size-3" strokeWidth={3} aria-hidden="true" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={() => setActivites([])}
            className="px-0.5 py-1 text-[13.5px] font-bold text-magenta underline underline-offset-[3px]"
          >
            Tout afficher
          </button>
        </div>
      )}

      {vue === 'jour' && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => allerAuJour(-1)}
            disabled={indexJour <= 0}
            aria-label="Jour précédent"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-white text-marine disabled:opacity-35"
          >
            <ChevronLeft className="size-[18px]" aria-hidden="true" />
          </button>
          <div
            role="group"
            aria-label="Choisir le jour"
            className="flex flex-1 gap-1.5 overflow-x-auto [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden"
          >
            {JOURS.map((j) => (
              <button
                key={j}
                type="button"
                aria-pressed={j === jourActif}
                onClick={() => setJourChoisi(j)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-[14px] font-bold transition-colors duration-150',
                  j === jourActif
                    ? 'border-marine bg-marine text-cream'
                    : 'border-border bg-white text-marine hover:border-marine/40',
                )}
              >
                {j}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => allerAuJour(1)}
            disabled={indexJour >= JOURS.length - 1}
            aria-label="Jour suivant"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-white text-marine disabled:opacity-35"
          >
            <ChevronRight className="size-[18px]" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => aujourdhui && setJourChoisi(aujourdhui)}
            disabled={!aujourdhui}
            className={cn(btnCls, 'ml-auto border-border bg-white hover:bg-cream-2')}
          >
            Aujourd&rsquo;hui
          </button>
        </div>
      )}

      {/* Légende des tranches d'âge (informative, non cliquable) */}
      <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
        {tranches.map((t) => (
          <li key={t.cle} className="flex items-center gap-2 text-[14px] font-semibold text-marine">
            <span
              aria-hidden="true"
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: t.pleine }}
            />
            {t.label}
          </li>
        ))}
      </ul>

      {vue === 'liste' ? (
        <ListePlanning jours={JOURS} creneaux={filtres} />
      ) : (
        <GrilleTemps
          jours={vue === 'jour' ? [jourActif] : JOURS}
          creneaux={filtres}
          bornes={bornes}
          aujourdhui={aujourdhui}
          variante={vue === 'jour' ? 'detailed' : 'compact'}
          onOuvrir={ouvrirFiche}
          onApercu={survolerFiche}
          ouvertId={fiche?.mode === 'epingle' ? fiche.creneau.id : null}
        />
      )}

      {fiche && (
        <PopoverCreneau
          creneau={fiche.creneau}
          rect={fiche.rect}
          mode={fiche.mode}
          onFermer={fermerFiche}
        />
      )}
    </section>
  )
}
