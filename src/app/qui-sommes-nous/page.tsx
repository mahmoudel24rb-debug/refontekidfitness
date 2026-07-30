import QuiSommesNous from '@/components/ksc/QuiSommesNous'

// ISR : équipe administrable (collection `equipe`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "Qui sommes-nous | Kid Sport Club Rochecorbon",
  description: "Le club de sport des enfants de 10 mois à 14 ans à Rochecorbon : psychomotricité, jeu et encadrement diplômé.",
  alternates: { canonical: '/qui-sommes-nous' },
}

export default function Page() {
  return <QuiSommesNous />
}
