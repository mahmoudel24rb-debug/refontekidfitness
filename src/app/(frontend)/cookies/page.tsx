import LegalPage from '@/components/ksc/LegalPage';
import GererCookies from '@/components/ksc/GererCookies'
import { buttonVariants } from '@/components/ui/button'
import { COOKIES } from '@/data/legal'
import { cn } from '@/lib/utils'

// ISR : coordonnées du footer administrables (global `parametres`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: "Gestion des cookies | Kid Sport Club",
  description: "Informations sur l’utilisation des cookies sur le site Kid Sport Club.",
  alternates: { canonical: '/cookies' },
}

export default function Page() {
  return (
    <LegalPage content={COOKIES}>
      {/* Rouvre le panneau du bandeau de consentement (modifier ou retirer son choix). */}
      <GererCookies
        className={cn(
          buttonVariants({ size: 'sm' }),
          'mt-2 cursor-pointer focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1060c873]',
        )}
      />
    </LegalPage>
  )
}
