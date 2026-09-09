/* Met a jour le telephone et l'email du club dans le global « parametres ».

   Retour client n5 : le numero et l'adresse email changent. Les valeurs de
   reference vivent dans src/data/site.ts (COORDONNEES) ; ce script les recopie
   en base pour que l'admin Payload, qui fait foi cote lecture, ne resserve plus
   les anciennes.

   IDEMPOTENT ET NON DESTRUCTIF :
   - un champ n'est ecrit QUE s'il vaut encore l'ANCIENNE valeur (ou s'il est
     vide) ; un champ deja a la nouvelle valeur n'est pas touche ;
   - un champ portant une valeur personnalisee (ni l'ancienne, ni la nouvelle)
     est LAISSE tel quel et signale ;
   - les autres champs du groupe « coordonnees » (adresse, carte...) sont
     recopies a l'identique, aucun n'est vide par effet de bord.
   Rejouer le script ne produit donc que des lignes « OK ».

   Prerequis : DATABASE_URL definie dans `.env` (la CLI Payload ne lit pas
   `.env.local`). ATTENTION : c'est la base de PRODUCTION.

   Usage : npm run payload -- run scripts/maj-coordonnees.mjs
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { COORDONNEES } from '../src/data/site.ts'

// Valeurs d'avant le retour client n5 : seules elles autorisent l'ecriture.
const ANCIENNES = {
  telephone: '02 47 44 41 43',
  telephoneHref: 'tel:+33247444143',
  email: 'kidfitnessrochecorbon@gmail.com',
  emailHref: 'mailto:kidfitnessrochecorbon@gmail.com',
}

const CHAMPS = ['telephone', 'telephoneHref', 'email', 'emailHref']

const vide = (v) => typeof v !== 'string' || v.trim().length === 0

async function run() {
  const payload = await getPayload({ config })
  console.log('Coordonnees du club (idempotent, non destructif)')

  const global = await payload.findGlobal({ slug: 'parametres' })
  const coordonnees = { ...(global?.coordonnees ?? {}) }

  const patch = {}
  let laisses = 0
  let inchanges = 0

  for (const champ of CHAMPS) {
    const avant = coordonnees[champ]
    const cible = COORDONNEES[champ]

    if (avant === cible) {
      inchanges += 1
      console.log(`- OK      ${champ} : deja « ${cible} »`)
      continue
    }
    if (vide(avant) || avant === ANCIENNES[champ]) {
      patch[champ] = cible
      console.log(`- MAJ     ${champ} : « ${avant ?? 'vide'} » -> « ${cible} »`)
      continue
    }
    laisses += 1
    console.log(`- LAISSE  ${champ} : valeur personnalisee « ${avant} », non touchee`)
  }

  if (Object.keys(patch).length === 0) {
    console.log(`Termine : rien a ecrire (${inchanges} deja a jour, ${laisses} personnalise(s)).`)
  } else {
    await payload.updateGlobal({
      slug: 'parametres',
      data: { coordonnees: { ...coordonnees, ...patch } },
    })
    const apres = await payload.findGlobal({ slug: 'parametres' })
    console.log('- base apres ecriture :')
    for (const champ of CHAMPS) console.log(`  · ${champ} = « ${apres?.coordonnees?.[champ] ?? 'vide'} »`)
    console.log(
      `Termine : ${Object.keys(patch).length} champ(s) mis a jour, ${inchanges} deja a jour, ${laisses} personnalise(s).`,
    )
  }

  // Le pool Postgres garde le process en vie : on sort explicitement, mais
  // seulement une fois stdout vide (sinon `process.exit` coupe les logs quand
  // la sortie est un tube et non un terminal).
  await new Promise((resolve) => process.stdout.write('', resolve))
  process.exit(0)
}

await run()
