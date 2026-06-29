import LegalPage from '@/components/ksc/LegalPage';
import { CONFIDENTIALITE } from '@/components/ksc/legal'

export const metadata = {
  title: "Politique de confidentialité — Kid Sport Club",
  description: "Politique de confidentialité et protection des données (RGPD) du Kid Sport Club.",
}

export default function Page() {
  return <LegalPage content={CONFIDENTIALITE} />
}
