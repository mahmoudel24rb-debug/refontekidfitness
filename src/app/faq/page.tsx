import Faq from '@/components/ksc/Faq'

// ISR : questions administrables (collection `faq`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "FAQ | Kid Sport Club Rochecorbon",
  description: "À quel âge commencer, séance d’essai gratuite, inscriptions, tarifs, Mercredis Sportifs, stages et anniversaires : les réponses aux questions des parents.",
  alternates: { canonical: '/faq' },
}

export default function Page() {
  return <Faq />
}
