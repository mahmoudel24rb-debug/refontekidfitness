import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import Kicker from './Kicker'
import Section from './Section'
import Container from './Container'
import CarteArticle, { MetaArticle, ReadMore, cardLink } from './CarteArticle'
import { tempsLecture } from '@/data/articles'
import { getArticles } from '@/lib/contenu'
import { classesCarte } from '@/lib/grilleCartes'

// Les briques de carte (MetaArticle, ReadMore, cardLink) vivent dans
// CarteArticle : le « À lire aussi » d'un article rend exactement les mêmes.

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
              {/* Flux centré : la dernière rangée incomplète reste centrée. */}
              <div className="flex flex-wrap justify-center gap-6">
                {autres.map((a) => (
                  <CarteArticle
                    key={a.slug}
                    article={a}
                    className={classesCarte(autres.length, 3, 6)}
                  />
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
