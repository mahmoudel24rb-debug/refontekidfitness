import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { getTarifs } from '@/lib/contenu'

// « Les tarifs » (catalogue) : 5 cartes d'abonnement (« La plus choisie » sur
// Illimité) + 3 lignes prestations. Données strictement issues de la collection
// `tarifs` (repli tarifs.ts) ; les sous-libellés « Abonnements » /
// « Prestations » proviennent de TarifsKSC.
export default async function LandingTarifs({
  tone = 'cream',
}: {
  tone?: 'cream' | 'cream2' | 'white'
}) {
  const tarifs = await getTarifs()
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading underline className="mb-9 text-center">
          Les tarifs
        </SectionHeading>

        <p className="mb-4 text-[13px] font-extrabold uppercase tracking-[.06em] text-magenta">Abonnements</p>
        {/* Flux centré (pas de grille rigide) : 5 cartes -> 3 + 2 CENTRÉES,
            jamais de case vide en bout de rangée. */}
        <div className="flex flex-wrap justify-center gap-5">
          {tarifs.abonnements.map((t) => {
            const featured = t.enAvant
            return (
              <Card
                key={t.titre}
                className={cn(
                  'w-full items-start gap-3 p-7 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]',
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
          {tarifs.prestations.map((t) => (
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
