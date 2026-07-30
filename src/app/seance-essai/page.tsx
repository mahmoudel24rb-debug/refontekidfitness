import SeanceEssai from '@/components/ksc/SeanceEssai'

// ISR : équipe, avis et coordonnées administrables.
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "Séance d’essai | Kid Sport Club Rochecorbon",
  description: "Réservez une séance d’essai pour découvrir le Kid Sport Club de Rochecorbon avec votre enfant.",
  alternates: { canonical: '/seance-essai' },
}

export default function Page() {
  return <SeanceEssai />
}
