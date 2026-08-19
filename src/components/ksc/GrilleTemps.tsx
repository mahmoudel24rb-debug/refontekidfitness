'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import {
  bornesAxe,
  couleurAge,
  formatDuree,
  formatFin,
  formatHeure,
  poserJour,
  sansHeure,
  type CreneauCal,
} from '@/lib/planningLayout'

// Timeline du calendrier : en-têtes de jours, rangée « Horaire à confirmer »,
// puis la grille horaire proprement dite. Transposition en Tailwind du
// PlanningGrilleTemps de Parc Beauregard.
//
// Aucune cellule à l'heure : les blocs sont posés en ABSOLU, à la minute. La
// hauteur d'une heure est la custom property `--hpx`, la seule valeur qui
// change au responsive (donc portée par une classe) ; toutes les autres
// conversions minutes -> pixels sont des `calc()` en style inline, puisqu'elles
// varient d'un bloc à l'autre :
//   top    = (debut - debutAxe) / 60 * --hpx
//   height = duree / 60 * --hpx
//   left   = col / cols * 100%      width = 100% / cols
//
// Tailles de police : jamais sous 13px, y compris dans un cluster à 3 colonnes
// (le texte s'y coupe en ellipse, l'aperçu au survol donne le détail complet).

export type GrilleTempsProps = {
  /** 6 jours en vue Semaine, 1 seul en vue Jour. */
  jours: string[]
  creneaux: CreneauCal[]
  /** Bornes communes à toutes les vues (calculées sur l'ensemble des créneaux). */
  bornes?: { debut: number; fin: number }
  /** Jour de la semaine en cours, surligné (calculé après montage). */
  aujourdhui?: string | null
  /** « compact » = blocs de la semaine, « detailed » = vue Jour. */
  variante?: 'compact' | 'detailed'
  /** Ouvre la fiche épinglée (clic ou Entrée). */
  onOuvrir?: (creneau: CreneauCal, ancre: HTMLElement) => void
  /** Aperçu au survol : élément survolé, ou null quand le pointeur sort. */
  onApercu?: (creneau: CreneauCal | null, ancre: HTMLElement | null) => void
  /** Identifiant du créneau dont la fiche est ouverte. */
  ouvertId?: string | null
}

const heuresDeAxe = (debut: number, fin: number) => {
  const liste: number[] = []
  for (let h = debut; h <= fin; h += 60) liste.push(h)
  return liste
}

/** « Baby Gym, lundi 10h30, 1h, Salle Kid » */
export function libelleBloc(c: CreneauCal): string {
  const jour = c.jour.toLowerCase()
  if (c.debutMin === null) return `${c.activite}, ${jour}, horaire à confirmer, ${c.salle}`
  return `${c.activite}, ${jour} ${formatHeure(c.debutMin)}, ${formatDuree(c.duree)}, ${c.salle}`
}

// Gouttière des heures : collée à gauche pendant le défilement horizontal.
const gouttiereCls = 'sticky left-0 z-[3] bg-white'

