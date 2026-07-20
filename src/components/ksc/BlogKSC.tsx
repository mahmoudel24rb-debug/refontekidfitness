import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cardInteractive } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import Section from './Section'
import Container from './Container'
import { ARTICLES, ARTICLE_IMG, formatDateFr } from '@/data/articles'

// Affordance « Lire l'article » non-cliquable (la carte entière est le lien —
// pas de <a> imbriqué). La flèche glisse au survol de la carte (group).
function ReadMore() {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold text-magenta">
      Lire l’article
      <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
    </span>
  )
}

// Base visuelle d'une carte-lien (mêmes valeurs que ui/Card + hover ombre seule).
const cardLink = cn(
  'group overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm',
  cardInteractive
)

export default function BlogKSC() {
  const tries = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date))
  const [featured, ...autres] = tries

  return (
    <>
      <SiteHeader />
      <main>
        <HeroMarine kicker="Blog & actualités" title="Conseils & actus du club" padding="72px 24px" />

        {/* Article le plus récent en « featured » horizontal (image gauche 45 %) */}
        <Section tone="cream">
          <Container>
            <a href={`/blog/${featured.slug}`} className={cn(cardLink, 'grid lg:grid-cols-[45fr_55fr]')}>
              <div className="relative aspect-[16/10] lg:aspect-auto">
                <Image
                  src={ARTICLE_IMG[featured.slug]}
                  alt={featured.titre}
                  fill
                  sizes="(min-width: 1024px) 540px, calc(100vw - 48px)"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-3.5 p-[clamp(24px,3.5vw,40px)]">
                <Badge variant="neutral">
                  <time dateTime={featured.date}>{formatDateFr(featured.date)}</time>
                </Badge>
                <h2 className="font-heading text-[clamp(23px,2.6vw,28px)] font-extrabold leading-snug text-marine">
                  {featured.titre}
                </h2>
                <p className="leading-relaxed text-muted-foreground">{featured.excerpt}</p>
                <ReadMore />
              </div>
            </a>
          </Container>
        </Section>

        {/* Les autres articles en grille de 3 */}
        <Section tone="cream2">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((a) => (
                <a key={a.slug} href={`/blog/${a.slug}`} className={cn(cardLink, 'flex flex-col')}>
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={ARTICLE_IMG[a.slug]}
                      alt={a.titre}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, calc(100vw - 48px)"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-2.5 p-6">
                    <Badge variant="neutral">
                      <time dateTime={a.date}>{formatDateFr(a.date)}</time>
                    </Badge>
                    <h2 className="font-heading text-xl font-bold leading-snug text-marine">{a.titre}</h2>
                    <p className="flex-1 leading-relaxed text-muted-foreground">{a.excerpt}</p>
                    <ReadMore />
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
