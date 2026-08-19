import React from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import TerrainLines from './TerrainLines'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import CarteArticle, { MetaArticle } from './CarteArticle'
import { tempsLecture } from '@/data/articles'
import { getArticles } from '@/lib/contenu'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export default async function Article({ slug }: { slug: string }) {
  const articles = await getArticles()
  const a = articles.find((x) => x.slug === slug)
  if (!a) return null
  const autres = articles.filter((x) => x.slug !== slug).slice(0, 3)
  // Corps : blocs (paragraphes + intertitres h2), dans l'ordre de lecture.
  const blocs = a.blocs
  // Le 1er paragraphe est mis en avant en chapô.
  const chapoIndex = blocs.findIndex((b) => b.t === 'p')
  const url = `${SITE}/blog/${a.slug}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: a.titre,
      description: a.excerpt,
      datePublished: a.date,
      dateModified: a.date,
      ...(a.image ? { image: `${SITE}${a.image}` } : {}),
      author: { '@type': 'Organization', name: 'Kid Sport Club' },
      publisher: { '@type': 'Organization', name: 'Kid Sport Club' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        { '@type': 'ListItem', position: 3, name: a.titre, item: url },
      ],
    },
  ]
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>
        {/* Hero avec image de couverture. Plus de sous-titre : la date est
            passée dans les badges méta (avec le temps de lecture) et l'extrait
            aurait fait doublon avec le chapô, qui le reprend presque mot pour
            mot. */}
        <HeroMarine
          kicker={
            <Link href="/blog" className="inline-flex items-center gap-1 text-magenta-light hover:text-magenta">
              <ChevronLeft size={14} aria-hidden="true" />
              Blog
            </Link>
          }
          title={a.titre}
          image={a.image}
          imageAlt={a.titre}
          padding="64px 24px 72px"
        />

        {/* Corps : chapo 19px medium, intertitres h2, largeur de lecture 68ch */}
        <Section tone="cream">
          {/* NB : les règles de lien excluent les boutons (data-slot=button),
              sinon le sélecteur descendant écrase leur text-white (rose sur rose). */}
          <article className="mx-auto max-w-[68ch] [&_a:not([data-slot=button])]:text-magenta [&_a:not([data-slot=button])]:underline-offset-4 [&_a:not([data-slot=button]):hover]:underline">
            {/* Méta sous le hero : mêmes badges que les cartes du hub. */}
            <div className="mb-7">
              <MetaArticle date={a.date} minutes={tempsLecture(blocs)} />
            </div>
            {blocs.map((b, i) =>
              b.t === 'h2' ? (
                <h2 key={i} className="mt-10 mb-3 font-heading text-2xl font-bold text-marine">{b.texte}</h2>
              ) : i === chapoIndex ? (
                <p key={i} className="mb-6 text-[19px] font-medium leading-relaxed text-marine">{b.texte}</p>
              ) : (
                <p key={i} className="mb-5 text-[18px] leading-8 text-ink">{b.texte}</p>
              ),
            )}
          </article>

          {/* Encart CTA marine : SORTI de la colonne de lecture (68ch) pour
              respirer en desktop, contenu inchangé. */}
          <Container className="mt-10 max-w-[1000px]">
            <div className="relative overflow-hidden rounded-lg bg-marine p-8 text-center text-cream">
              <TerrainLines />
              <div className="relative">
                <p className="mb-[18px] font-heading text-xl font-bold text-cream">Envie d’essayer le Kid Sport Club ?</p>
                <Button asChild variant="primary">
                  <a href="/seance-essai">Réserver une séance d’essai</a>
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* À lire aussi : les mêmes cartes riches que le hub /blog */}
        {autres.length > 0 && (
          <Section tone="cream2">
            <Container>
              <SectionHeading underline className="mb-7 text-center text-2xl">
                À lire aussi
              </SectionHeading>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {autres.map((x) => (
                  <CarteArticle key={x.slug} article={x} niveau="h3" lignesExtrait={2} />
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
