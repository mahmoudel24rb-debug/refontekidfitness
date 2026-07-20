import React from 'react'
import { ArrowRight, ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cardInteractive } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import TerrainLines from './TerrainLines'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import { articleBySlug, ARTICLES, ARTICLE_IMG, formatDateFr } from '@/data/articles'

const cardLink = cn(
  'group overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm',
  cardInteractive
)

export default function Article({ slug }: { slug: string }) {
  const a = articleBySlug(slug)
  if (!a) return null
  const autres = ARTICLES.filter((x) => x.slug !== slug).slice(0, 3)
  // Chapo (1er paragraphe) mis en avant, suite en corps de texte.
  const [chapo, ...suite] = a.paragraphes
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero avec image de couverture */}
        <HeroMarine
          kicker={
            <a href="/blog" className="inline-flex items-center gap-1 text-magenta-light hover:text-magenta">
              <ChevronLeft size={14} aria-hidden="true" />
              Blog
            </a>
          }
          title={a.titre}
          sub={<>Publié le <time dateTime={a.date}>{formatDateFr(a.date)}</time></>}
          image={ARTICLE_IMG[slug]}
          imageAlt={a.titre}
          padding="64px 24px 72px"
        />

        {/* Corps : chapo 19px medium, largeur de lecture 680px, liens magenta */}
        <Section tone="cream">
          <article className="mx-auto max-w-[680px] [&_a]:text-magenta [&_a]:underline-offset-4 [&_a:hover]:underline">
            <p className="mb-6 text-[19px] font-medium leading-relaxed text-marine">{chapo}</p>
            {suite.map((p, i) => (
              <p key={i} className="mb-5 text-[17px] leading-relaxed text-ink">{p}</p>
            ))}
            {/* Encart CTA marine + lignes de terrain */}
            <div className="relative mt-5 overflow-hidden rounded-lg bg-marine p-8 text-center text-cream">
              <TerrainLines />
              <div className="relative">
                <p className="mb-[18px] font-heading text-xl font-bold text-cream">Envie d’essayer le Kid Sport Club ?</p>
                <Button asChild variant="primary">
                  <a href="/seance-essai">Réserver une séance d’essai</a>
                </Button>
              </div>
            </div>
          </article>
        </Section>

        {/* À lire aussi */}
        <Section tone="cream2">
          <Container className="max-w-[1000px]">
            <SectionHeading underline className="mb-7 text-center text-2xl">
              À lire aussi
            </SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((x) => (
                <a key={x.slug} href={`/blog/${x.slug}`} className={cn(cardLink, 'flex flex-col p-6')}>
                  <h3 className="mb-2 font-heading text-[17px] font-bold leading-snug text-marine">{x.titre}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-magenta">
                    Lire
                    <ArrowRight size={13} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
                  </span>
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
