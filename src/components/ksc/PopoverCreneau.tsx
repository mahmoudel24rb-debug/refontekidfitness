'use client'

import React, { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  couleurAge,
  formatDuree,
  formatFin,
  formatHeure,
  liensTranche,
  type CreneauCal,
} from '@/lib/planningLayout'

// Fiche d'un créneau. Transposition du PlanningPopover de Parc Beauregard :
// une seule surface à deux modes,
//   - « apercu »  : au survol après 250 ms, purement informatif, non cliquable ;
//   - « epingle » : au clic ou à Entrée, role=dialog, Échap referme et rend le
//                   focus au bloc d'origine.
// Sous 640px, la fiche épinglée devient une feuille basse avec voile.
//
// Le positionnement est en `fixed` à partir du rectangle du bloc : la grille
// défile horizontalement sur mobile, une fiche en absolu y serait rognée.
// Les z-index restent SOUS le header sticky du site (z-50).

export type ModePopover = 'apercu' | 'epingle'

export type PopoverCreneauProps = {
  creneau: CreneauCal
  rect: { top: number; left: number; bottom: number; width: number }
  mode: ModePopover
  onFermer: (rendreLeFocus: boolean) => void
}

const MARGE = 10

// Largeur d'écran : lue par useSyncExternalStore avec un instantané serveur
// neutre (jamais de feuille basse dans le HTML rendu côté serveur) plutôt que
// posée en état dans un effet. Fonctions hors composant pour rester stables.
const FEUILLE = '(max-width: 639px)'
const abonnerFeuille = (rappel: () => void) => {
  const mq = window.matchMedia(FEUILLE)
  mq.addEventListener('change', rappel)
  return () => mq.removeEventListener('change', rappel)
}
const enFeuilleClient = () => window.matchMedia(FEUILLE).matches
const enFeuilleServeur = () => false

export default function PopoverCreneau({ creneau, rect, mode, onFermer }: PopoverCreneauProps) {
  const boite = useRef<HTMLDivElement>(null)
  const feuille = useSyncExternalStore(abonnerFeuille, enFeuilleClient, enFeuilleServeur)
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: rect.bottom + 8,
    left: rect.left,
  })

  useLayoutEffect(() => {
    if (feuille) return
    const el = boite.current
    if (!el) return
    const l = Math.max(
      MARGE,
      Math.min(
        rect.left + rect.width / 2 - el.offsetWidth / 2,
        window.innerWidth - el.offsetWidth - MARGE,
      ),
    )
    const bas = rect.bottom + 8
    const t =
      bas + el.offsetHeight > window.innerHeight - MARGE
        ? Math.max(MARGE, rect.top - el.offsetHeight - 8)
        : bas
    setPos({ top: t, left: l })
  }, [rect, feuille, creneau.id])

  useEffect(() => {
    if (mode !== 'epingle') return
    boite.current?.focus()
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onFermer(true)
        return
      }
      // piège minimal : on garde la tabulation dans la fiche épinglée
      if (e.key !== 'Tab' || !boite.current) return
      const cibles = boite.current.querySelectorAll<HTMLElement>('a[href], button')
      if (!cibles.length) {
        e.preventDefault()
        return
      }
      const premier = cibles[0]
      const dernier = cibles[cibles.length - 1]
      const actif = document.activeElement
      if (e.shiftKey && (actif === premier || actif === boite.current)) {
        e.preventDefault()
        dernier.focus()
      } else if (!e.shiftKey && actif === dernier) {
        e.preventDefault()
        premier.focus()
      }
    }
    const auClic = (e: MouseEvent) => {
      if (boite.current && !boite.current.contains(e.target as Node)) onFermer(false)
    }
    document.addEventListener('keydown', auClavier)
    document.addEventListener('mousedown', auClic)
    return () => {
      document.removeEventListener('keydown', auClavier)
      document.removeEventListener('mousedown', auClic)
    }
  }, [mode, onFermer])

  const coul = couleurAge(creneau.age)
  const liens = liensTranche(creneau.age)
  const epingle = mode === 'epingle'
  const enFeuille = epingle && feuille
  const horaire =
    creneau.debutMin === null
      ? 'Horaire à confirmer'
      : `${formatHeure(creneau.debutMin)} – ${formatFin(creneau.debutMin, creneau.duree)} · ${formatDuree(creneau.duree)}`

  return (
    <>
      {enFeuille && (
        <div className="fixed inset-0 z-30 animate-in fade-in-0 bg-marine/45 duration-150" aria-hidden="true" />
      )}
      <div
        ref={boite}
        role={epingle ? 'dialog' : undefined}
        aria-modal={enFeuille ? true : undefined}
        aria-label={epingle ? `${creneau.activite}, ${creneau.jour}` : undefined}
        tabIndex={epingle ? -1 : undefined}
        data-popover-creneau={mode}
        className={cn(
          'fixed z-40 w-[280px] max-w-[calc(100vw-20px)] animate-in fade-in-0 slide-in-from-bottom-1 rounded-lg border border-border bg-white p-5 shadow-md duration-150',
          !epingle && 'pointer-events-none',
          enFeuille && 'inset-x-0 bottom-0 left-0 top-auto w-auto max-w-none rounded-b-none px-6 pb-7 pt-6',
        )}
        style={enFeuille ? undefined : { top: pos.top, left: pos.left }}
      >
        <p className="font-heading text-[17px] font-bold leading-snug text-marine">{creneau.activite}</p>
        <p className="mt-1 text-[14px] font-bold" style={{ color: coul.texte }}>
          {horaire}
        </p>
        <p className="mt-2.5 flex items-center gap-2 text-[14px] text-ink">
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-full"
            style={{ background: coul.pleine }}
          />
          {creneau.salle}
          <span className="text-muted-foreground">· {coul.label}</span>
        </p>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Tous les {creneau.jour.toLowerCase()}s
        </p>
        {liens.length > 0 && (
          <ul className="mt-3.5 flex flex-col gap-2">
            {liens.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-lien-tranche
                  className="inline-flex items-center gap-1.5 text-[14px] font-bold text-magenta hover:text-magenta-hover"
                >
                  {l.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}
        {epingle && (
          <button
            type="button"
            onClick={() => onFermer(true)}
            className="mt-3 block text-[13px] font-semibold text-muted-foreground hover:text-marine"
          >
            Fermer
          </button>
        )}
      </div>
    </>
  )
}
