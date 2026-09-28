import Prestation from '@/components/ksc/Prestation'
import { getPrestation, getPrestations } from '@/lib/contenu'

// Contenu administrable (collection `prestations`) : régénération toutes les
// 60 s. Sans base, le contenu prérendu est celui de src/data/prestations.ts.
export const revalidate = 60

export async function generateStaticParams() {
  const prestations = await getPrestations()
  return prestations.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = await getPrestation(slug)
  if (!p) return { title: 'Nos activités | Kid Sport Club' }
  return {
    title: `${p.titre} (${p.age}) à Rochecorbon | Kid Sport Club`,
    description: `${p.accroche} ${p.motCle} au Kid Sport Club de Rochecorbon, près de Tours.`,
    alternates: { canonical: `/nos-prestations/${p.slug}` },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <Prestation slug={slug} />
}
