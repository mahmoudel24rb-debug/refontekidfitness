import LegalPage from '@/components/ksc/LegalPage';
import { MENTIONS_LEGALES } from '@/data/legal'

// ISR : coordonnées du footer administrables (global `parametres`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "Mentions légales | Kid Sport Club",
  description: "Mentions légales du site Kid Sport Club Rochecorbon.",
  alternates: { canonical: '/mentions-legales' },
}

export default function Page() {
  return <LegalPage content={MENTIONS_LEGALES} />
}
