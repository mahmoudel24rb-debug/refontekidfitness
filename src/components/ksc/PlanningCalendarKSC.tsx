import React from 'react'

import { cn } from '@/lib/utils'
import type { CreneauPlat } from '@/lib/contenu'

// Calendrier hebdomadaire du club : une colonne par jour, les créneaux triés
// par heure. Chaque pastille est color-codée par TRANCHE D'ÂGE (légende en
// tête), la salle apparaît en sous-texte. Desktop : 6 colonnes. Mobile :
// défilement horizontal, une colonne par écran avec accroche (scroll-snap).

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] as const

// Tranches d'âge du planning + le cas « sans âge » (Pompom, Zumba…).
const TRANCHES = [
  { cle: '10-36 mois', label: '10-36 mois', pastille: 'bg-royal/10 text-royal', point: 'bg-royal' },
  { cle: '3-5 ans', label: '3-5 ans', pastille: 'bg-magenta/10 text-magenta', point: 'bg-magenta' },
  { cle: '6-14 ans', label: '6-14 ans', pastille: 'bg-marine/10 text-marine', point: 'bg-marine' },
  { cle: '', label: 'Tous', pastille: 'bg-muted-foreground/10 text-muted-foreground', point: 'bg-muted-foreground' },
] as const

const trancheDe = (age?: string) => TRANCHES.find((t) => t.cle === (age ?? '')) ?? TRANCHES[3]

/**
 * Heure d'un créneau en minutes, pour le tri (« 9h30 » -> 570, « 18h » -> 1080).
 * Un format inattendu part en fin de colonne plutôt que de casser l'ordre.
 */
export function heureEnMinutes(heure: string) {
  const m = /^(\d{1,2})h(\d{2})?$/.exec(heure.trim())
  if (!m) return Number.MAX_SAFE_INTEGER
  return Number(m[1]) * 60 + Number(m[2] ?? 0)
}

export default function PlanningCalendarKSC({ creneaux }: { creneaux: CreneauPlat[] }) {
  const colonnes = JOURS.map((jour) => ({
    jour,
    creneaux: creneaux
      .filter((c) => c.jour === jour)
      .sort((a, b) => heureEnMinutes(a.heure) - heureEnMinutes(b.heure)),
  })).filter((col) => col.creneaux.length > 0)

  return (
    <div>
      {/* Légende des tranches d'âge */}
      <ul className="mb-7 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
        {TRANCHES.map((t) => (
          <li key={t.label} className="inline-flex items-center gap-2 text-sm font-bold text-marine">
            <span className={cn('size-3 shrink-0 rounded-full', t.point)} aria-hidden="true" />
            {t.label}
          </li>
        ))}
      </ul>

      {/* Grille : 6 colonnes en desktop, défilement à l'horizontale en mobile */}
      <div className="-mx-6 overflow-x-auto px-6 pb-2 [scrollbar-width:thin] lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="flex snap-x snap-mandatory gap-4 lg:grid lg:snap-none lg:grid-cols-6 lg:gap-3">
          {colonnes.map((col) => (
            <div
              key={col.jour}
              className="min-w-[76vw] shrink-0 snap-start sm:min-w-[46vw] lg:min-w-0 lg:shrink"
            >
              {/* En-tête de jour collant pendant le défilement vertical */}
              <h2 className="sticky top-[97px] z-10 mb-3 rounded-md bg-marine px-3 py-2.5 text-center font-heading text-[17px] font-extrabold text-cream">
                {col.jour}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {col.creneaux.map((c, i) => {
                  const t = trancheDe(c.age)
                  return (
                    <li
                      key={`${c.heure}-${c.activite}-${i}`}
                      className={cn(
                        'rounded-md border border-border bg-white p-3 shadow-sm',
                        'border-l-4',
                        t.cle === '10-36 mois' && 'border-l-royal',
                        t.cle === '3-5 ans' && 'border-l-magenta',
                        t.cle === '6-14 ans' && 'border-l-marine',
                        t.cle === '' && 'border-l-muted-foreground',
                      )}
                    >
                      <p className="font-heading text-[15px] font-extrabold text-marine">{c.heure}</p>
                      <p className="mt-0.5 text-[14.5px] font-bold leading-snug text-ink">{c.activite}</p>
                      <span
                        className={cn(
                          'mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold',
                          t.pastille,
                        )}
                      >
                        {t.label}
                      </span>
                      <p className="mt-1.5 text-xs text-muted-foreground">{c.salle}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
