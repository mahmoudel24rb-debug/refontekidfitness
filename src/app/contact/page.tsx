import ContactKSC from '@/components/ksc/ContactKSC'

// ISR : coordonnées administrables (global `parametres`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: 'Contact | Kid Sport Club Rochecorbon',
  description:
    'Contactez le Kid Sport Club à Rochecorbon (près de Tours) : adresse, téléphone, horaires, formulaire et plan d’accès.',
  alternates: { canonical: '/contact' },
}

export default function Page() {
  return <ContactKSC />
}
