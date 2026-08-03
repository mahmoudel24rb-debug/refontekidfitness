import React from 'react'
import Image from 'next/image'

import { Card } from '@/components/ui/card'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { getEquipe } from '@/lib/contenu'

// Équipe (pattern QuiSommesNous) : titre + intro + 3 cartes monogrammes.
// Titre/intro repris de la page « Qui sommes-nous » (composant existant).
const INTRO =
  'Des animateurs et coachs diplômés, formés à l’encadrement des enfants, qui mettent l’énergie et la bienveillance au cœur de chaque séance.'

export default async function LandingTeam({
  tone = 'cream',
}: {
  tone?: 'cream' | 'cream2' | 'white'
}) {
  const equipe = await getEquipe()
  return (
    <Section tone={tone}>
      <Container>
        <div className="mx-auto mb-9 max-w-[640px] text-center">
          <SectionHeading underline className="mb-3">
            Notre équipe
          </SectionHeading>
          <p className="text-[17px] text-ink">{INTRO}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {equipe.map((c) => (
            <Card key={c.nom} className="items-center gap-3 p-8 text-center">
              {c.photo ? (
                <Image
                  src={c.photo}
                  alt={c.photoAlt ?? c.nom}
                  width={64}
                  height={64}
                  className="size-16 rounded-full object-cover"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid size-16 place-items-center rounded-full bg-marine font-heading text-xl font-bold text-cream"
                >
                  {c.initiales}
                </div>
              )}
              <h3 className="font-heading text-xl font-bold text-marine">{c.nom}</h3>
              <p className="text-[15.5px] leading-relaxed text-ink">{c.bio}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
