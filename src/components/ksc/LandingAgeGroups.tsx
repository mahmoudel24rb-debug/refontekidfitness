import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import Kicker from './Kicker'
import { HOME } from '@/data/home'

// 4 cartes « Tranches d'âge » (HOME.tranches) — SANS lien (pas de fuite hors
// landing). Textes et libellés strictement issus des données d'accueil.
export default function LandingAgeGroups({
  tone = 'white',
}: {
  tone?: 'cream' | 'cream2' | 'white'
}) {
  const t = HOME.tranches
  return (
    <Section tone={tone}>
      <Container>
        <div className="mb-9 text-center">
          <Kicker className="mb-3">{t.kicker}</Kicker>
          <SectionHeading underline>{t.titre}</SectionHeading>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item) => (
            <Card key={item.nom} className="items-start gap-3 p-7">
              <Badge variant="age">{item.age}</Badge>
              <h3 className="font-heading text-xl font-bold text-marine">{item.nom}</h3>
              <p className="text-[15px] leading-relaxed text-ink">{item.texte}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
