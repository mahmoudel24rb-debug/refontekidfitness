import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import Kicker from './Kicker'

// Bloc éditorial 2 colonnes (texte / photo) + puces à coches optionnelles.
// Alimenté soit par une prestation (spotlightSlug : accroche + intro + bénéfices),
// soit par HOME.bienvenue. Aucun CTA (pas de lien de fuite sur les landings).
export default function EditorialSplit({
  kicker,
  title,
  texte,
  bullets,
  image,
  imageAlt,
  reverse = false,
  tone = 'cream',
}: {
  kicker?: string
  title: React.ReactNode
  texte: string
  bullets?: string[]
  image: string
  imageAlt: string
  reverse?: boolean
  tone?: 'cream' | 'cream2' | 'white'
}) {
  return (
    <Section tone={tone}>
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className={cn('relative aspect-[4/3] overflow-hidden rounded-xl shadow-md', reverse && 'lg:order-2')}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width:1024px) 45vw, calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
          <div>
            {kicker && <Kicker className="mb-3">{kicker}</Kicker>}
            <SectionHeading className="mb-5">{title}</SectionHeading>
            <p className="text-lg leading-relaxed text-ink">{texte}</p>
            {bullets && bullets.length > 0 && (
              <ul className="mt-6 flex flex-col gap-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-magenta text-white">
                      <Check size={12} strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-marine">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
