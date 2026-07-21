import React from 'react'
import { Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Section from './Section'
import { AVIS } from '@/data/avis'

// Citation mise en scène : un extrait VERBATIM d'un avis parent (sous-chaîne de
// AVIS[i]), 5 étoiles magenta, attribution neutre + CTA vers l'objectif de la
// page. Garde de cohérence en dev : l'extrait DOIT être une sous-chaîne exacte
// de l'avis source (apostrophes typographiques comprises).
const ATTRIBUTION = 'Parent d’un enfant du club'

export default function PullQuote({
  avisIndex,
  extrait,
  href,
  ctaLabel,
  tone = 'cream2',
}: {
  avisIndex: number
  extrait: string
  href: string
  ctaLabel: string
  tone?: 'cream' | 'cream2' | 'white'
}) {
  if (process.env.NODE_ENV !== 'production' && !AVIS[avisIndex]?.includes(extrait)) {
    console.warn(`[PullQuote] extrait absent de AVIS[${avisIndex}] : « ${extrait} »`)
  }

  return (
    <Section tone={tone}>
      <div className="mx-auto max-w-[820px] text-center">
        <div className="mb-5 flex justify-center gap-1" aria-label="5 étoiles sur 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={20} className="fill-magenta text-magenta" aria-hidden="true" />
          ))}
        </div>
        <blockquote className="font-heading text-[clamp(22px,3vw,30px)] font-bold leading-snug text-marine">
          «&nbsp;{extrait}&nbsp;»
        </blockquote>
        <p className="mt-5 text-sm font-semibold text-muted-foreground">{ATTRIBUTION}</p>
        <div className="mt-8">
          <Button asChild>
            <a href={href}>{ctaLabel}</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
