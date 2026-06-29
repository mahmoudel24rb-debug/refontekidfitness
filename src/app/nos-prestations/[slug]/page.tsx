import Prestation from '@/components/ksc/Prestation'
import { PRESTATIONS, prestationBySlug } from '@/components/ksc/prestations'

export function generateStaticParams() {
  return PRESTATIONS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = prestationBySlug(slug)
  if (!p) return { title: 'Nos prestations | Kid Sport Club' }
  return {
    title: `${p.titre} (${p.age}) à Rochecorbon | Kid Sport Club`,
    description: `${p.accroche} ${p.motCle} au Kid Sport Club de Rochecorbon, près de Tours.`,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <Prestation slug={slug} />
}
