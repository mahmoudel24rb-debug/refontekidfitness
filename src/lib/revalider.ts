import { revalidatePath } from 'next/cache'
import { after } from 'next/server'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

import { marquerContenuModifie } from './versionContenu'

/**
 * Remet tout le site à jour après une modification dans l'admin :
 * - nouvelle version du contenu (src/lib/versionContenu.ts) : chaque processus
 *   Node relit Payload au lieu de servir le contenu gardé en mémoire ;
 * - toutes les pages (layout racine « / ») du processus qui a traité
 *   l'enregistrement sont régénérées à leur prochaine visite ; les autres
 *   processus suivent à leur revalidation périodique (revalidate = 60).
 *
 * La version est écrite après la réponse (`after`) : la transaction de
 * l'enregistrement est alors validée, et une lecture lancée entre-temps ne peut
 * pas garder l'ancien contenu sous la nouvelle version.
 *
 * Hors de Next.js (scripts `payload run` : seed, remplissages), `after` et
 * revalidatePath lèvent une erreur : la version est alors écrite tout de suite,
 * dans le dossier local du script. Une modification faite par un script sur la
 * base de production n'atteint donc pas le site en ligne : enregistrer ensuite
 * un document dans l'admin pour le mettre à jour.
 */
export function revaliderSite(): void {
  try {
    after(marquerContenuModifie)
  } catch {
    marquerContenuModifie()
  }
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
