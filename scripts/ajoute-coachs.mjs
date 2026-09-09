/* Ajoute a la collection `equipe` les coachs presents dans src/data/equipe.ts
   mais absents de la base.

   Retour client n5 : Louise Plantureux et Ema Bouton rejoignent l'equipe.

   IDEMPOTENT ET NON DESTRUCTIF :
   - un coach dont le NOM existe deja en base n'est ni cree ni modifie (la
     fiche de l'admin fait foi : bio retouchee, photo chargee...) ;
   - `ordre` reprend la position du coach dans le fichier de donnees ;
   - aucun coach n'est supprime, aucune fiche existante n'est reecrite.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/ajoute-coachs.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { EQUIPE } from '../src/data/equipe.ts'

async function run() {
  const payload = await getPayload({ config })
  console.log('Coachs de l\'equipe (idempotent, non destructif)')

  const { docs } = await payload.find({ collection: 'equipe', limit: 200, sort: 'ordre' })
  console.log(`- base : ${docs.length} coach(s) — ${docs.map((d) => d.nom).join(', ')}`)

  let crees = 0
  let inchanges = 0

  for (const [index, coach] of EQUIPE.entries()) {
    const existant = docs.find((d) => d.nom === coach.nom)
    if (existant) {
      inchanges += 1
      console.log(`- OK      ${coach.nom} : deja en base (#${existant.id}, ordre ${existant.ordre})`)
      continue
    }
    const cree = await payload.create({
      collection: 'equipe',
      data: { nom: coach.nom, initiales: coach.initiales, bio: coach.bio, ordre: index },
    })
    crees += 1
    console.log(`- CREE    ${coach.nom} (${coach.initiales}) : #${cree.id}, ordre ${index}`)
  }

  const { totalDocs } = await payload.count({ collection: 'equipe' })
  console.log(`Termine : ${crees} coach(s) cree(s), ${inchanges} deja en base, ${totalDocs} au total.`)
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
