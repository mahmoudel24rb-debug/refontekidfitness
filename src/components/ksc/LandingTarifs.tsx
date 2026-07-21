import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { ABONNEMENTS, PRESTATIONS_TARIFS, FEATURED_TITRE } from '@/data/tarifs'

// « Les tarifs » (catalogue) : 5 cartes d'abonnement (« La plus choisie » sur
// Illimité) + 3 lignes prestations. Données strictement issues de tarifs.ts ;
// les sous-libellés « Abonnements » / « Prestations » proviennent de TarifsKSC.
export default function LandingTarifs({
  tone = 'cream',
}: {
  tone?: 'cream' | 'cream2' | 'white'
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading underline className="mb-9 text-center">
          Les tarifs
        </SectionHeading>

        <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[.06em] text-magenta">Abonnements</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ABONNEMENTS.map((t) => {
            const featured = t.titre === FEATURED_TITRE
            return (
              <Card
                key={t.titre}
                className={cn(
                  'items-start gap-3 p-7',
                  featured && 'relative overflow-visible border-2 border-magenta lg:scale-[1.03]',
                )}
              >
                {featured && (
                  <Badge variant="brand" className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    La plus choisie
                  </Badge>
                )}
                <h3 className="font-heading text-lg font-bold leading-snug text-marine">{t.titre}</h3>
                <p className="font-heading text-[32px] font-extrabold leading-[1.15] text-magenta">{t.prix}</p>
                <span className="rounded-full bg-cream-2 px-3.5 py-1.5 text-[13px] font-semibold leading-snug text-muted-foreground">
                  {t.detail}
                </span>
              </Card>
            )
          })}
        </div>

        <p className="mt-10 mb-4 text-[13px] font-extrabold uppercase tracking-[.06em] text-magenta">Prestations</p>
        <div className="flex flex-col gap-3">
          {PRESTATIONS_TARIFS.map((t) => (
            <div
              key={t.titre}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div>
                <h3 className="font-heading text-lg font-bold text-marine">{t.titre}</h3>
                <p className="text-[14px] text-muted-foreground">{t.detail}</p>
              </div>
              <p className="font-heading text-xl font-extrabold text-magenta">{t.prix}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
