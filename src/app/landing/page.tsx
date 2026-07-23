import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { LANDINGS } from '@/data/landings'

// Répertoire INTERNE des landing pages (confort d'équipe : tous les liens au
// même endroit). Généré depuis data/landings.ts — toute nouvelle landing
// apparaît ici automatiquement. noindex, hors menu, hors sitemap, comme les
// landings elles-mêmes.
export const metadata: Metadata = {
  title: 'Landing pages | répertoire interne',
  robots: { index: false, follow: false },
}

export default function LandingIndex() {
  return (
    <main className="min-h-screen bg-cream px-6 py-12 text-ink">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-10 flex items-center gap-4">
          <Image src="/assets/ksc-logo.png" alt="Kid Sport Club" width={640} height={427} className="h-12 w-auto" />
          <div>
            <h1 className="font-heading text-2xl font-extrabold text-marine">Landing pages</h1>
            <p className="text-sm text-muted-foreground">
              Répertoire interne ({LANDINGS.length}), pages hors menu, non indexées, pour campagnes Meta/Google Ads.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {LANDINGS.map((l) => (
            <Link
              key={l.slug}
              href={`/landing/${l.slug}`}
              className="group flex items-center gap-5 rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative hidden size-16 shrink-0 overflow-hidden rounded-md sm:block">
                <Image src={l.image} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="font-heading text-lg font-bold text-marine">{l.h1}</span>
                  <Badge variant={l.variant === 'catalogue' ? 'brand' : 'age'}>
                    {l.variant === 'catalogue' ? 'Catalogue → CRM' : 'Lead-gen (formulaire)'}
                  </Badge>
                </div>
                <p className="truncate font-mono text-[13px] text-muted-foreground">/landing/{l.slug}</p>
              </div>
              <ArrowRight size={18} className="shrink-0 text-magenta transition-transform group-hover:translate-x-[3px]" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Nouvelle landing = une entrée dans <code className="rounded bg-cream-2 px-1.5 py-0.5 font-mono text-[13px]">src/data/landings.ts</code>, elle apparaîtra ici automatiquement.
        </p>
      </div>
    </main>
  )
}
