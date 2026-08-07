import type { MetadataRoute } from 'next'
import { getArticles, getPrestations } from '@/lib/contenu'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

// Les fiches et les articles suivent le contenu administrable (repli src/data).
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [prestations, articles] = await Promise.all([getPrestations(), getArticles()])
  const routes = [
    '', '/qui-sommes-nous', '/nos-prestations', '/tarifs', '/planning', '/faq', '/contact', '/seance-essai', '/blog',
    '/mentions-legales', '/confidentialite', '/cookies', '/cgv',
    ...prestations.flatMap((p) => [
      `/nos-prestations/${p.slug}`,
      // Une page par activité de la tranche d'âge (4 cours = 24 URLs).
      ...(p.disciplines ?? []).map((d) => `/nos-prestations/${p.slug}/${d.slug}`),
    ]),
    ...articles.map((a) => `/blog/${a.slug}`),
  ]
  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date('2026-06-29'),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : path.startsWith('/nos-prestations') ? 0.8 : 0.6,
  }))
}
