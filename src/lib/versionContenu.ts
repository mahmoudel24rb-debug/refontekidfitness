import fs from 'fs'
import path from 'path'

// Version du contenu administrable, partagée par tous les processus Node du site.
//
// Le site garde en mémoire le contenu lu dans Payload (src/lib/contenu.ts) et
// ne relit la base que lorsque cette version change. Hostinger fait tourner
// plusieurs processus Next.js, et la revalidation de Next (revalidatePath) ne
// touche que celui qui a traité l'enregistrement : la version vit donc dans un
// fichier, réécrit à chaque enregistrement dans l'admin (src/lib/revalider.ts)
// et lu par chaque processus avant de servir son contenu en mémoire.
//
// Le fichier est dans .next/cache, propre à chaque déploiement : un nouveau
// déploiement part sans version, et chaque processus relit la base une fois.
//
// Module pur (aucun import de Payload ni de Next).

const FICHIER = path.join(process.cwd(), '.next', 'cache', 'ksc-version-contenu')

/** Version courante, ou '' tant qu'aucun enregistrement n'a eu lieu depuis le déploiement. */
export function lireVersionContenu(): string {
  try {
    return fs.readFileSync(FICHIER, 'utf8')
  } catch {
    return ''
  }
}

/**
 * Nouvelle version : chaque processus relira Payload au prochain rendu.
 * Écriture dans un fichier temporaire puis renommage, pour qu'une lecture
 * simultanée ne tombe jamais sur un fichier à moitié écrit.
 */
export function marquerContenuModifie(): void {
  try {
    fs.mkdirSync(path.dirname(FICHIER), { recursive: true })
    const temporaire = `${FICHIER}.${process.pid}.tmp`
    fs.writeFileSync(temporaire, `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`)
    fs.renameSync(temporaire, FICHIER)
  } catch (erreur) {
    console.warn(
      `[contenu] version du contenu non enregistrée — ${erreur instanceof Error ? erreur.message : String(erreur)}`,
    )
  }
}
