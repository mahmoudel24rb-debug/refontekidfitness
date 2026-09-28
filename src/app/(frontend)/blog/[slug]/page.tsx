import Article from '@/components/ksc/Article'
import { getArticle, getArticles } from '@/lib/contenu'

// Contenu administrable (collection `articles`) : régénération toutes les 60 s.
// Sans base, le contenu prérendu est celui de src/data/articles.ts.
export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const a = await getArticle(slug)
  if (!a) return { title: 'Blog | Kid Sport Club' }
  return { title: `${a.titre} | Kid Sport Club`, description: a.excerpt, alternates: { canonical: `/blog/${a.slug}` } }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <Article slug={slug} />
}
