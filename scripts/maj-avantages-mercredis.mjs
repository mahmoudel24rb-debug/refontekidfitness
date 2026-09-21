/* Remplace les avantages de la carte « Mercredis Sportifs » (page /tarifs) par
   le texte fourni par le club le 21/09/2026 (src/data/tarifs.ts).

   IDEMPOTENT ET NON DESTRUCTIF : n'ecrit que si les 4 lignes en base sont
   encore celles redigees par l'agence (retour n5). Un texte modifie dans
   l'admin entre-temps est laisse tel quel et signale. Aucun autre tarif touche.

   Prerequis : DATABASE_URL definie dans `.env`. ATTENTION : base de PRODUCTION.
   Usage : npm run payload -- run scripts/maj-avantages-mercredis.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { PRESTATIONS_TARIFS } from '../src/data/tarifs.ts'

const TITRE = 'Mercredis Sportifs'
const ANCIENS = [
  'Tous les mercredis, hors vacances d’été',
  'Accueil échelonné de 7h30 à 10h00',
  'Activités sportives encadrées matin et après-midi',
  'Départ échelonné jusqu’à 18h00',
]

async function run() {
  const payload = await getPayload({ config })
  const cible = PRESTATIONS_TARIFS.find((t) => t.titre === TITRE)
  const nouveaux = cible?.avantages ?? []
  if (nouveaux.length === 0) throw new Error(`Aucun avantage pour « ${TITRE} » dans src/data/tarifs.ts`)

  const { docs } = await payload.find({ collection: 'tarifs', where: { titre: { equals: TITRE } }, limit: 1 })
  const d = docs[0]
  if (!d) {
    console.log(`- ABSENT  « ${TITRE} » n'existe pas en base, rien a faire`)
  } else {
    const actuels = (d.avantages ?? []).map((a) => a.texte)
    const identique = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])
    if (identique(actuels, nouveaux)) {
      console.log(`- OK      #${d.id} ${TITRE} : deja a jour (${actuels.length} avantages)`)
    } else if (!identique(actuels, ANCIENS)) {
      console.log(`- LAISSE  #${d.id} ${TITRE} : texte modifie dans l'admin, non touche :`)
      for (const a of actuels) console.log(`            « ${a} »`)
    } else {
      await payload.update({
        collection: 'tarifs',
        id: d.id,
        data: { avantages: nouveaux.map((texte) => ({ texte })) },
      })
      console.log(`- MAJ     #${d.id} ${TITRE} :`)
      for (const a of nouveaux) console.log(`            « ${a} »`)
    }
  }

  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
