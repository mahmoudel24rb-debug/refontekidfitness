/* Renseigne les liens de reservation en ligne du planning (global parametres).

   Retour client n5 : chaque creneau du calendrier de la semaine ouvre l'outil
   de reservation MSDS, avec un lien par tranche d'age. Le groupe `reservation`
   est ADDITIF : il est vide en base tant que ce script n'a pas tourne, et le
   site retombe alors sur RESERVATION_URLS (src/data/site.ts).

   IDEMPOTENT ET NON DESTRUCTIF :
   - un lien deja renseigne en base n'est JAMAIS reecrit (l'admin fait foi) ;
   - seuls les champs vides sont remplis depuis le fichier de donnees ;
   - les autres champs du global (coordonnees, horaires...) ne sont pas touches.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/fill-reservation-urls.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { RESERVATION_URLS } from '../src/data/site.ts'

const CHAMPS = [
  ['url1036', '10-36 mois'],
  ['url35', '3-5 ans'],
  ['url614', '6-14 ans (et creneaux sans tranche)'],
]

const vide = (v) => typeof v !== 'string' || v.trim().length === 0

async function run() {
  const payload = await getPayload({ config })
  console.log('Liens de reservation du planning (idempotent, non destructif)')

  const global = await payload.findGlobal({ slug: 'parametres' })
  const reservation = { ...(global?.reservation ?? {}) }

  const patch = {}
  let inchanges = 0

  for (const [champ, libelle] of CHAMPS) {
    const avant = reservation[champ]
    if (!vide(avant)) {
      inchanges += 1
      console.log(`- OK      ${champ} (${libelle}) : deja « ${avant} »`)
      continue
    }
    patch[champ] = RESERVATION_URLS[champ]
    console.log(`- MAJ     ${champ} (${libelle}) : vide -> « ${RESERVATION_URLS[champ]} »`)
  }

  if (Object.keys(patch).length === 0) {
    console.log(`Termine : rien a ecrire (${inchanges} lien(s) deja en base).`)
  } else {
    await payload.updateGlobal({
      slug: 'parametres',
      data: { reservation: { ...reservation, ...patch } },
    })
    const apres = await payload.findGlobal({ slug: 'parametres' })
    console.log('- base apres ecriture :')
    for (const [champ] of CHAMPS) console.log(`  · ${champ} = « ${apres?.reservation?.[champ] ?? 'vide'} »`)
    console.log(`Termine : ${Object.keys(patch).length} lien(s) ecrit(s), ${inchanges} deja en base.`)
  }

  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
