/* Renseigne les avantages et l'icone des tarifs qui n'en ont pas encore.

   Les champs `avantages` et `icone` sont ADDITIFS : ils ont ete ajoutes a la
   collection `tarifs` apres la mise en ligne, les tarifs deja saisis les ont
   donc vides. La page /tarifs retombe sur src/data/tarifs.ts cote lecture ; ce
   script materialise les valeurs en base pour qu'elles soient visibles et
   modifiables dans l'admin.

   IDEMPOTENT ET NON DESTRUCTIF :
   - un tarif qui a DEJA des avantages n'est pas touche (le texte saisi dans
     l'admin fait foi, il n'est jamais reecrit) ;
   - un tarif qui a deja une icone garde la sienne ;
   - seuls les champs vides sont remplis, depuis le fichier de donnees,
     apparies par TITRE ;
   - un tarif de la base absent du fichier est laisse tel quel.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/fill-avantages-tarifs.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { ABONNEMENTS, PRESTATIONS_TARIFS } from '../src/data/tarifs.ts'

const FICHIER = [...ABONNEMENTS, ...PRESTATIONS_TARIFS]

async function run() {
  const payload = await getPayload({ config })
  console.log('Avantages et icones des tarifs (idempotent, non destructif)')

  const { docs } = await payload.find({ collection: 'tarifs', limit: 200, sort: 'ordre' })
  console.log(`- base : ${docs.length} tarif(s)`)

  let majs = 0
  let inchanges = 0
  let horsFichier = 0

  for (const d of docs) {
    const fichier = FICHIER.find((t) => t.titre === d.titre)
    const etiquette = `#${d.id} [${d.type}] ${d.titre}`

    if (!fichier) {
      horsFichier += 1
      console.log(`- LAISSE  ${etiquette} : absent du fichier, non touche`)
      continue
    }

    const patch = {}
    const dejaLa = Array.isArray(d.avantages) && d.avantages.length > 0
    if (!dejaLa && (fichier.avantages ?? []).length > 0) {
      patch.avantages = fichier.avantages.map((texte) => ({ texte }))
    }
    if (!d.icone && fichier.icone) patch.icone = fichier.icone

    if (Object.keys(patch).length === 0) {
      inchanges += 1
      console.log(
        `- OK      ${etiquette} : ${dejaLa ? `${d.avantages.length} avantage(s)` : 'aucun avantage attendu'}, icone=${d.icone ?? '-'}`,
      )
      continue
    }

    await payload.update({ collection: 'tarifs', id: d.id, data: patch })
    majs += 1
    const details = []
    if (patch.avantages) {
      details.push(`avantages=[${patch.avantages.map((a) => `« ${a.texte} »`).join(' | ')}]`)
    }
    if (patch.icone) details.push(`icone="${patch.icone}" (avant : vide)`)
    console.log(`- MAJ     ${etiquette} : ${details.join(', ')}`)
  }

  console.log(
    `Termine : ${majs} mise(s) a jour, ${inchanges} inchange(s), ${horsFichier} hors fichier.`,
  )
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
