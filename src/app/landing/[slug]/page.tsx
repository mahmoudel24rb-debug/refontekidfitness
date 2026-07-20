import type { Metadata } from 'next'
import Landing from '@/components/ksc/Landing'
import { LANDINGS, landingBySlug } from '@/data/landings'

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
