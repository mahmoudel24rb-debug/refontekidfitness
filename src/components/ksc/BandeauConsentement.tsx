'use client'

import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TOUT_ACCEPTER, TOUT_REFUSER, type Choix } from '@/lib/consentement'
import {
  abonner,
  enregistrerChoix,
  fermerPanneau,
  lireEtat,
  lireEtatServeur,
} from '@/lib/consentementNavigateur'
import { cn } from '@/lib/utils'

// Bandeau de consentement aux cookies (règles CNIL), monté par les deux
// layouts publics, jamais dans l'admin. Carte fixe en bas de l'écran, non
// modale : la page reste lisible et utilisable, et poursuivre la navigation
// ne vaut pas accord.
// - Premier niveau : « Tout refuser » et « Tout accepter », deux boutons
//   pleins de même taille et de même forme, et « Personnaliser » en lien.
// - Panneau : une ligne par catégorie avec un interrupteur (role="switch"),
//   jamais précoché ; « Nécessaires » toujours actif.
// - Affiché seulement sans choix mémorisé, ou rouvert par « Gérer les
//   cookies » (footer, page /cookies). Échap referme le panneau sans rien
//   enregistrer : jamais d'accord implicite.
// - Rendu uniquement dans le navigateur : l'état vient de
//   useSyncExternalStore avec un instantané serveur nul, donc ni rendu
//   serveur ni écart à l'hydratation.

// Focus clavier visible sur les boutons pilule (le composant Button retire le
// contour du focus global) : même contour que le reste du site.
const FOCUS =
  'cursor-pointer focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1060c873]'
// « Tout refuser » et « Tout accepter » : même taille, même forme, même poids.
const BOUTON_CHOIX = cn(FOCUS, 'flex-1 px-4 sm:min-w-[152px] sm:flex-none')
const LIEN =
  'cursor-pointer font-bold text-marine underline decoration-2 underline-offset-4 transition-colors duration-150 hover:text-magenta'
const TITRE = 'font-heading text-lg leading-tight font-bold text-marine sm:text-xl'

export default function BandeauConsentement() {
  const etat = useSyncExternalStore(abonner, lireEtat, lireEtatServeur)
  // Panneau ouvert depuis le premier niveau (« Personnaliser »).
  const [personnaliser, setPersonnaliser] = useState(false)
  // Retour au premier niveau après le panneau : le focus revient sur « Personnaliser ».
  const [retour, setRetour] = useState(false)

  if (!etat) return null
  const vuePanneau = etat.panneau || personnaliser
  if (!vuePanneau && etat.choix) return null

  const choisir = (choix: Choix) => {
    setPersonnaliser(false)
    setRetour(false)
    enregistrerChoix(choix)
  }
  // Échap ou « Fermer » : le panneau se referme sans rien enregistrer. Rouvert
  // par « Gérer les cookies », il rend le focus au bouton d'origine ; ouvert
  // depuis le bandeau, le focus revient sur « Personnaliser ».
  const fermer = () => {
    setPersonnaliser(false)
    setRetour(!etat.panneau)
    if (etat.panneau) fermerPanneau()
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-45 flex justify-center px-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-5 sm:pb-5">
      <div
        role="region"
        aria-label="Gestion des cookies"
        onKeyDown={(e) => {
          if (e.key === 'Escape' && vuePanneau) {
            e.stopPropagation()
            fermer()
          }
        }}
        // Hauteur bornée sous l'en-tête collant du site (96 px) : au-delà, la
        // carte défile en interne.
        className="pointer-events-auto max-h-[calc(100dvh-120px)] w-full max-w-[720px] overflow-y-auto rounded-xl border border-border bg-white p-5 text-ink shadow-[0_18px_50px_rgb(8_22_70/0.22)] sm:p-6"
      >
        {vuePanneau ? (
          <Panneau key={etat.ouvertures} initial={etat.choix} onChoix={choisir} onFermer={fermer} />
        ) : (
          <PremierNiveau focusPersonnaliser={retour} onPersonnaliser={() => setPersonnaliser(true)} onChoix={choisir} />
        )}
      </div>
    </div>
  )
}

