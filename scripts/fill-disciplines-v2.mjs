/* Remplit les NOUVEAUX champs des activites de tranche d'age (slug, accroche,
   presentation, benefices, pour qui) depuis src/data/prestations.ts.

   Contexte : les 24 activites sont deja en base (fill du 31/07) avec seulement
   `nom` + `description`. Ce script v2 complete les champs ajoutes par les pages
   individuelles /nos-prestations/[cours]/[activite].

   NON DESTRUCTIF, rejouable :
   - l'appariement se fait PAR NOM, dans la meme fiche ;
   - chaque champ n'est ecrit QUE s'il est vide en base ;
   - `description` (l'accroche) n'est JAMAIS ecrasee ; si elle est vide, elle
     est remplie depuis le fichier de donnees ;
   - une activite presente en base mais absente du fichier est laissee intacte ;
   - une activite presente dans le fichier mais absente de la base n'est PAS
     ajoutee (le contenu de l'admin fait foi sur la composition de la liste).

   Prerequis : DATABASE_URL definie ET schema pousse en base (un `npm run dev`
   avec la base cree les colonnes/tables ajoutees).
   ATTENTION : la CLI Payload lit `.env` (pas `.env.local`).

   Usage : npm run payload -- run scripts/fill-disciplines-v2.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { PRESTATIONS } from '../src/data/prestations.ts'

const vide = (v) => typeof v !== 'string' || v.trim().length === 0
const videListe = (v) => !Array.isArray(v) || v.length === 0

async function run() {
  const payload = await getPayload({ config })
  console.log('Completion des activites par tranche d’age (v2, non destructif)')

  const source = PRESTATIONS.filter((p) => (p.disciplines ?? []).length > 0)
  let fichesTouchees = 0
  let activitesCompletees = 0
  let activitesInchangees = 0
  let activitesInconnues = 0
  let fichesAbsentes = 0

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
      fichesAbsentes++
      continue
    }

    const enBase = doc.disciplines ?? []
    if (enBase.length === 0) {
      console.log(`- ${p.slug} : aucune activite en base — lancer d'abord fill-disciplines.mjs`)
      continue
    }

    let modifiee = false
    const disciplines = enBase.map((x) => {
      const df = p.disciplines.find((y) => y.nom === x.nom)
      if (!df) {
        console.log(`  · ${p.slug} / ${x.nom} : absente du fichier de donnees — laissee intacte`)
        activitesInconnues++
        return x
      }
      const champs = []
      const suivant = { ...x }
      if (vide(x.slug)) {
        suivant.slug = df.slug
        champs.push('slug')
      }
      if (vide(x.description)) {
        suivant.description = df.accroche
        champs.push('accroche')
      }
      if (videListe(x.intro)) {
        suivant.intro = df.intro.map((texte) => ({ texte }))
        champs.push(`presentation (${df.intro.length} §)`)
      }
      if (videListe(x.benefices)) {
        suivant.benefices = df.benefices.map((texte) => ({ texte }))
        champs.push(`benefices (${df.benefices.length})`)
      }
      if (vide(x.pourQui)) {
        suivant.pourQui = df.pourQui
        champs.push('pourQui')
      }
      if (champs.length === 0) {
        console.log(`  · ${p.slug} / ${x.nom} : deja complete — inchangee`)
        activitesInchangees++
        return x
      }
      console.log(`  · ${p.slug} / ${x.nom} : ${champs.join(', ')}`)
      activitesCompletees++
      modifiee = true
      return suivant
    })

    if (!modifiee) {
      console.log(`- ${p.slug} : rien a completer`)
      continue
    }

    await payload.update({
      collection: 'prestations',
      id: doc.id,
      data: { disciplines },
    })
    console.log(`- ${p.slug} : fiche mise a jour (${disciplines.length} activites)`)
    fichesTouchees++
  }

  console.log(
    `Termine : ${fichesTouchees} fiche(s) mise(s) a jour, ${activitesCompletees} activite(s) completee(s), ` +
      `${activitesInchangees} deja complete(s), ${activitesInconnues} hors fichier, ${fichesAbsentes} fiche(s) absente(s).`,
  )
  process.exit(0)
}

await run()
