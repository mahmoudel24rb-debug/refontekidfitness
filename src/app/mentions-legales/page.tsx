import LegalPage from '@/components/ksc/LegalPage';
import { MENTIONS_LEGALES } from '@/data/legal'

export const metadata = {
  title: "Mentions légales | Kid Sport Club",
  description: "Mentions légales du site Kid Sport Club Rochecorbon.",
  alternates: { canonical: '/mentions-legales' },
}

export default function Page() {
  return <LegalPage content={MENTIONS_LEGALES} />
}
