import LegalPage from '@/components/ksc/LegalPage';
import { CONFIDENTIALITE } from '@/data/legal'

// ISR : coordonnées du footer administrables (global `parametres`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "Politique de confidentialité | Kid Sport Club",
  description: "Politique de confidentialité et protection des données (RGPD) du Kid Sport Club.",
  alternates: { canonical: '/confidentialite' },
}

export default function Page() {
  return <LegalPage content={CONFIDENTIALITE} />
}
