/* Remplit le champ `disciplines` des activites deja presentes en base depuis
   src/data/prestations.ts (les 4 cours par tranche d'age).

   NON DESTRUCTIF : une fiche n'est mise a jour QUE si son champ `disciplines`
   est vide ou absent. Une fiche deja renseignee dans l'admin n'est jamais
   ecrasee, et le script est rejouable sans risque. Seul le champ `disciplines`
   est envoye : les autres champs de la fiche ne sont pas touches.

   Prerequis : DATABASE_URL definie ET schema pousse en base (un `npm run dev`
   avec la base cree la table `prestations_disciplines`).
   ATTENTION : la CLI Payload lit `.env` (pas `.env.local`).

   Usage : npm run payload -- run scripts/fill-disciplines.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { PRESTATIONS } from '../src/data/prestations.ts'

async function run() {
  const payload = await getPayload({ config })
  console.log('Remplissage des activites par tranche d’age (non destructif)')

  const source = PRESTATIONS.filter((p) => (p.disciplines ?? []).length > 0)
  let remplies = 0
  let ignorees = 0
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
      console.log(`- ${p.slug} : absente de la base — ignoree`)
      absentes++
      continue
    }
    if ((doc.disciplines ?? []).length > 0) {
      console.log(`- ${p.slug} : deja renseignee (${doc.disciplines.length}) — ignoree`)
      ignorees++
      continue
    }
    await payload.update({
      collection: 'prestations',
      id: doc.id,
      data: {
        disciplines: p.disciplines.map(({ nom, description }) => ({ nom, description })),
      },
    })
    console.log(`- ${p.slug} : ${p.disciplines.length} activite(s) enregistree(s)`)
    remplies++
  }

  console.log(
    `Termine : ${remplies} fiche(s) remplie(s), ${ignorees} deja renseignee(s), ${absentes} absente(s).`,
  )
  process.exit(0)
}

await run()
