import TarifsKSC from '@/components/ksc/TarifsKSC'

// ISR : tarifs administrables (collection `tarifs`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: 'Tarifs : abonnements et prestations | Kid Sport Club',
  description:
    "Tarifs du Kid Sport Club de Rochecorbon : abonnements aux cours dès 29,90 €/mois, mercredis sportifs, stages vacances et anniversaires. Séance d'essai pour découvrir le club.",
  alternates: { canonical: '/tarifs' },
}

export default function Page() {
  return <TarifsKSC />
}
