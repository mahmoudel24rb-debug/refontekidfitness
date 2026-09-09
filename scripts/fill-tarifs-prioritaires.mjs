/* Renseigne « formule prioritaire », l'icone et les avantages des tarifs.

   Retour client n5 : la page /tarifs presente en cartes completes les 4
   formules prioritaires (1 cours / semaine, Illimite, Mercredis Sportifs,
   Stages vacances) et renvoie les autres en lignes compactes. Le champ
   `prioritaire` est ADDITIF : les tarifs deja en base l'ont a NULL. Ce script
   materialise en base les valeurs de src/data/tarifs.ts pour qu'elles soient
   visibles et modifiables dans l'admin.

   IDEMPOTENT ET NON DESTRUCTIF :
   - `prioritaire` n'est ecrit QUE s'il est encore NULL en base (une case
     cochee ou decochee dans l'admin fait foi et n'est jamais reecrite) ;
   - `icone` n'est ecrite que si elle est vide ;
   - `avantages` n'est ecrit que si la liste est vide ;
   - appariement par TITRE ; un tarif de la base absent du fichier est laisse
     tel quel ; aucun tarif n'est cree ni supprime.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/fill-tarifs-prioritaires.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { ABONNEMENTS, PRESTATIONS_TARIFS } from '../src/data/tarifs.ts'

const FICHIER = [...ABONNEMENTS, ...PRESTATIONS_TARIFS]

async function run() {
  const payload = await getPayload({ config })
  console.log('Formules prioritaires, icones et avantages des tarifs (idempotent, non destructif)')

  const { docs } = await payload.find({ collection: 'tarifs', limit: 200, sort: 'ordre' })
  console.log(`- base : ${docs.length} tarif(s)`)

  let majs = 0
  let inchanges = 0
  let horsFichier = 0

  for (const d of docs) {
    const fichier = FICHIER.find((t) => t.titre === d.titre)
    const etiquette = `#${d.id} [${d.type}] ${d.titre}`

    if (!fichier) {
      horsFichier += 1
      console.log(`- LAISSE  ${etiquette} : absent du fichier, non touche`)
      continue
    }

    const patch = {}
    if (d.prioritaire === null || d.prioritaire === undefined) {
      patch.prioritaire = Boolean(fichier.prioritaire)
    }
    if (!d.icone && fichier.icone) patch.icone = fichier.icone
    const aDejaDesAvantages = Array.isArray(d.avantages) && d.avantages.length > 0
    if (!aDejaDesAvantages && (fichier.avantages ?? []).length > 0) {
      patch.avantages = fichier.avantages.map((texte) => ({ texte }))
    }

    if (Object.keys(patch).length === 0) {
      inchanges += 1
      console.log(
        `- OK      ${etiquette} : prioritaire=${d.prioritaire}, icone=${d.icone ?? '-'}, ` +
          `${aDejaDesAvantages ? d.avantages.length : 0} avantage(s)`,
      )
      continue
    }

    await payload.update({ collection: 'tarifs', id: d.id, data: patch })
    majs += 1
    const details = []
    if ('prioritaire' in patch) details.push(`prioritaire=${patch.prioritaire} (avant : vide)`)
    if (patch.icone) details.push(`icone="${patch.icone}" (avant : vide)`)
    if (patch.avantages) {
      details.push(`avantages=[${patch.avantages.map((a) => `« ${a.texte} »`).join(' | ')}]`)
    }
    console.log(`- MAJ     ${etiquette} : ${details.join(', ')}`)
  }

  console.log(
    `Termine : ${majs} mise(s) a jour, ${inchanges} inchange(s), ${horsFichier} hors fichier.`,
  )
  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
