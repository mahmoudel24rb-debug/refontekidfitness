import React from 'react'
import Image from 'next/image'
import { BookOpen, Users } from 'lucide-react'

import Section from '@/components/ksc/Section'
import Container from '@/components/ksc/Container'
import RoundIcon from '@/components/ksc/RoundIcon'
import { Button } from '@/components/ui/button'
import { HOME } from '@/data/home'

// Héros d'accueil reconstruit (ex-port Framer). Grille 2 colonnes : titre +
// CTA + stats à gauche, visuel à droite. Sobriété : aucune hauteur fixe sur le
// texte, pas de flottement, décorations SVG purement décoratives (aria-hidden).
// Le bouton primaire porte data-inscription="placeholder" (branchement prod
// unique via data/site.ts, cf. InscriptionCTA).

const STAT_ICONS = [BookOpen, Users] as const

export default function HomeHero() {
  const { hero } = HOME
  return (
    <Section tone="cream">
      {/* Décorations de marque (marine sobre) — purement décoratives. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-[6%] top-10 hidden size-9 text-marine/15 md:block"
        fill="currentColor"
      >
        <path d="M12 0c.6 4.9 2.5 6.8 7.4 7.4-4.9.6-6.8 2.5-7.4 7.4-.6-4.9-2.5-6.8-7.4-7.4C9.5 6.8 11.4 4.9 12 0z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute bottom-8 left-[4%] hidden size-8 text-marine/10 lg:block"
        fill="currentColor"
      >
        <path d="M22 2 2 10l7 2.6L11.6 20 15 13l7-11zM9 12.6l9.5-7.9L11.9 12 9 12.6z" />
      </svg>

      <Container className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        {/* Colonne texte */}
        <div className="flex flex-col gap-6">
          <h1 className="font-heading">
            <span className="block font-bold text-[clamp(30px,3.2vw,44px)] leading-tight">
              {hero.titreLigne1}
            </span>
            <span className="block font-extrabold text-[clamp(38px,4.6vw,62px)] leading-[1.06] tracking-[-0.02em]">
              {hero.titreLigne2}
            </span>
          </h1>

          <p className="max-w-[540px] text-[17px] leading-[1.6] text-ink/80">{hero.sousTitre}</p>

          <div className="flex flex-wrap gap-3.5">
            <Button asChild variant="primary">
              <a href={hero.ctaPrimaire.href} data-inscription="placeholder">
                {hero.ctaPrimaire.label}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={hero.ctaSecondaire.href}>{hero.ctaSecondaire.label}</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-5 pt-1">
            {hero.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i] ?? BookOpen
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <RoundIcon className="size-12">
                    <Icon size={22} />
                  </RoundIcon>
                  <div className="flex flex-col leading-tight">
                    <span className="font-heading text-2xl font-extrabold text-marine">{stat.valeur}</span>
                    <span className="text-sm text-ink/70">{stat.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Colonne visuel — hero.webp, priority, sans hauteur fixe. */}
        <div className="order-first lg:order-none">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={810}
            height={1080}
            priority
            sizes="(min-width:1024px) 45vw, 80vw"
            className="mx-auto w-auto max-h-[560px] object-contain"
          />
        </div>
      </Container>
    </Section>
  )
}
