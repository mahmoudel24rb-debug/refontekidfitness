import React from 'react'

import { cn } from '@/lib/utils'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import type { EtapeDeroule } from '@/data/prestations'

// Déroulé d'une journée type (Mercredis Sportifs, Stages vacances) : liste
// verticale d'étapes horaire / titre / description, reliées par un trait
// vertical. La pastille d'horaire reprend le motif des créneaux du rail
// planning (LandingPlanningStrip) : pill marine, texte crème.
// Textes fournis par le club (src/data/prestations.ts ou collection Payload).
export default function DerouleJournee({
  etapes,
  intro,
  note,
}: {
  etapes: EtapeDeroule[]
  intro?: string
  note?: string
}) {
  if (etapes.length === 0) return null
  return (
    <Section tone="cream2" className="mt-[70px]">
      <Container className="max-w-[900px]">
        <SectionHeading underline className="mb-3 text-center text-[26px]">
          Le déroulé de la journée
        </SectionHeading>
        {intro && (
          <p className="mx-auto max-w-[620px] text-center text-muted-foreground">{intro}</p>
        )}
        <ol className="mt-9 flex flex-col">
          {etapes.map((e, i) => {
            const dernier = i === etapes.length - 1
            return (
              <li key={`${e.horaire}-${e.titre}`} className="flex gap-4 sm:gap-6">
                {/* Colonne horaire : pastille puis trait de liaison, qui
                    s'étire jusqu'à la pastille suivante (flex-1). */}
                <div className="flex flex-col items-center">
                  <span className="whitespace-nowrap rounded-full bg-marine px-3 py-1 text-[13px] font-bold text-cream">
                    {e.horaire}
                  </span>
                  {!dernier && <span aria-hidden="true" className="mt-2 w-px flex-1 bg-marine/20" />}
                </div>
                <div className={cn('min-w-0', !dernier && 'pb-8')}>
                  <h3 className="font-heading text-[19px] font-bold text-marine">{e.titre}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink">{e.description}</p>
                </div>
              </li>
            )
          })}
        </ol>
        {note && <p className="mt-8 text-center text-sm italic text-muted-foreground">{note}</p>}
      </Container>
    </Section>
  )
}
