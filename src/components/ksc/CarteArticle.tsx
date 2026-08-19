import React from 'react'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { cardInteractive } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatDateFr, tempsLecture } from '@/data/articles'
import type { ArticleVue } from '@/lib/contenu'

// Briques de carte d'article, partagées par le hub /blog (grille et « à la
// une ») et par le « À lire aussi » d'un article : une seule définition, donc
// des cartes identiques d'un bout à l'autre du site.

// Affordance « Lire l'article » non-cliquable (la carte entière est le lien —
// pas de <a> imbriqué). La flèche glisse au survol de la carte (group).
export function ReadMore() {
  return (
    <span className="inline-flex items-center gap-1.5 font-bold text-magenta">
      Lire l’article
      <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
    </span>
  )
}

// Date + temps de lecture, en badges. Sert aussi de bandeau méta en tête
// d'article, sous le hero.
export function MetaArticle({ date, minutes }: { date: string; minutes: number }) {
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
export const cardLink = cn(
  'group overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm',
  cardInteractive,
)

/** Carte d'article : image 16/10, badges méta, titre, extrait, « Lire l'article ». */
export default function CarteArticle({
  article,
  niveau = 'h2',
  lignesExtrait = 3,
  sizes = '(min-width: 1024px) 380px, (min-width: 640px) 50vw, calc(100vw - 48px)',
}: {
  article: ArticleVue
  /** Niveau du titre, à accorder au plan de la page qui l'affiche. */
  niveau?: 'h2' | 'h3'
  lignesExtrait?: 2 | 3
  sizes?: string
}) {
  const Titre = niveau
  return (
    <a href={`/blog/${article.slug}`} className={cn(cardLink, 'flex flex-col')}>
      <div className="relative aspect-[16/10]">
        <Image src={article.image} alt={article.titre} fill sizes={sizes} className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2.5 p-6">
        <MetaArticle date={article.date} minutes={tempsLecture(article.blocs)} />
        <Titre className="font-heading text-xl font-bold leading-snug text-marine">{article.titre}</Titre>
        <p
          className={cn(
            'flex-1 leading-relaxed text-muted-foreground',
            lignesExtrait === 2 ? 'line-clamp-2' : 'line-clamp-3',
          )}
        >
          {article.excerpt}
        </p>
        <ReadMore />
      </div>
    </a>
  )
}
