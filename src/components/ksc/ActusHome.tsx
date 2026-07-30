import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Kicker from './Kicker'
import SectionHeading from './SectionHeading'
import LinkArrow from './LinkArrow'
import { formatDateFr } from '@/data/articles'
import { getArticles } from '@/lib/contenu'

// Bandeau « Actus & conseils » pour l'accueil : 3 derniers articles + lien blog.
// Maillage interne home -> blog. Tri par date décroissante.
export default async function ActusHome() {
  const articles = await getArticles()
  const derniers = [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  return (
    <section className="bg-cream px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Kicker className="mb-2.5">Actus &amp; conseils</Kicker>
            <SectionHeading underline className="text-[clamp(26px,3.5vw,40px)]">
              Le blog du club
            </SectionHeading>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">Tous les articles</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {derniers.map((a) => (
            <Card key={a.slug} className="gap-0 p-0">
              <div className="relative aspect-[16/9]">
                <Image
                  src={a.image}
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
                <h3 className="font-heading text-[19px] font-bold leading-snug text-marine">{a.titre}</h3>
                <p className="flex-1 leading-relaxed text-muted-foreground">{a.excerpt}</p>
                <LinkArrow href={`/blog/${a.slug}`}>Lire l’article</LinkArrow>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
