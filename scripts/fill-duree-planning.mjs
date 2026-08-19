/* Renseigne la duree des creneaux du planning qui n'en ont pas encore.

   Le champ `duree` est ADDITIF : il a ete ajoute a la collection `planning`
   apres la mise en ligne, les creneaux deja saisis l'ont donc a NULL. Le
   calendrier de la semaine s'en sert pour la hauteur des blocs, et retombe sur
   60 minutes cote lecture — ce script materialise cette valeur en base pour
   qu'elle soit visible et modifiable dans l'admin.

   IDEMPOTENT ET NON DESTRUCTIF :
   - un creneau dont la duree est deja un nombre > 0 n'est PAS touche ;
   - un creneau dont la duree est nulle/absente recoit 60 ;
   - aucun autre champ n'est ecrit, aucune ligne n'est supprimee.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/fill-duree-planning.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const DUREE_DEFAUT = 60

async function run() {
  const payload = await getPayload({ config })
  console.log('Duree des creneaux du planning (idempotent, non destructif)')

  const { docs } = await payload.find({ collection: 'planning', limit: 500, sort: 'ordre' })
  console.log(`- base : ${docs.length} creneau(x)`)

  let majs = 0
  let inchanges = 0

  for (const d of docs) {
    const actuelle = typeof d.duree === 'number' && d.duree > 0 ? d.duree : null
    const etiquette = `#${d.id} ${d.jour} ${d.heure} ${d.activite}`

    if (actuelle !== null) {
      inchanges += 1
      console.log(`- OK      ${etiquette} : duree=${actuelle} min deja renseignee`)
      continue
    }

    await payload.update({
      collection: 'planning',
      id: d.id,
      data: { duree: DUREE_DEFAUT },
    })
    majs += 1
    console.log(`- MAJ     ${etiquette} : duree=${DUREE_DEFAUT} min (avant : ${d.duree ?? 'vide'})`)
  }

  console.log(`Termine : ${majs} mise(s) a jour, ${inchanges} inchange(s).`)
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
