/* REMPLACE la liste des activites des 4 fiches de cours par tranche d'age.

   Retour client n5 : les 24 activites redigees en interne laissent la place aux
   16 cours reellement dispenses, avec les descriptifs fournis par le club, leur
   duree et le nom de l'activite dans le planning. C'est le SEUL script du lot
   qui remplace des donnees existantes : il est donc protege.

   GARDE-FOUS :
   1. SAUVEGARDE OBLIGATOIRE : les activites actuelles des 4 fiches sont ecrites
      dans C:/tmp/pg18/ksc-disciplines-backup-<date>.json AVANT toute ecriture.
      Si la sauvegarde echoue, le script s'arrete sans rien modifier.
   2. UNE SEULE FOIS : si les 4 fiches portent deja exactement les nouveaux noms,
      le script refuse de tourner (les modifications faites dans l'admin apres le
      remplacement ne doivent jamais etre ecrasees par un second passage).
   3. `noteDisciplines` (astérisque Multisports) n'est ecrit que s'il est vide.

   Les objets ecrits n'ont pas d'`id` : Payload remplace donc la liste complete
   des activites de chaque fiche, c'est le comportement voulu ici.

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/remplace-disciplines.mjs
*/
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { PRESTATIONS } from '../src/data/prestations.ts'

const DOSSIER_BACKUP = 'C:/tmp/pg18'
const vide = (v) => typeof v !== 'string' || v.trim().length === 0

// Forme Payload d'une activite : `description` porte l'accroche du fichier.
const versPayload = (d) => ({
  nom: d.nom,
  slug: d.slug,
  description: d.accroche,
  intro: d.intro.map((texte) => ({ texte })),
  benefices: d.benefices.map((texte) => ({ texte })),
  pourQui: d.pourQui,
  duree: d.duree,
  activitePlanning: d.activitePlanning,
})

async function run() {
  const payload = await getPayload({ config })
  console.log('Remplacement des activites par tranche d\'age (une seule fois, avec sauvegarde)')

  const source = PRESTATIONS.filter((p) => (p.disciplines ?? []).length > 0)
  console.log(`- fichier : ${source.length} fiche(s), ${source.reduce((n, p) => n + p.disciplines.length, 0)} activite(s)`)

  // Lecture des 4 fiches (etat AVANT).
  const fiches = []
  for (const p of source) {
    const { docs } = await payload.find({
      collection: 'prestations',
      where: { slug: { equals: p.slug } },
      limit: 1,
      depth: 0,
    })
    if (!docs[0]) {
      console.error(`ARRET : la fiche ${p.slug} est absente de la base.`)
      process.exit(1)
    }
    fiches.push({ source: p, doc: docs[0] })
  }

  // Garde-fou 2 : deja remplacees ?
  const memeListe = (a, b) => a.length === b.length && a.every((nom, i) => nom === b[i])
  const dejaFait = fiches.every(({ source: p, doc }) =>
    memeListe(
      (doc.disciplines ?? []).map((d) => d.nom),
      p.disciplines.map((d) => d.nom),
    ),
  )
  if (dejaFait) {
    console.log('- la base porte deja exactement les nouveaux noms sur les 4 fiches.')
    console.log('ARRET : remplacement deja effectue, rien n\'est reecrit.')
    await new Promise((resolve) => process.stdout.write('', resolve))
    process.exit(0)
  }

  // Garde-fou 1 : sauvegarde AVANT toute ecriture.
  const jour = new Date().toISOString().slice(0, 10)
  const chemin = join(DOSSIER_BACKUP, `ksc-disciplines-backup-${jour}.json`)
  const sauvegarde = {
    date: new Date().toISOString(),
    origine: 'scripts/remplace-disciplines.mjs',
    fiches: fiches.map(({ doc }) => ({
      id: doc.id,
      slug: doc.slug,
      titre: doc.titre,
      noteDisciplines: doc.noteDisciplines ?? null,
      disciplines: doc.disciplines ?? [],
    })),
  }
  mkdirSync(DOSSIER_BACKUP, { recursive: true })
  writeFileSync(chemin, JSON.stringify(sauvegarde, null, 2), 'utf8')
  const total = sauvegarde.fiches.reduce((n, f) => n + f.disciplines.length, 0)
  console.log(`- sauvegarde ecrite : ${chemin} (${sauvegarde.fiches.length} fiches, ${total} activites)`)

  // Remplacement fiche par fiche.
  let majs = 0
  for (const { source: p, doc } of fiches) {
    const avant = (doc.disciplines ?? []).map((d) => d.nom)
    const data = { disciplines: p.disciplines.map(versPayload) }
    if (vide(doc.noteDisciplines) && !vide(p.noteDisciplines)) {
      data.noteDisciplines = p.noteDisciplines
    }
    await payload.update({ collection: 'prestations', id: doc.id, data })
    majs += 1
    console.log(`- MAJ     ${p.slug} : ${avant.length} -> ${p.disciplines.length} activite(s)`)
    console.log(`  · avant : ${avant.join(', ')}`)
    for (const d of p.disciplines) {
      console.log(`  · apres : ${d.nom} [${d.slug}] ${d.duree} min, planning « ${d.activitePlanning} »`)
    }
    if (data.noteDisciplines) console.log(`  · note  : ${data.noteDisciplines}`)
  }

  console.log(`Termine : ${majs} fiche(s) remplacee(s). Sauvegarde : ${chemin}`)
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
