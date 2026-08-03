import React from 'react'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cardInteractive } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import Kicker from './Kicker'
import Section from './Section'
import Container from './Container'
import { formatDateFr, tempsLecture } from '@/data/articles'
import { getArticles } from '@/lib/contenu'

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

// Date + temps de lecture, en badges, sur le featured comme sur les cartes.
function MetaArticle({ date, minutes }: { date: string; minutes: number }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral">
        <time dateTime={date}>{formatDateFr(date)}</time>
      </Badge>
      <Badge variant="neutral">
        <Clock size={13} aria-hidden="true" />
        {minutes} min de lecture
      </Badge>
    </div>
  )
}

// Base visuelle d'une carte-lien (mêmes valeurs que ui/Card + hover ombre seule).
const cardLink = cn(
  'group overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm',
  cardInteractive
)

export default async function BlogKSC() {
  const articles = await getArticles()
  const tries = [...articles].sort((a, b) => b.date.localeCompare(a.date))

  // Garde-fou : aucun article publié (collection vidée dans l'admin).
  if (tries.length === 0) {
    return (
      <>
        <SiteHeader />
        <main>
          <HeroMarine kicker="Blog & actualités" title="Conseils & actus du club" padding="72px 24px" />
          <Section tone="cream">
            <Container className="max-w-[620px] text-center">
              <p className="text-lg text-muted-foreground">Les articles arrivent bientôt.</p>
            </Container>
          </Section>
        </main>
        <SiteFooter />
      </>
    )
  }

  const [featured, ...autres] = tries

  return (
    <>
      <SiteHeader />
      <main>
        <HeroMarine kicker="Blog & actualités" title="Conseils & actus du club" padding="72px 24px" />

        {/* Article le plus récent : bandeau « À la une », image et texte 50/50 */}
        <Section tone="cream">
          <Container>
            <Kicker className="mb-4">À la une</Kicker>
            <a href={`/blog/${featured.slug}`} className={cn(cardLink, 'grid lg:grid-cols-2')}>
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px]">
                <Image
                  src={featured.image}
                  alt={featured.titre}
                  fill
                  sizes="(min-width: 1024px) 600px, calc(100vw - 48px)"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-4 p-[clamp(24px,3.5vw,44px)] lg:justify-center">
                <MetaArticle date={featured.date} minutes={tempsLecture(featured.blocs)} />
                <h2 className="font-heading text-[clamp(26px,3.2vw,32px)] font-extrabold leading-tight text-marine">
                  {featured.titre}
                </h2>
                <p className="line-clamp-2 text-[17px] leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <ReadMore />
              </div>
            </a>
          </Container>
        </Section>

        {/* Les autres articles en grille de 3 */}
        {autres.length > 0 && (
          <Section tone="cream2">
            <Container>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {autres.map((a) => (
                  <a key={a.slug} href={`/blog/${a.slug}`} className={cn(cardLink, 'flex flex-col')}>
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={a.image}
                        alt={a.titre}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, calc(100vw - 48px)"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col items-start gap-2.5 p-6">
                      <MetaArticle date={a.date} minutes={tempsLecture(a.blocs)} />
                      <h2 className="font-heading text-xl font-bold leading-snug text-marine">{a.titre}</h2>
                      <p className="line-clamp-3 flex-1 leading-relaxed text-muted-foreground">{a.excerpt}</p>
                      <ReadMore />
                    </div>
                  </a>
                ))}
              </div>
            </Container>
          </Section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
