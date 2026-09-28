/* LECTURE SEULE du contenu, après mise à jour du schéma de la base.

   Le serveur de production (next start, NODE_ENV=production) ne pousse jamais le
   schéma drizzle. Ce script, lancé avec `payload run` (hors production),
   initialise Payload : le mode développement de l'adaptateur Postgres pousse
   alors le schéma (colonnes ajoutées par la config), puis le script ne fait
   que compter les documents. Aucun contenu n'est écrit.

   ATTENTION : la base de .env est la base de PRODUCTION (Neon). Avant de le
   lancer, simuler la poussée (instructions drizzle sans apply()) et vérifier
   qu'elle n'ajoute que des colonnes. Si drizzle demande une confirmation
   (perte de données, renommage de colonne), répondre NON et ne rien pousser.

   Usage : npm run payload -- run scripts/lecture-schema.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const COLLECTIONS = ['planning', 'prestations', 'tarifs', 'articles', 'faq', 'avis', 'equipe', 'media', 'users']

async function run() {
  const payload = await getPayload({ config })
  console.log('Lecture du contenu (aucune écriture) :')
  for (const collection of COLLECTIONS) {
    const { totalDocs } = await payload.count({ collection })
    console.log(`- ${collection} : ${totalDocs}`)
  }
  const parametres = await payload.findGlobal({ slug: 'parametres' })
  console.log(`- parametres : ${parametres?.coordonnees?.telephone ? 'renseigné' : 'vide'}`)
}

await run()
process.exit(0)
