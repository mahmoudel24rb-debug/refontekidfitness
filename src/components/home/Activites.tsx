import React from 'react'
import Image from 'next/image'

import Section from '@/components/ksc/Section'
import Container from '@/components/ksc/Container'
import Kicker from '@/components/ksc/Kicker'
import SectionHeading from '@/components/ksc/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { cardInteractive } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HOME } from '@/data/home'

// « Nos activités » — 3 activités phares en cartes image-first cliquables.
// Les catégories du template sont rendues en pastilles DÉCORATIVES (aria-hidden,
// aucun filtre factice). Cartes sobres : hover = ombre uniquement.
export default function Activites() {
  const { activites } = HOME
  return (
    <Section tone="cream">
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Kicker>{activites.kicker}</Kicker>
          <SectionHeading underline>{activites.titre}</SectionHeading>
        </div>

        {/* Pastilles décoratives (catégories du template) — pas de filtre réel. */}
        <div aria-hidden="true" className="flex flex-wrap gap-2.5">
          {activites.categories.map((cat) => (
            <Badge key={cat} variant="neutral">
              {cat}
            </Badge>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {activites.cartes.map((carte) => (
            <a
              key={carte.href}
              href={carte.href}
              className={cn(
                'flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm',
                cardInteractive
              )}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={carte.image}
                  alt=""
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover"
                />
                <Badge variant="age" className="absolute left-3 top-3">
                  {carte.badge}
                </Badge>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <p className="text-[13px] font-semibold text-muted-foreground">{carte.note}</p>
                <h3 className="font-heading text-xl font-bold text-marine">{carte.titre}</h3>
                <p className="text-[15px] leading-[1.55] text-ink/75">{carte.texte}</p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  )
}
