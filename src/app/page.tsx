import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'

// Metadata dédiée Accueil (mot-clé focus : club de sport enfant Rochecorbon).
export const metadata: Metadata = {
  title: 'Club de sport enfant à Rochecorbon (Tours) — Kid Sport Club',
  description:
    "Kid Sport Club : le club de sport des enfants de 10 mois à 14 ans à Rochecorbon, près de Tours. Baby gym, éveil sportif, multisports, stages, mercredis sportifs et anniversaires. Séance d'essai et inscription en ligne.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Club de sport enfant à Rochecorbon — Kid Sport Club',
    description:
      "Le club de sport des enfants de 10 mois à 14 ans à Rochecorbon (près de Tours) : baby gym, cours, stages, mercredis sportifs et anniversaires sportifs.",
    url: '/',
  },
}

// Port fidèle du DOM SSR Kinderly (page entière, #main). Recolorisation charte KSC à suivre.
export default function Home() {
  return <HomePage />
}
