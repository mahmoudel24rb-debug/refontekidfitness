import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

/**
 * Remet tout le site à jour après une modification dans l'admin : toutes les
 * pages (layout racine « / ») seront régénérées à leur prochaine visite, sans
 * attendre la revalidation périodique (revalidate = 60).
 *
 * Silencieux hors de Next.js : les scripts `payload run` (seed, remplissages)
 * n'ont pas de contexte de rendu et revalidatePath y lève une erreur.
 */
export function revaliderSite(): void {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Hors contexte Next (script `payload run`) : rien à revalider.
  }
}

// Hooks prêts à brancher sur les collections de contenu et le global.
export const revaliderApresEnregistrement: CollectionAfterChangeHook = ({ doc }) => {
  revaliderSite()
  return doc
}

export const revaliderApresSuppression: CollectionAfterDeleteHook = ({ doc }) => {
  revaliderSite()
  return doc
}

export const revaliderApresReglages: GlobalAfterChangeHook = ({ doc }) => {
  revaliderSite()
  return doc
}

// À placer dans `hooks` d'une collection de contenu. Tableaux neufs à chaque
// appel : Payload ou un plugin peut compléter les hooks d'une collection sans
// toucher aux autres.
export const hooksRevalidation = () => ({
  afterChange: [revaliderApresEnregistrement],
  afterDelete: [revaliderApresSuppression],
})