export default function GrilleTemps({
  jours,
  creneaux,
  bornes,
  aujourdhui = null,
  variante = 'compact',
  onOuvrir,
  onApercu,
  ouvertId = null,
}: GrilleTempsProps) {
  // Attributs communs aux blocs et aux mini-cartes : chacun ouvre la même fiche.
  const interactions = (c: CreneauCal) => ({
    'aria-haspopup': 'dialog' as const,
    'aria-expanded': ouvertId === c.id,
    'aria-label': libelleBloc(c),
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => onOuvrir?.(c, e.currentTarget),
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => onApercu?.(c, e.currentTarget),
    onMouseLeave: () => onApercu?.(null, null),
  })
  const axe = bornes ?? bornesAxe(creneaux)
  const heures = heuresDeAxe(axe.debut, axe.fin)
  const parJour = jours.map((jour) => {
    const duJour = creneaux.filter((c) => c.jour === jour)
    return { jour, poses: poserJour(duJour), attente: sansHeure(duJour) }
  })
  const aAttente = parJour.some((j) => j.attente.length > 0)
  const solo = jours.length === 1
  // Trame de colonnes partagée par les en-têtes, la rangée « à confirmer » et
  // la grille, pour qu'elles restent alignées au pixel.
  const trame = { gridTemplateColumns: 'var(--gout) repeat(var(--jours), var(--colw))' }

  return (
    // PAS d'overflow sur la piste elle-même : elle deviendrait le conteneur de
    // défilement de référence et la gouttière ne collerait plus à gauche.
    <div className="relative overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-x-visible">
      <div
        data-planning-piste
        className={cn(
          'rounded-lg border border-border bg-white [--gout:56px]',
          solo
            ? '[--colw:minmax(0,1fr)]'
            : 'w-max min-w-full snap-x snap-proximity [--colw:168px] lg:w-auto lg:min-w-0 lg:[--colw:minmax(0,1fr)]',
        )}
        style={{ '--jours': jours.length } as React.CSSProperties}
      >
        {/* En-têtes de jours (pas de sticky vertical : la page défile normalement) */}
        <div className="grid border-b border-border" style={trame}>
          <div className={cn(gouttiereCls, 'rounded-tl-lg')} aria-hidden="true" />
          {parJour.map(({ jour }) => (
            <div key={jour} className="px-1.5 py-3 text-center">
              <span
                className={cn(
                  'inline-block rounded-full px-3.5 py-1.5 font-heading text-[15px] font-extrabold text-marine',
                  jour === aujourdhui && 'bg-magenta/12 text-magenta',
                )}
              >
                {jour}
              </span>
            </div>
          ))}
        </div>

        {/* Créneaux sans horaire : hors de l'axe, juste sous les en-têtes */}
        {aAttente && (
          <div className="border-b border-border bg-cream-2/60 pb-3">
            <p className="sticky left-0 z-[3] w-max bg-cream-2/60 px-3 pb-1.5 pt-2.5 text-[13px] font-bold uppercase tracking-[.04em] text-muted-foreground">
              Horaire à confirmer
            </p>
            <div className="grid items-start" style={trame}>
              <div className="sticky left-0 z-[3] bg-cream-2/60" aria-hidden="true" />
              {parJour.map(({ jour, attente }) => (
                <div key={jour} className="flex flex-col gap-1.5 px-1.5">
                  {attente.map((c) => {
                    const coul = couleurAge(c.age)
                    return (
                      <button
                        key={c.id}
                        type="button"
                        data-creneau-attente
                        className="flex w-full cursor-pointer flex-col gap-0.5 rounded-md border border-dashed bg-white px-2.5 py-2 text-left"
                        {...interactions(c)}
                        style={{ borderColor: coul.pleine, color: coul.texte }}
                      >
                        <span className="text-[13px] font-bold leading-tight">{c.activite}</span>
                        <span className="flex items-center gap-1.5 text-[13px] text-ink">
                          <span
                            aria-hidden="true"
                            className="size-2 shrink-0 rounded-full"
                            style={{ background: coul.pleine }}
                          />
                          {c.salle}
                        </span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grille horaire : --hpx = hauteur d'une heure (seule valeur responsive) */}
        <div
          className="grid pb-3 pt-3.5 [--hpx:60px] lg:[--hpx:66px]"
          style={{ gridTemplateColumns: 'var(--gout) minmax(0, 1fr)' }}
        >
          <div className={cn(gouttiereCls, 'relative rounded-bl-lg')} aria-hidden="true">
            {heures.map((h) => (
              <span
                key={h}
                className="absolute right-2 -translate-y-1/2 text-[13px] whitespace-nowrap text-muted-foreground"
                style={{ top: `calc((${h} - ${axe.debut}) / 60 * var(--hpx))` }}
              >
                {formatHeure(h)}
              </span>
            ))}
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(var(--jours), var(--colw))',
              // Lignes d'heures : un dégradé répété, pas des cellules — les
              // cours commencent à 9h30 ou 16h15.
              backgroundImage:
                'repeating-linear-gradient(to bottom, var(--ksc-border) 0, var(--ksc-border) 1px, transparent 1px, transparent var(--hpx))',
            }}
          >
            {parJour.map(({ jour, poses }) => (
              <div
                key={jour}
                data-jour={jour}
                className={cn('relative border-l border-border', !solo && 'snap-start')}
                style={{ height: `calc((${axe.fin} - ${axe.debut}) / 60 * var(--hpx))` }}
              >
                {poses.map((p) => {
                  const c = p.creneau
                  const coul = couleurAge(c.age)
                  // Un cluster à 3 colonnes ne laisse pas la place à la salle :
                  // on garde heure + activité (la fiche donne le reste). La vue
                  // Jour dispose de toute la page, elle affiche toujours tout.
                  const compresse = variante === 'compact' && p.cols >= 3
                  // La plage complète « 17h – 18h » ne tient que si le bloc est
                  // large : seul, ou à deux dans la colonne pleine page.
                  const heurePleine = p.cols === 1 || (variante === 'detailed' && p.cols === 2)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      data-creneau
                      data-activite={c.activite}
                      data-cols={p.cols}
                      className="absolute flex cursor-pointer flex-col gap-px overflow-hidden rounded-md border-0 border-l-[3px] px-2 py-1.5 text-left animate-in fade-in-0 duration-150 hover:brightness-[.97] [&>span]:block [&>span]:overflow-hidden [&>span]:text-ellipsis [&>span]:whitespace-nowrap"
                      {...interactions(c)}
                      style={{
                        top: `calc((${p.debut} - ${axe.debut}) / 60 * var(--hpx))`,
                        height: `calc(${c.duree} / 60 * var(--hpx) - 2px)`,
                        left: `calc(${p.col} / ${p.cols} * 100%)`,
                        width: `calc(100% / ${p.cols} - 3px)`,
                        marginLeft: 2,
                        background: coul.fond,
                        color: coul.texte,
                        borderLeftColor: coul.pleine,
                      }}
                    >
                      <span className="text-[13px] font-bold leading-tight">
                        {heurePleine
                          ? `${formatHeure(p.debut)} – ${formatFin(p.debut, c.duree)}`
                          : formatHeure(p.debut)}
                        {variante === 'detailed' && heurePleine ? ` · ${formatDuree(c.duree)}` : ''}
                      </span>
                      <span className="text-[13.5px] font-semibold leading-tight">{c.activite}</span>
                      {compresse ? null : (
                        <span className="text-[13px] leading-tight opacity-80">
                          {heurePleine ? c.salle : c.salle.replace(/^Salle /, '')}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
