import React from 'react'
import { Heart, Shield, Smile, Blocks, type LucideIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import RoundIcon from './RoundIcon'
import { EQUIPE, VALEURS } from '@/data/equipe'

// Équipe (pattern QuiSommesNous) : titre + intro + 3 cartes monogrammes.
// Option `withValeurs` : bandeau horizontal des 4 valeurs du club.
// Titre/intro repris de la page « Qui sommes-nous » (composant existant).
const ICONES: Record<string, LucideIcon> = { Heart, Shield, Smile, Blocks }
const INTRO =
  'Des animateurs et coachs diplômés, formés à l’encadrement des enfants, qui mettent l’énergie et la bienveillance au cœur de chaque séance.'

export default function LandingTeam({
  withValeurs = false,
  tone = 'cream',
}: {
  withValeurs?: boolean
  tone?: 'cream' | 'cream2' | 'white'
}) {
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
          {EQUIPE.map((c) => (
            <Card key={c.nom} className="items-center gap-3 p-8 text-center">
              <div
                aria-hidden="true"
                className="grid size-16 place-items-center rounded-full bg-marine font-heading text-xl font-bold text-cream"
              >
                {c.initiales}
              </div>
              <h3 className="font-heading text-xl font-bold text-marine">{c.nom}</h3>
              <p className="text-[15.5px] leading-relaxed text-ink">{c.bio}</p>
            </Card>
          ))}
        </div>

        {withValeurs && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALEURS.map((v) => {
              const Icon = ICONES[v.icone]
              return (
                <div
                  key={v.nom}
                  className="flex items-start gap-3.5 rounded-lg border border-border bg-card p-5 shadow-sm"
                >
                  <RoundIcon>
                    <Icon size={20} aria-hidden="true" />
                  </RoundIcon>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-marine">{v.nom}</h4>
                    <p className="text-[14.5px] leading-relaxed text-ink">{v.texte}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </Section>
  )
}
