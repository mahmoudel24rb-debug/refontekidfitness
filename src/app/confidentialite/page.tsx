import LegalPage from '@/components/ksc/LegalPage';
import { CONFIDENTIALITE } from '@/data/legal'

export const metadata = {
  title: "Politique de confidentialité — Kid Sport Club",
  description: "Politique de confidentialité et protection des données (RGPD) du Kid Sport Club.",
  alternates: { canonical: '/confidentialite' },
}

export default function Page() {
  return <LegalPage content={CONFIDENTIALITE} />
}
