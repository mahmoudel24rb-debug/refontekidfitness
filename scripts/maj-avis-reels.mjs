/* Aligne la collection `avis` sur les 6 avis Google reels de src/data/avis.ts.

   NON DESTRUCTIF : le script ne supprime jamais rien.
   - un avis deja en base (apparie sur le DEBUT de son texte) est simplement
     complete : auteur + photo, et rien d'autre. Le TEXTE n'est jamais reecrit
     (les extraits mis en scene par PullQuote en sont des sous-chaines exactes) ;
   - un avis du fichier absent de la base est insere a la suite ;
   - un avis present en base mais absent du fichier est laisse tel quel.

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/maj-avis-reels.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { AVIS } from '../src/data/avis.ts'

/** Cle d'appariement : debut du texte, insensible aux espaces multiples. */
const cle = (texte) => String(texte ?? '').replace(/\s+/g, ' ').trim().slice(0, 40)

async function run() {
  const payload = await getPayload({ config })
  console.log('MAJ des avis reels Kid Sport Club (non destructif)')

  const { docs } = await payload.find({ collection: 'avis', limit: 200, sort: 'ordre' })
  console.log(`- base : ${docs.length} avis en place`)

  let majs = 0
  let inserts = 0
  let inchanges = 0
  let ordre = docs.reduce((max, d) => Math.max(max, Number(d.ordre) || 0), -1)

  for (const avis of AVIS) {
    const doc = docs.find((d) => cle(d.texte) === cle(avis.texte))

    if (!doc) {
      ordre += 1
      const cree = await payload.create({
        collection: 'avis',
        data: { texte: avis.texte, auteur: avis.auteur, photo: avis.photo ?? '', ordre },
      })
      inserts += 1
      console.log(`- INSERE  #${cree.id} ordre=${ordre} « ${avis.auteur} » : ${cle(avis.texte)}...`)
      continue
    }

    const patch = {}
    if (doc.auteur !== avis.auteur) patch.auteur = avis.auteur
    if ((doc.photo ?? '') !== (avis.photo ?? '')) patch.photo = avis.photo ?? ''

    if (Object.keys(patch).length === 0) {
      inchanges += 1
      console.log(`- OK      #${doc.id} « ${avis.auteur} » : deja a jour`)
      continue
    }

    await payload.update({ collection: 'avis', id: doc.id, data: patch })
    majs += 1
    console.log(
      `- MAJ     #${doc.id} « ${avis.auteur} » : ${Object.entries(patch)
        .map(([champ, valeur]) => `${champ}="${valeur}" (avant : "${doc[champ] ?? ''}")`)
        .join(', ')}`,
    )
  }

  const orphelins = docs.filter((d) => !AVIS.some((a) => cle(a.texte) === cle(d.texte)))
  for (const d of orphelins) {
    console.log(`- LAISSE  #${d.id} (hors fichier, non touche) : ${cle(d.texte)}...`)
  }

  console.log(
    `Termine : ${majs} mise(s) a jour, ${inserts} insertion(s), ${inchanges} inchange(s), ${orphelins.length} hors fichier.`,
  )
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

// `await` au niveau module (comme scripts/seed-ksc.mjs) : sans lui, le runner
// Payload rend la main avant la fin du script.
await run()
