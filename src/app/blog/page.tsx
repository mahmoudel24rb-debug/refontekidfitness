import BlogKSC from '@/components/ksc/BlogKSC'

// ISR : articles administrables (collection `articles`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: 'Blog & actualités | Kid Sport Club Rochecorbon',
  description: "Conseils aux parents et actualités du club : âge pour le sport, motricité, anniversaires, stages de vacances.",
  alternates: { canonical: '/blog' },
}

export default function Page() {
  return <BlogKSC />
}
