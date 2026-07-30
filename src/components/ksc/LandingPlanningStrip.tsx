import React from 'react'

import { Badge } from '@/components/ui/badge'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { getPlanning } from '@/lib/contenu'

// Rail « Rentrée » : cartes-jour condensées du planning de septembre 2026.
// Scroll-snap horizontal sur mobile, grille 3×2 sur desktop. Chaque créneau
// affiche l'heure, l'activité et la tranche d'âge (données planning.ts).
export default async function LandingPlanningStrip({
  tone = 'cream2',
}: {
  tone?: 'cream' | 'cream2' | 'white'
}) {
  const planning = await getPlanning()
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading underline className="mb-9 text-center">
          Rentrée
        </SectionHeading>
        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:thin] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {planning.map((j) => {
            const creneaux = j.salles.flatMap((s) => s.creneaux)
            return (
              <div
                key={j.jour}
                className="w-[78%] shrink-0 snap-start rounded-lg border border-border bg-card p-6 shadow-sm sm:w-[46%] md:w-auto md:shrink"
              >
                <h3 className="mb-4 font-heading text-xl font-extrabold text-marine">{j.jour}</h3>
                <ul className="flex flex-col gap-2.5">
                  {creneaux.map((c) => (
                    <li key={`${c.heure}-${c.activite}`} className="flex flex-wrap items-center gap-2 leading-snug">
                      <span className="whitespace-nowrap rounded-full bg-marine px-2.5 py-1 text-[12px] font-bold text-cream">
                        {c.heure}
                      </span>
                      <strong className="text-[14.5px] font-bold text-marine">{c.activite}</strong>
                      {c.age && <Badge variant="age" className="px-2.5 py-1 text-[12px]">{c.age}</Badge>}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <p className="mt-7 text-center text-sm italic text-muted-foreground">
          Planning de la rentrée de septembre 2026, susceptible d’évoluer.
        </p>
      </Container>
    </Section>
  )
}
