/* Uniformise les apostrophes des textes du club en apostrophe courbe (’),
   comme le reste du site : ' entre deux lettres devient ’. Aucun mot ne change.

   Perimetre : prestations (derouleIntro, deroule[].titre/description,
   derouleNote, noteDisciplines, disciplines[].nom et description) et equipe
   (bio). Les slugs, `activitePlanning` et tout le reste sont intacts. Les
   lignes des tableaux gardent leur `id` : mise a jour en place, rien n'est
   recree. N'ecrit que s'il y a un changement (idempotent).

   Prerequis : DATABASE_URL definie dans `.env`. ATTENTION : base de PRODUCTION.
   Usage : npm run payload -- run scripts/normalise-apostrophes.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const LETTRE = 'A-Za-zÀ-ÖØ-öø-ÿ'
const RE = new RegExp(`(?<=[${LETTRE}])'(?=[${LETTRE}])`, 'g')
const courbe = (s) => (typeof s === 'string' ? s.replace(RE, '’') : s)

let ecritures = 0

async function traiterPrestations(payload) {
  const { docs } = await payload.find({ collection: 'prestations', limit: 100, depth: 0 })
  for (const d of docs) {
    let change = 0
    const patch = {}
    for (const champ of ['derouleIntro', 'derouleNote', 'noteDisciplines']) {
      const v = courbe(d[champ])
      if (v !== d[champ]) { patch[champ] = v; change += 1 }
    }
    if (Array.isArray(d.deroule) && d.deroule.length > 0) {
      const deroule = d.deroule.map((e) => ({ ...e, titre: courbe(e.titre), description: courbe(e.description) }))
      if (deroule.some((e, i) => e.titre !== d.deroule[i].titre || e.description !== d.deroule[i].description)) {
        patch.deroule = deroule
        change += 1
      }
    }
    if (Array.isArray(d.disciplines) && d.disciplines.length > 0) {
      const disciplines = d.disciplines.map((x) => ({ ...x, nom: courbe(x.nom), description: courbe(x.description) }))
      if (disciplines.some((x, i) => x.nom !== d.disciplines[i].nom || x.description !== d.disciplines[i].description)) {
        patch.disciplines = disciplines
        change += 1
      }
    }
    if (change === 0) {
      console.log(`- OK      prestation #${d.id} ${d.titre}`)
      continue
    }
    await payload.update({ collection: 'prestations', id: d.id, data: patch })
    ecritures += 1
    console.log(`- MAJ     prestation #${d.id} ${d.titre} : ${Object.keys(patch).join(', ')}`)
  }
}

async function traiterEquipe(payload) {
  const { docs } = await payload.find({ collection: 'equipe', limit: 100, depth: 0 })
  for (const d of docs) {
    const bio = courbe(d.bio)
    if (bio === d.bio) {
      console.log(`- OK      coach #${d.id} ${d.nom}`)
      continue
    }
    await payload.update({ collection: 'equipe', id: d.id, data: { bio } })
    ecritures += 1
    console.log(`- MAJ     coach #${d.id} ${d.nom} : bio`)
  }
}

async function run() {
  const payload = await getPayload({ config })
  console.log('Apostrophes courbes dans les textes du club (idempotent)')
  await traiterPrestations(payload)
  await traiterEquipe(payload)
  console.log(`Termine : ${ecritures} ecriture(s).`)
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
