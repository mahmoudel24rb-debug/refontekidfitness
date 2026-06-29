import LegalPage from '@/components/ksc/LegalPage';
import { COOKIES } from '@/components/ksc/legal'

export const metadata = {
  title: "Gestion des cookies — Kid Sport Club",
  description: "Informations sur l’utilisation des cookies sur le site Kid Sport Club.",
}

export default function Page() {
  return <LegalPage content={COOKIES} />
}
