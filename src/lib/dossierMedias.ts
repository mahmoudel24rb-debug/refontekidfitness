import os from 'os'
import path from 'path'

// Dossier de stockage des images téléversées dans l'admin (collection media).
//
// En production, le site tourne sur Hostinger (application Node.js déployée
// depuis GitHub). Chaque déploiement remplace le dossier de l'application : le
// dossier `media` que Payload utilise par défaut, relatif au projet, serait
// vidé à chaque mise en ligne et les images perdues. Elles sont donc écrites en
// dehors, dans le dossier personnel de l'utilisateur système : ~/ksc-medias.
//
// Module pur (aucun import de Payload ni de Next) et sans effet de bord : il ne
// crée pas le dossier. Payload le crée au premier téléversement (mkdir
// récursif dans payload/dist/uploads/generateFileData.js).

/**
 * Dossier où Payload écrit les fichiers de la collection media, ou `undefined`
 * pour garder le dossier par défaut de Payload.
 *
 * 1. MEDIA_DIR, s'il est défini (valeur non vide) : un « ~ » en tête est
 *    remplacé par le dossier personnel (os.homedir()) ; un chemin absolu est
 *    gardé tel quel ; un chemin relatif est résolu depuis process.cwd().
 * 2. Sinon, en production hors Vercel (Hostinger) : ~/ksc-medias.
 * 3. Sinon (développement local, Vercel) : `undefined`, Payload écrit dans le
 *    dossier `media` du projet (ignoré par Git).
 */
export function dossierMedias(env: NodeJS.ProcessEnv = process.env): string | undefined {
  const valeur = env.MEDIA_DIR?.trim()
  if (valeur) {
    if (valeur.startsWith('~')) return path.join(os.homedir(), valeur.slice(1))
    return path.isAbsolute(valeur) ? valeur : path.resolve(process.cwd(), valeur)
  }
  if (env.NODE_ENV === 'production' && !env.VERCEL) {
    return path.join(os.homedir(), 'ksc-medias')
  }
  return undefined
}
