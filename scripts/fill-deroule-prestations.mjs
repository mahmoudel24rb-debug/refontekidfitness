/* Renseigne le deroule de la journee des fiches Mercredis Sportifs et Stages
   vacances (etapes, phrase d'introduction, note de fin).

   Les champs `deroule`, `derouleIntro` et `derouleNote` sont ADDITIFS : ils ont
   ete ajoutes a la collection `prestations` apres la mise en ligne, les fiches
   deja saisies les ont donc vides. La fiche retombe sur src/data/prestations.ts
   cote lecture ; ce script materialise les valeurs en base pour qu'elles soient
   visibles et modifiables dans l'admin.

   IDEMPOTENT ET NON DESTRUCTIF :
   - une fiche qui a DEJA des etapes n'est pas touchee (le contenu de l'admin
     fait foi, il n'est jamais reecrit) ;
   - `derouleIntro` et `derouleNote` ne sont ecrits que s'ils sont vides ;
   - appariement par SLUG ; une fiche absente de la base est ignoree ; une fiche
     sans deroule dans le fichier n'est pas touchee.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/fill-deroule-prestations.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { PRESTATIONS } from '../src/data/prestations.ts'

const vide = (v) => typeof v !== 'string' || v.trim().length === 0
const videListe = (v) => !Array.isArray(v) || v.length === 0

async function run() {
  const payload = await getPayload({ config })
  console.log('Deroule de la journee des prestations (idempotent, non destructif)')

  const source = PRESTATIONS.filter((p) => (p.deroule ?? []).length > 0)
  console.log(`- fichier : ${source.length} fiche(s) avec un deroule`)

  let majs = 0
  let inchanges = 0
  let absentes = 0

  for (const p of source) {
    const { docs } = await payload.find({
      collection: 'prestations',
      where: { slug: { equals: p.slug } },
      limit: 1,
      depth: 0,
    })
    const doc = docs[0]
    if (!doc) {
      absentes += 1
      console.log(`- ABSENTE ${p.slug} : pas en base, ignoree`)
      continue
    }

    const patch = {}
    if (videListe(doc.deroule)) {
      patch.deroule = p.deroule.map((e) => ({
        horaire: e.horaire,
        titre: e.titre,
        description: e.description,
      }))
    }
    if (vide(doc.derouleIntro) && !vide(p.derouleIntro)) patch.derouleIntro = p.derouleIntro
    if (vide(doc.derouleNote) && !vide(p.derouleNote)) patch.derouleNote = p.derouleNote

    if (Object.keys(patch).length === 0) {
      inchanges += 1
      console.log(
        `- OK      ${p.slug} : ${doc.deroule.length} etape(s) deja en base, intro=${
          doc.derouleIntro ? 'oui' : 'non'
        }, note=${doc.derouleNote ? 'oui' : 'non'}`,
      )
      continue
    }

    await payload.update({ collection: 'prestations', id: doc.id, data: patch })
    majs += 1
    const details = []
    if (patch.deroule) {
      details.push(`${patch.deroule.length} etape(s)`)
      for (const e of patch.deroule) console.log(`  · ${e.horaire} : ${e.titre}`)
    }
    if (patch.derouleIntro) details.push('phrase d\'introduction')
    if (patch.derouleNote) details.push('note de fin')
    console.log(`- MAJ     ${p.slug} : ${details.join(', ')}`)
  }

  console.log(`Termine : ${majs} fiche(s) mise(s) a jour, ${inchanges} inchangee(s), ${absentes} absente(s).`)
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
