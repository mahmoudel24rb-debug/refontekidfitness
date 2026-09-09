/* Met a jour la duree reelle des creneaux du planning et corrige le nom
   « Multisport » (singulier) en « Multisports ».

   Retour client n5 : chaque cours a sa duree (45 min ou 1h). Le champ `duree`
   existe deja en base, rempli a 60 partout par fill-duree-planning.mjs ; ce
   script pose la valeur reelle, activite par activite.

   IDEMPOTENT ET NON DESTRUCTIF :
   - un creneau dont la duree est deja la bonne n'est PAS touche ;
   - un creneau dont l'activite est inconnue du mapping est LAISSE tel quel et
     signale (aucune valeur par defaut n'est imposee) ;
   - aucun creneau n'est cree ni supprime, aucun autre champ n'est ecrit.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/maj-durees-planning.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

// Duree d'une seance, par activite du planning (source : le club).
const DUREES = {
  'Baby Gym': 45,
  'Gym Dance': 45,
  'Cross Boxe': 45,
  Multisports: 60,
  Pompom: 45,
  'Pompom Girl': 45,
  Zumba: 45,
  'Fit Family': 60,
  'Gym Accro': 60,
}

// Corrections de nom : « Multisport » au singulier est une coquille de saisie.
const RENOMMAGES = { Multisport: 'Multisports' }

async function run() {
  const payload = await getPayload({ config })
  console.log('Durees reelles des creneaux du planning (idempotent, non destructif)')

  const { docs } = await payload.find({ collection: 'planning', limit: 500, sort: 'ordre' })
  console.log(`- base : ${docs.length} creneau(x)`)

  let majs = 0
  let inchanges = 0
  let inconnus = 0

  for (const d of docs) {
    const nom = RENOMMAGES[d.activite] ?? d.activite
    const cible = DUREES[nom]
    const etiquette = `#${d.id} ${d.jour} ${d.heure} ${d.activite}`

    if (!cible) {
      inconnus += 1
      console.log(`- LAISSE  ${etiquette} : activite hors mapping, non touchee`)
      continue
    }

    const patch = {}
    if (nom !== d.activite) patch.activite = nom
    if (d.duree !== cible) patch.duree = cible

    if (Object.keys(patch).length === 0) {
      inchanges += 1
      console.log(`- OK      ${etiquette} : duree=${d.duree} min deja correcte`)
      continue
    }

    await payload.update({ collection: 'planning', id: d.id, data: patch })
    majs += 1
    const details = []
    if (patch.activite) details.push(`activite « ${d.activite} » -> « ${patch.activite} »`)
    if (patch.duree) details.push(`duree ${d.duree ?? 'vide'} -> ${patch.duree} min`)
    console.log(`- MAJ     ${etiquette} : ${details.join(', ')}`)
  }

  console.log(`Termine : ${majs} mise(s) a jour, ${inchanges} inchange(s), ${inconnus} hors mapping.`)
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
