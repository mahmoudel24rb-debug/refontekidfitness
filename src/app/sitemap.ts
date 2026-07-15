import type { MetadataRoute } from 'next'
import { PRESTATIONS } from '@/components/ksc/prestations'
import { ARTICLES } from '@/components/ksc/articles'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/qui-sommes-nous', '/nos-prestations', '/tarifs', '/planning', '/faq', '/contact', '/seance-essai', '/blog',
    '/mentions-legales', '/confidentialite', '/cookies', '/cgv',
    ...PRESTATIONS.map((p) => `/nos-prestations/${p.slug}`),
    ...ARTICLES.map((a) => `/blog/${a.slug}`),
  ]
  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date('2026-06-29'),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path.startsWith('/nos-prestations') ? 0.8 : 0.6,
  }))
}
