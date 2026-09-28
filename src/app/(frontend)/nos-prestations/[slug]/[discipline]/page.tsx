import { notFound } from 'next/navigation'

import DisciplinePage from '@/components/ksc/DisciplinePage'
import { getPrestation, getPrestations } from '@/lib/contenu'

// Une page par activité de tranche d'âge (24 au total), imbriquée sous la
// fiche du cours. Contenu administrable (collection `prestations`, array
// `disciplines`) : régénération toutes les 60 s, repli src/data/prestations.ts.
export const revalidate = 60

type Params = Promise<{ slug: string; discipline: string }>

export async function generateStaticParams() {
  const prestations = await getPrestations()
  return prestations.flatMap((p) =>
    (p.disciplines ?? []).map((d) => ({ slug: p.slug, discipline: d.slug })),
  )
}

// Première phrase de l'accroche : garde la meta description sous ~160 signes.
const premierePhrase = (texte: string) => {
  const i = texte.indexOf('. ')
  return i === -1 ? texte : texte.slice(0, i + 1)
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, discipline } = await params
  const p = await getPrestation(slug)
  const d = p?.disciplines?.find((x) => x.slug === discipline)
  if (!p || !d) return { title: 'Nos activités | Kid Sport Club' }
  return {
    title: `${d.nom} (${p.age}) à Rochecorbon | Kid Sport Club`,
    description: `${premierePhrase(d.accroche)} ${d.nom} (${p.age}) au Kid Sport Club de Rochecorbon : ${p.motCle}.`,
    alternates: { canonical: `/nos-prestations/${p.slug}/${d.slug}` },
  }
}

export default async function Page({ params }: { params: Params }) {
  const { slug, discipline } = await params
  const p = await getPrestation(slug)
  if (!p?.disciplines?.some((d) => d.slug === discipline)) notFound()
  return <DisciplinePage slug={slug} discipline={discipline} />
}
