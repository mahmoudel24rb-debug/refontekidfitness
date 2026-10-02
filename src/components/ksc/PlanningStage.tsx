import React from 'react'
import { Ghost, Icon, Skull, WandSparkles, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { PlanningStage as Planning, ThemeJour } from '@/data/stageToussaint'
import { chauveSouris, citrouille } from './iconesHalloween'

// Planning thématique d'une semaine de stage (landing des stages de la
// Toussaint, ambiance Halloween) : créneaux communs, puis une carte par jour
// avec son thème et les activités par tranche d'âge (pastille violette :
// 3 à 7 ans, orange : 8 à 14 ans). Données : src/data/stageToussaint.ts.

const COULEUR = { violet: 'bg-[#7c3aed]', orange: 'bg-[#f97316]' } as const

function IconeTheme({ theme }: { theme: ThemeJour }) {
  const classe = 'size-6 text-[#ff9a4d]'
  const lucide: Partial<Record<ThemeJour, LucideIcon>> = { monstres: Skull, sorciers: WandSparkles, fantomes: Ghost }
  const Composant = lucide[theme]
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#1f1147]" aria-hidden="true">
      {Composant ? (
        <Composant className={classe} strokeWidth={2.2} />
      ) : (
        <Icon iconNode={theme === 'vampires' ? chauveSouris : citrouille} className={classe} strokeWidth={2.2} />
      )}
    </span>
  )
}

function Activite({ couleur, children }: { couleur: keyof typeof COULEUR; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2.5 font-bold text-marine">
      <span className={cn('size-2.5 shrink-0 rounded-full', COULEUR[couleur])} aria-hidden="true" />
      {children}
    </li>
  )
}

function Creneau({ horaire, activites }: { horaire: string; activites: [string, string] }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold tracking-[.06em] text-muted-foreground uppercase">{horaire}</p>
      <ul className="flex flex-col gap-1.5">
        <Activite couleur="violet">
          {activites[0]}
          <span className="sr-only"> (3 à 7 ans)</span>
        </Activite>
        <Activite couleur="orange">
          {activites[1]}
          <span className="sr-only"> (8 à 14 ans)</span>
        </Activite>
      </ul>
    </div>
  )
}

export default function PlanningStage({ planning }: { planning: Planning }) {
  return (
    <section className="relative overflow-hidden bg-[#1f1147] px-6 py-14 text-cream md:py-20">
      <div className="relative mx-auto max-w-[1120px]">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-[#2f1d63]" aria-hidden="true">
            <Icon iconNode={citrouille} className="size-8 text-[#ff9a4d]" strokeWidth={2.2} />
          </span>
          <p className="mb-2 text-sm font-bold tracking-[.06em] text-[#ff9a4d] uppercase">{planning.kicker}</p>
          <h2 className="font-heading text-[clamp(28px,3.6vw,40px)] leading-tight font-extrabold text-cream">{planning.titre}</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-[#cfc8e6]">{planning.intro}</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {planning.groupes.map((g) => (
              <li key={g.label} className="flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-marine">
                <span className={cn('size-2.5 rounded-full', COULEUR[g.couleur])} aria-hidden="true" />
                {g.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Créneaux communs à tous les jours */}
        <div className="mx-auto mt-10 max-w-[860px] rounded-lg bg-[#ede9fe] p-5 sm:p-6">
          <p className="mb-3 text-xs font-bold tracking-[.06em] text-[#5b21b6] uppercase">Tous les jours</p>
          <ul className="flex flex-col gap-2.5">
            {planning.communs.map((c) => (
              <li key={c.horaire} className="flex items-start gap-3">
                <span className="w-[92px] shrink-0">
                  <span className="inline-block rounded-full bg-[#1f1147] px-2.5 py-1 text-xs font-bold whitespace-nowrap text-cream">{c.horaire}</span>
                </span>
                <span className="pt-0.5 font-bold text-marine">
                  {c.libelle}
                  {c.precision && <span className="font-normal text-ink"> ({c.precision})</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Une carte par jour */}
        <div className="mx-auto mt-4 grid max-w-[860px] gap-4 sm:grid-cols-2">
          {planning.jours.map((j) => (
            <article key={j.jour} className={cn('rounded-lg bg-white p-5 text-ink', j.journee && 'sm:col-span-2')}>
              <div className="flex items-center gap-3">
                <IconeTheme theme={j.icone} />
                <div className="min-w-0">
                  <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 font-heading text-[21px] leading-tight font-extrabold text-marine">
                    {j.jour}
                    <span className="rounded-full bg-[#fff1e6] px-2.5 py-0.5 font-sans text-[13px] font-bold text-[#c2410c]">{j.theme}</span>
                  </h3>
                  <p className="mt-0.5 text-[13px] text-muted-foreground">{j.dates}</p>
                </div>
              </div>
              {j.journee ? (
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex gap-1" aria-hidden="true">
                    <span className={cn('size-2.5 rounded-full', COULEUR.violet)} />
                    <span className={cn('size-2.5 rounded-full', COULEUR.orange)} />
                  </span>
                  <span className="font-heading text-[22px] font-extrabold text-[#c2410c]">{j.journee}</span>
                  <span className="text-sm font-semibold text-muted-foreground">Toute la journée</span>
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {j.matin && <Creneau horaire="10h à 12h" activites={j.matin} />}
                  {j.apresMidi && <Creneau horaire="14h à 16h" activites={j.apresMidi} />}
                </div>
              )}
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[760px] text-center text-sm leading-relaxed text-[#cfc8e6] italic">{planning.note}</p>
      </div>
    </section>
  )
}
