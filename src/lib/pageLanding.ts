import type { Metadata } from 'next'

import { landingBySlug } from '@/data/landings'

// Métadonnées d'une landing (pages src/app/(frontend)/{slug}/page.tsx).
// Landings de campagne : non indexées pour ne pas concurrencer les pages SEO,
// sauf celles marquées indexable (stages de la Toussaint), listées au sitemap.
export function metadataLanding(slug: string): Metadata {
  const l = landingBySlug(slug)
  if (!l) throw new Error(`Landing inconnue : ${slug} (src/data/landings.ts)`)
  if (l.indexable) {
    return { title: l.metaTitle, description: l.metaDescription, alternates: { canonical: `/${l.slug}` } }
  }
  return { title: l.metaTitle, description: l.metaDescription, robots: { index: false, follow: true } }
}
