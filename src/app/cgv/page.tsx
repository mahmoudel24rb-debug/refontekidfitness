import LegalPage from '@/components/ksc/LegalPage';
import { CGV } from '@/data/legal'

export const metadata = {
  title: "CGV — Kid Sport Club",
  description: "Conditions générales de vente du Kid Sport Club Rochecorbon.",
  alternates: { canonical: '/cgv' },
}

export default function Page() {
  return <LegalPage content={CGV} />
}