function PremierNiveau({
  focusPersonnaliser,
  onPersonnaliser,
  onChoix,
}: {
  focusPersonnaliser: boolean
  onPersonnaliser: () => void
  onChoix: (choix: Choix) => void
}) {
  const personnaliserRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (focusPersonnaliser) personnaliserRef.current?.focus()
  }, [focusPersonnaliser])

  return (
    <>
      <p className={TITRE}>Vos choix sur les cookies</p>
      <p className="mt-2 text-sm leading-relaxed sm:text-[15px]">
        Avec votre accord, nous utilisons des cookies pour mesurer l’audience du site et suivre nos campagnes
        publicitaires (Google, Meta). Vous pouvez modifier votre choix à tout moment.{' '}
        <a href="/cookies" className={cn(LIEN, 'whitespace-nowrap')}>
          En savoir plus
        </a>
      </p>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
        <div className="flex w-full gap-3 sm:w-auto">
          <Button type="button" variant="marine" size="sm" className={BOUTON_CHOIX} onClick={() => onChoix(TOUT_REFUSER)}>
            Tout refuser
          </Button>
          <Button type="button" size="sm" className={BOUTON_CHOIX} onClick={() => onChoix(TOUT_ACCEPTER)}>
            Tout accepter
          </Button>
        </div>
        <button ref={personnaliserRef} type="button" onClick={onPersonnaliser} className={cn(LIEN, 'text-[15px] sm:ml-2')}>
          Personnaliser
        </button>
      </div>
    </>
  )
}

function Panneau({
  initial,
  onChoix,
  onFermer,
}: {
  initial: Choix | null
  onChoix: (choix: Choix) => void
  onFermer: () => void
}) {
  // Jamais précoché : sans choix mémorisé, les deux catégories partent refusées.
  const [audience, setAudience] = useState(initial?.audience ?? false)
  const [publicite, setPublicite] = useState(initial?.publicite ?? false)
  const titreRef = useRef<HTMLParagraphElement>(null)
  const id = useId()
  // À l'ouverture, le focus passe sur le titre du panneau.
  useEffect(() => {
    titreRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <p ref={titreRef} tabIndex={-1} className={TITRE}>
          Personnaliser mes choix
        </p>
        <button
          type="button"
          aria-label="Fermer sans enregistrer"
          onClick={onFermer}
          className="-mt-1.5 -mr-1.5 grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-marine transition-colors duration-150 hover:bg-cream-2"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed">
        {'Activez ou désactivez chaque catégorie. Votre choix est conservé 6 mois et reste modifiable à tout moment depuis le lien « Gérer les cookies » en bas de page.'}
      </p>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        <Categorie
          id={`${id}-necessaires`}
          titre="Nécessaires"
          description={'Indispensables au fonctionnement du site : ils mémorisent vos choix sur les cookies.'}
          toujours
        />
        <Categorie
          id={`${id}-audience`}
          titre="Mesure d’audience"
          description="Statistiques de visite (par exemple Google Analytics, via Google Tag Manager) pour comprendre l’utilisation du site et l’améliorer."
          coche={audience}
          onChange={setAudience}
        />
        <Categorie
          id={`${id}-publicite`}
          titre="Publicité et suivi des campagnes"
          description="Mesure de l’efficacité de nos publicités Google et Meta, et mémorisation de la source de votre visite, transmise avec vos demandes de contact."
          coche={publicite}
          onChange={setPublicite}
        />
      </ul>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex w-full gap-3 sm:w-auto">
          <Button type="button" variant="marine" size="sm" className={BOUTON_CHOIX} onClick={() => onChoix(TOUT_REFUSER)}>
            Tout refuser
          </Button>
          <Button type="button" size="sm" className={BOUTON_CHOIX} onClick={() => onChoix(TOUT_ACCEPTER)}>
            Tout accepter
          </Button>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn(FOCUS, 'px-5 sm:ml-auto')}
          onClick={() => onChoix({ audience, publicite })}
        >
          Enregistrer mes choix
        </Button>
      </div>
    </>
  )
}

function Categorie({
  id,
  titre,
  description,
  toujours = false,
  coche = false,
  onChange,
}: {
  id: string
  titre: string
  description: string
  /** Catégorie toujours active, non désactivable. */
  toujours?: boolean
  coche?: boolean
  onChange?: (valeur: boolean) => void
}) {
  const actif = toujours || coche
  return (
    <li className="flex items-start justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span id={`${id}-titre`} className="font-bold text-marine">
            {titre}
          </span>
          {toujours && (
            <span className="rounded-full bg-cream-2 px-2.5 py-0.5 text-xs font-bold text-marine">Toujours actifs</span>
          )}
        </p>
        <p id={`${id}-texte`} className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground sm:text-[13.5px]">
          {description}
        </p>
      </div>
      <div className="shrink-0 pt-0.5">
        <button
          type="button"
          role="switch"
          aria-checked={actif}
          aria-labelledby={`${id}-titre`}
          aria-describedby={`${id}-texte`}
          disabled={toujours}
          onClick={() => onChange?.(!coche)}
          className={cn(
            'relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center rounded-full border-2 transition-colors duration-150 disabled:cursor-not-allowed',
            toujours ? 'border-transparent bg-marine/35' : coche ? 'border-magenta bg-magenta' : 'border-[#cfc8b4] bg-cream-2',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'block size-[18px] rounded-full bg-white shadow-sm transition-transform duration-150',
              actif ? 'translate-x-[22px]' : 'translate-x-[2px]',
            )}
          />
        </button>
      </div>
    </li>
  )
}
