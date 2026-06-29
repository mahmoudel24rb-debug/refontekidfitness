import Article from '@/components/ksc/Article'
import { ARTICLES, articleBySlug } from '@/components/ksc/articles'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = articleBySlug(slug)
  if (!a) return { title: 'Blog — Kid Sport Club' }
  return { title: `${a.titre} | Kid Sport Club`, description: a.excerpt }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <Article slug={slug} />
}
