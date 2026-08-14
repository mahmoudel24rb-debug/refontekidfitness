import React from 'react'
import { Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import AvisAvatar from './AvisAvatar'
import Section from './Section'
import { getAvis } from '@/lib/contenu'

// Citation mise en scène : un extrait VERBATIM d'un avis parent (sous-chaîne de
// l'avis n° `avisIndex`), 5 étoiles magenta, attribution du parent + CTA vers
// l'objectif de la page. GARDE-FOU : l'extrait doit être une sous-chaîne exacte
// de l'avis source (apostrophes typographiques comprises) ; si l'avis est
// modifié dans l'admin et ne contient plus l'extrait, la section se masque
// plutôt que d'afficher une citation qui n'existe plus.
export default async function PullQuote({
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
  const avis = await getAvis()
  const source = avis[avisIndex]
  if (!source?.texte.includes(extrait)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[PullQuote] extrait absent de l'avis n° ${avisIndex} : « ${extrait} » — section masquée`)
    }
    return null
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
        {/* Attribution : nom réel du parent + sa photo (même avatar que les cartes d'avis) */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <AvisAvatar index={avisIndex} photo={source.photo} size={44} />
          <p className="text-sm font-semibold text-muted-foreground">{source.auteur}</p>
        </div>
        <div className="mt-8">
          <Button asChild>
            <a href={href}>{ctaLabel}</a>
          </Button>
        </div>
      </div>
    </Section>
  )
}
