import LegalPage from '@/components/ksc/LegalPage';
import { CGV } from '@/data/legal'

// ISR : coordonnées du footer administrables (global `parametres`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "CGV | Kid Sport Club",
  description: "Conditions générales de vente du Kid Sport Club Rochecorbon.",
  alternates: { canonical: '/cgv' },
}

export default function Page() {
  return <LegalPage content={CGV} />
}
