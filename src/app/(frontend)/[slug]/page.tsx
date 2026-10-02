import type { Metadata } from 'next'
import Landing from '@/components/ksc/Landing'
import { LANDINGS, landingBySlug } from '@/data/landings'

// Landings de campagne servies à la racine (/essai-gratuit, /stage-toussaint…).
// Les pages statiques du site (contact, tarifs…) restent prioritaires sur ce
// segment dynamique ; tout autre chemin à un niveau répond en 404.
// ISR : activités, tarifs, planning, avis, FAQ et coordonnées administrables.
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60
export const dynamicParams = false

export function generateStaticParams() {
  return LANDINGS.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const l = landingBySlug(slug)
  if (!l) return { title: 'Kid Sport Club', robots: { index: false, follow: false } }
  return {
    title: l.metaTitle,
    description: l.metaDescription,
    // Landings de campagne : non indexées pour ne pas concurrencer les pages SEO.
    robots: { index: false, follow: true },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <Landing slug={slug} />
}
