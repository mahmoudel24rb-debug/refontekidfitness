import Landing from '@/components/ksc/Landing'
import { metadataLanding } from '@/lib/pageLanding'

// Landing /stage-toussaint (contenu : src/data/landings.ts). Une page statique par
// landing, à la racine : elle se régénère comme les autres pages après un
// enregistrement dans l'admin (revalidatePath), et toute adresse inconnue
// garde la page 404 du site.
// ISR : activités, tarifs, planning, avis, FAQ et coordonnées administrables.
export const revalidate = 60

export const metadata = metadataLanding('stage-toussaint')

export default function Page() {
  return <Landing slug="stage-toussaint" />
}
