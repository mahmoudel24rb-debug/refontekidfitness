/* Peuple TOUTES les collections Kid Sport Club + le global `parametres` depuis
   les fichiers src/data/*, qui restent la source de verite de secours.

   NON DESTRUCTIF : chaque collection n'est peuplee QUE si elle est vide
   (count === 0) ; le global n'est ecrit que si ses coordonnees sont vides.
   Le script est donc rejouable sans risque.

   Prerequis : DATABASE_URL definie ET schema pousse en base
   (le premier `npm run dev` avec la base cree/migre les tables).
   ATTENTION : la CLI Payload lit `.env` (pas `.env.local`, que seul Next lit).
   Mettre donc DATABASE_URL / PAYLOAD_SECRET dans `.env` — Next le lit aussi.

   Usage : npm run seed
       ou : npm run payload -- run scripts/seed-ksc.mjs

   NB : les imports .ts fonctionnent car `payload run` charge le projet avec son
   loader TypeScript (meme principe que les scripts du site Beauregard).
*/
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

import { PRESTATIONS } from '../src/data/prestations.ts'
import { PLANNING } from '../src/data/planning.ts'
import { ABONNEMENTS, PRESTATIONS_TARIFS, FEATURED_TITRE } from '../src/data/tarifs.ts'
import { FAQ } from '../src/data/faq.ts'
import { AVIS } from '../src/data/avis.ts'
import { EQUIPE } from '../src/data/equipe.ts'
import { ARTICLES } from '../src/data/articles.ts'
import { COORDONNEES, HORAIRES, INSCRIPTION_URL, CRM_INSCRIPTION_URL } from '../src/data/site.ts'

/** Insere `lignes` dans `collection` uniquement si celle-ci est vide. */
async function peupler(payload, collection, lignes, libelle) {
  const { totalDocs } = await payload.count({ collection })
  if (totalDocs > 0) {
    console.log(`- ${libelle} : deja peuplee (${totalDocs}) — ignoree`)
    return 0
  }
  let n = 0
  for (const data of lignes) {
    await payload.create({ collection, data })
    n++
  }
  console.log(`- ${libelle} : ${n} entree(s) inseree(s)`)
  return n
}

async function run() {
  const payload = await getPayload({ config })
  console.log('Seed Kid Sport Club — depuis src/data/* (non destructif)')

  // 1. Activites --------------------------------------------------------------
  await peupler(
    payload,
    'prestations',
    PRESTATIONS.map((p, i) => ({
      titre: p.titre,
      slug: p.slug,
      age: p.age,
      accroche: p.accroche,
      intro: p.intro,
      benefices: p.benefices.map((texte) => ({ texte })),
      disciplines: (p.disciplines ?? []).map(({ nom, description }) => ({ nom, description })),
      prix: p.prix,
      creneauxTexte: p.creneaux,
      motCle: p.motCle,
      ordre: i,
    })),
    'prestations',
  )

  // 2. Planning : la structure jour -> salles -> creneaux est aplatie ; `ordre`
  //    suit l'ordre de lecture actuel pour reproduire a l'identique le
  //    regroupement par salle de la page /planning.
  const creneaux = []
  for (const jour of PLANNING) {
    let ordre = 0
    for (const salle of jour.salles) {
      for (const c of salle.creneaux) {
        creneaux.push({
          jour: jour.jour,
          salle: salle.salle,
          heure: c.heure,
          activite: c.activite,
          ...(c.age ? { age: c.age } : {}),
          // Duree du bloc dans le calendrier de la semaine (60 min par defaut).
          duree: c.duree ?? 60,
          ordre: ordre++,
          actif: true,
        })
      }
    }
  }
  await peupler(payload, 'planning', creneaux, 'planning')

  // 3. Tarifs -----------------------------------------------------------------
  await peupler(
    payload,
    'tarifs',
    [
      ...ABONNEMENTS.map((t, i) => ({
        type: 'abonnement',
        titre: t.titre,
        prix: t.prix,
        detail: t.detail,
        avantages: (t.avantages ?? []).map((texte) => ({ texte })),
        ...(t.icone ? { icone: t.icone } : {}),
        enAvant: t.titre === FEATURED_TITRE,
        ordre: i,
      })),
      ...PRESTATIONS_TARIFS.map((t, i) => ({
        type: 'prestation',
        titre: t.titre,
        prix: t.prix,
        detail: t.detail,
        avantages: (t.avantages ?? []).map((texte) => ({ texte })),
        ...(t.icone ? { icone: t.icone } : {}),
        enAvant: false,
        ordre: i,
      })),
    ],
    'tarifs',
  )

  // 4. FAQ --------------------------------------------------------------------
  await peupler(
    payload,
    'faq',
    FAQ.map((f, i) => ({
      question: f.q,
      reponse: f.r,
      lienTarifs: Boolean(f.lienTarifs),
      ordre: i,
    })),
    'faq',
  )

  // 5. Avis (verbatims : recopies au caractere pres) --------------------------
  await peupler(
    payload,
    'avis',
    AVIS.map((a, i) => ({ texte: a.texte, auteur: a.auteur, photo: a.photo ?? '', ordre: i })),
    'avis',
  )

  // 6. Equipe (les photos des coachs seront chargees depuis l'admin) ---------
  await peupler(
    payload,
    'equipe',
    EQUIPE.map((c, i) => ({
      nom: c.nom,
      initiales: c.initiales,
      bio: c.bio,
      ordre: i,
    })),
    'equipe',
  )

  // 7. Articles : on seede les BLOCS finaux (paragraphes + intertitres deja
  //    assembles par src/data/articles.ts), pas les intertitres separement.
  await peupler(
    payload,
    'articles',
    ARTICLES.map((a, i) => ({
      titre: a.titre,
      slug: a.slug,
      excerpt: a.excerpt,
      date: new Date(`${a.date}T12:00:00.000Z`).toISOString(),
      blocs: (a.blocs ?? a.paragraphes.map((texte) => ({ t: 'p', texte }))).map((b) => ({
        t: b.t,
        texte: b.texte,
      })),
      publie: true,
      ordre: i,
    })),
    'articles',
  )

  // 8. Global `parametres` ----------------------------------------------------
  // findGlobal sur un global jamais enregistre renvoie ses valeurs par defaut ;
  // on tolere malgre tout une erreur pour ne pas perdre les 7 etapes ci-dessus.
  let actuel = null
  try {
    actuel = await payload.findGlobal({ slug: 'parametres' })
  } catch {
    actuel = null
  }
  if (actuel?.coordonnees?.telephone) {
    console.log('- parametres : deja renseigne — ignore')
  } else {
    await payload.updateGlobal({
      slug: 'parametres',
      data: {
        coordonnees: {
          telephone: COORDONNEES.telephone,
          telephoneHref: COORDONNEES.telephoneHref,
          email: COORDONNEES.email,
          emailHref: COORDONNEES.emailHref,
          adresse: COORDONNEES.adresse,
          adresseHref: COORDONNEES.adresseHref,
          mapsEmbedUrl: COORDONNEES.mapsEmbedUrl,
          mapTitle: COORDONNEES.mapTitle,
        },
        horaires: HORAIRES,
        inscriptionUrl: INSCRIPTION_URL,
        crmInscriptionUrl: CRM_INSCRIPTION_URL,
      },
    })
    console.log('- parametres : coordonnees, horaires et liens enregistres')
  }

  console.log('Seed termine.')
  process.exit(0)
}

await run()
