import LegalPage from '@/components/ksc/LegalPage';
import { COOKIES } from '@/data/legal'

// ISR : coordonnées du footer administrables (global `parametres`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "Gestion des cookies | Kid Sport Club",
  description: "Informations sur l’utilisation des cookies sur le site Kid Sport Club.",
  alternates: { canonical: '/cookies' },
}

export default function Page() {
  return <LegalPage content={COOKIES} />
}
