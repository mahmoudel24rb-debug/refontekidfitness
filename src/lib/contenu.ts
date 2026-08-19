import { cache } from 'react'
import type { BasePayload } from 'payload'

import { ARTICLES, ARTICLE_IMG, type Bloc } from '@/data/articles'
import { AVIS } from '@/data/avis'
import { EQUIPE } from '@/data/equipe'
import { FAQ, type FaqItem } from '@/data/faq'
import { PLANNING, type JourPlanning } from '@/data/planning'
import { PRESTATIONS, type Prestation } from '@/data/prestations'
import { ABONNEMENTS, FEATURED_TITRE, PRESTATIONS_TARIFS, type Tarif } from '@/data/tarifs'
import { COORDONNEES, CRM_INSCRIPTION_URL, HORAIRES, INSCRIPTION_URL } from '@/data/site'
import { slugifie } from './utils'

/**
 * COUCHE D'ACCÈS AU CONTENU — à n'utiliser que côté serveur.
 *
 * Chaque fetcher tente Payload UNIQUEMENT si une URL de base est définie, dans
 * un try/catch, et retombe sur les fichiers `src/data/*` si :
 *   - aucune base n'est configurée (cas actuel : mode fallback strict),
 *   - la base est injoignable / le schéma n'est pas poussé,
 *   - la collection existe mais est VIDE.
 * Les fichiers de données restent donc la source de secours permanente ET la
 * source des seeds (scripts/seed-ksc.mjs).
 *
 * Les résultats sont mémorisés par requête (React `cache`) : plusieurs
 * composants d'une même page ne déclenchent qu'une seule lecture.
 */

// ---------------------------------------------------------------------------
// Socle : détection de la base + accès protégé
// ---------------------------------------------------------------------------

// Mêmes variables que src/payload.config.ts (Neon en expose plusieurs alias).
const basePresente = () =>
  Boolean(
    process.env.DATABASE_URL ||
      process.env.DATABASE_URL_UNPOOLED ||
      process.env.POSTGRES_URL_NON_POOLING,
  )

/**
 * Exécute une lecture Payload si (et seulement si) une base est configurée.
 * Retourne `null` pour signaler « pas de contenu utilisable » : base absente,
 * erreur, ou collection vide. L'appelant sert alors le fichier de données.
 */
async function depuisPayload<T>(
  quoi: string,
  lire: (payload: BasePayload) => Promise<T[]>,
): Promise<T[] | null> {
  if (!basePresente()) return null
  try {
    // Import dynamique : sans base, le module Payload n'est même pas chargé.
    const { getPayloadClient } = await import('./payload')
    const payload = await getPayloadClient()
    const docs = await lire(payload)
    return docs.length > 0 ? docs : null
  } catch (erreur) {
    console.warn(
      `[contenu] ${quoi} : lecture Payload impossible, repli sur src/data — ${
        erreur instanceof Error ? erreur.message : String(erreur)
      }`,
    )
    return null
  }
}

// Upload Payload -> URL servie par /api/media/file/**. `undefined` si absent
// (le composant garde alors le visuel statique actuel).
type MediaLike = { url?: string | null; alt?: string | null }
const urlMedia = (media: unknown): string | undefined => {
  if (!media || typeof media !== 'object') return undefined
  const url = (media as MediaLike).url
  return typeof url === 'string' && url.length > 0 ? url : undefined
}
const altMedia = (media: unknown): string | undefined => {
  if (!media || typeof media !== 'object') return undefined
  const alt = (media as MediaLike).alt
  return typeof alt === 'string' && alt.length > 0 ? alt : undefined
}

const texteOu = (valeur: unknown, defaut: string) =>
  typeof valeur === 'string' && valeur.trim().length > 0 ? valeur : defaut

// ---------------------------------------------------------------------------
// Activités (prestations)
// ---------------------------------------------------------------------------

// Même forme que src/data/prestations.ts : les composants restent inchangés.
export type PrestationVue = Prestation

export const getPrestations = cache(async (): Promise<PrestationVue[]> => {
  const docs = await depuisPayload('prestations', async (payload) => {
    const { docs } = await payload.find({
      collection: 'prestations',
      limit: 100,
      sort: 'ordre',
      depth: 1,
    })
    return docs
  })
  if (!docs) return PRESTATIONS

  return docs.map((d) => {
    const fichier = PRESTATIONS.find((p) => p.slug === d.slug)
    // Activités de la tranche. Les champs longs (slug, présentation, bénéfices,
    // « pour qui ») sont ADDITIFS : tant que la base ne les porte pas, chacun
    // retombe sur le fichier de données, activité par activité et champ par
    // champ (l'appariement se fait par nom, comme le script de remplissage).
    const disciplines = (d.disciplines ?? []).map((x) => {
      const df = fichier?.disciplines?.find((y) => y.nom === x.nom)
      const intro = (x.intro ?? []).map((i) => i.texte).filter(Boolean)
      const benefices = (x.benefices ?? []).map((b) => b.texte).filter(Boolean)
      return {
        nom: x.nom,
        slug: texteOu(x.slug, df?.slug ?? slugifie(x.nom)),
        accroche: texteOu(x.description, df?.accroche ?? ''),
        intro: intro.length > 0 ? intro : (df?.intro ?? []),
        benefices: benefices.length > 0 ? benefices : (df?.benefices ?? []),
        pourQui: texteOu(x.pourQui, df?.pourQui ?? ''),
      }
    })
    return {
      slug: d.slug,
      titre: d.titre,
      age: d.age,
      accroche: d.accroche,
      intro: d.intro,
      benefices: (d.benefices ?? []).map((b) => b.texte),
      creneaux: d.creneauxTexte,
      prix: d.prix,
      // Photo chargée dans l'admin, sinon le visuel statique de la fiche.
      image: urlMedia(d.image) ?? fichier?.image ?? '',
      motCle: d.motCle,
      disciplines: disciplines.length > 0 ? disciplines : fichier?.disciplines,
    }
  })
})

export const getPrestation = cache(async (slug: string): Promise<PrestationVue | undefined> => {
  const prestations = await getPrestations()
  return prestations.find((p) => p.slug === slug)
})

// ---------------------------------------------------------------------------
// Planning
// ---------------------------------------------------------------------------

export type CreneauPlat = {
  jour: string
  salle: string
  heure: string
  activite: string
  age?: string
  /** Durée en minutes (60 par défaut) : hauteur du bloc dans le calendrier. */
  duree: number
}

/** Durée d'un créneau : le champ Payload/fichier s'il est renseigné, sinon 60. */
const DUREE_DEFAUT = 60
const duree = (valeur: unknown) =>
  typeof valeur === 'number' && valeur > 0 ? valeur : DUREE_DEFAUT

const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const indexJour = (jour: string) => {
  const i = JOURS.indexOf(jour)
  return i === -1 ? JOURS.length : i
}

/** Liste plate des créneaux, triée par jour puis par ordre d'affichage. */
export const getPlanningPlat = cache(async (): Promise<CreneauPlat[]> => {
  const docs = await depuisPayload('planning', async (payload) => {
    const { docs } = await payload.find({
      collection: 'planning',
      limit: 500,
      sort: 'ordre',
      where: { actif: { not_equals: false } },
    })
    return docs
  })

  const plat: CreneauPlat[] = docs
    ? docs.map((d) => ({
        jour: d.jour,
        salle: d.salle,
        heure: d.heure,
        activite: d.activite,
        age: d.age ?? undefined,
        duree: duree(d.duree),
      }))
    : // Fallback : aplatissement de la structure jour -> salles -> créneaux.
      PLANNING.flatMap((j) =>
        j.salles.flatMap((s) =>
          s.creneaux.map((c) => ({
            jour: j.jour,
            salle: s.salle,
            heure: c.heure,
            activite: c.activite,
            age: c.age,
            duree: duree(c.duree),
          })),
        ),
      )

  // Tri stable : l'ordre de Payload (champ `ordre`) est déjà appliqué par la
  // requête, on ne réordonne que les journées entre elles.
  return [...plat].sort((a, b) => indexJour(a.jour) - indexJour(b.jour))
})

/**
 * Planning regroupé jour -> salles -> créneaux (forme attendue par /planning et
 * le rail des landings). Les salles apparaissent dans leur ordre de première
 * occurrence, comme dans src/data/planning.ts.
 */
export const getPlanning = cache(async (): Promise<JourPlanning[]> => {
  const plat = await getPlanningPlat()
  const jours: JourPlanning[] = []
  for (const c of plat) {
    let jour = jours.find((j) => j.jour === c.jour)
    if (!jour) {
      jour = { jour: c.jour, salles: [] }
      jours.push(jour)
    }
    let salle = jour.salles.find((s) => s.salle === c.salle)
    if (!salle) {
      salle = { salle: c.salle, creneaux: [] }
      jour.salles.push(salle)
    }
    salle.creneaux.push({ heure: c.heure, activite: c.activite, age: c.age, duree: c.duree })
  }
  return jours
})

// ---------------------------------------------------------------------------
// Tarifs
// ---------------------------------------------------------------------------

export type TarifVue = Tarif & { avantages: string[]; enAvant: boolean }

export type TarifsVue = {
  abonnements: TarifVue[]
  prestations: TarifVue[]
}

export const getTarifs = cache(async (): Promise<TarifsVue> => {
  const docs = await depuisPayload('tarifs', async (payload) => {
    const { docs } = await payload.find({ collection: 'tarifs', limit: 100, sort: 'ordre' })
    return docs
  })

  if (!docs) {
    // `FEATURED_TITRE` (data/tarifs.ts) devient la case « Mettre en avant ».
    const marquer = (t: Tarif): TarifVue => ({
      ...t,
      avantages: t.avantages ?? [],
      enAvant: t.titre === FEATURED_TITRE,
    })
    return {
      abonnements: ABONNEMENTS.map(marquer),
      prestations: PRESTATIONS_TARIFS.map(marquer),
    }
  }

  // Avantages et icône sont ADDITIFS : tant que la base ne les porte pas,
  // chacun retombe sur le fichier de données, tarif par tarif (appariement par
  // le titre, comme scripts/fill-avantages-tarifs.mjs).
  const FICHIER = [...ABONNEMENTS, ...PRESTATIONS_TARIFS]
  const vue = (type: 'abonnement' | 'prestation') =>
    docs
      .filter((d) => d.type === type)
      .map((d) => {
        const fichier = FICHIER.find((t) => t.titre === d.titre)
        const avantages = (d.avantages ?? []).map((a) => a.texte).filter(Boolean)
        return {
          titre: d.titre,
          prix: d.prix,
          detail: d.detail,
          avantages: avantages.length > 0 ? avantages : (fichier?.avantages ?? []),
          icone: (d.icone ?? undefined) ?? fichier?.icone,
          enAvant: Boolean(d.enAvant),
        }
      })

  return { abonnements: vue('abonnement'), prestations: vue('prestation') }
})

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

// Même forme que src/data/faq.ts (q / r / lienTarifs) : le JSON-LD FAQPage et
// le rendu du lien « page tarifs » restent inchangés.
export const getFaq = cache(async (): Promise<FaqItem[]> => {
  const docs = await depuisPayload('faq', async (payload) => {
    const { docs } = await payload.find({ collection: 'faq', limit: 100, sort: 'ordre' })
    return docs
  })
  if (!docs) return FAQ
  return docs.map((d) => ({
    q: d.question,
    r: d.reponse,
    lienTarifs: Boolean(d.lienTarifs),
  }))
})

/**
 * Sélectionne des questions par leur libellé (accueil et mini-FAQ des
 * landings). Si aucune ne correspond plus — question reformulée dans l'admin —
 * on retombe sur les premières questions de la FAQ pour ne jamais afficher un
 * bloc vide.
 */
export function faqParQuestions(faq: FaqItem[], questions: readonly string[]): FaqItem[] {
  const trouvees = questions
    .map((q) => faq.find((item) => item.q === q))
    .filter((item): item is FaqItem => Boolean(item))
  return trouvees.length > 0 ? trouvees : faq.slice(0, questions.length)
}

// ---------------------------------------------------------------------------
// Avis de parents
// ---------------------------------------------------------------------------

export type AvisVue = {
  texte: string
  /** Nom réel de l'auteur de l'avis Google (normalisé, prénom en premier). */
  auteur: string
  /** Photo de profil publique ; sinon avatar illustré (par index). */
  photo?: string
}

/**
 * Chemin de photo d'avis accepté : un fichier du dossier public dédié. Une
 * saisie hors de ce dossier est ignorée (l'avatar illustré prend le relais)
 * plutôt que de produire une image cassée.
 */
const PHOTO_AVIS = /^\/assets\/ksc\/avis\/[a-z0-9-]+\.(webp|jpg|png)$/
const photoValide = (chemin: unknown): string | undefined =>
  typeof chemin === 'string' && PHOTO_AVIS.test(chemin) ? chemin : undefined

/** Retrouve l'avis fichier correspondant à un doc (appariement par le texte). */
const avisFichier = (texte: unknown) => {
  const debut = String(texte ?? '').slice(0, 40)
  return debut.length > 0 ? AVIS.find((a) => a.texte.startsWith(debut)) : undefined
}

export const getAvis = cache(async (): Promise<AvisVue[]> => {
  const docs = await depuisPayload('avis', async (payload) => {
    const { docs } = await payload.find({ collection: 'avis', limit: 100, sort: 'ordre' })
    return docs
  })
  if (!docs) return AVIS.map((a) => ({ texte: a.texte, auteur: a.auteur, photo: a.photo }))
  // Auteur et photo sont ADDITIFS : tant que la base ne les porte pas, chacun
  // retombe sur le fichier de données, avis par avis (appariement par le début
  // du texte, comme scripts/maj-avis-reels.mjs).
  return docs.map((d) => {
    const fichier = avisFichier(d.texte)
    return {
      texte: d.texte,
      auteur: texteOu(d.auteur, fichier?.auteur ?? ''),
      photo: photoValide(d.photo) ?? fichier?.photo,
    }
  })
})

// ---------------------------------------------------------------------------
// Équipe
// ---------------------------------------------------------------------------

export type CoachVue = {
  nom: string
  initiales: string
  bio: string
  /** Photo chargée dans l'admin ; sinon monogramme des initiales. */
  photo?: string
  photoAlt?: string
}

export const getEquipe = cache(async (): Promise<CoachVue[]> => {
  const docs = await depuisPayload('equipe', async (payload) => {
    const { docs } = await payload.find({
      collection: 'equipe',
      limit: 100,
      sort: 'ordre',
      depth: 1,
    })
    return docs
  })
  if (!docs) return EQUIPE.map((c) => ({ nom: c.nom, initiales: c.initiales, bio: c.bio }))
  return docs.map((d) => ({
    nom: d.nom,
    initiales: d.initiales,
    bio: d.bio,
    photo: urlMedia(d.photo),
    photoAlt: altMedia(d.photo) ?? d.nom,
  }))
})

// ---------------------------------------------------------------------------
// Articles de blog
// ---------------------------------------------------------------------------

export type ArticleVue = {
  slug: string
  titre: string
  excerpt: string
  /** Toujours au format AAAA-MM-JJ (formatDateFr + attribut datetime). */
  date: string
  blocs: Bloc[]
  image: string
}

const jourIso = (valeur: unknown) => String(valeur ?? '').slice(0, 10)

export const getArticles = cache(async (): Promise<ArticleVue[]> => {
  // Ordre de référence (« À lire aussi », sitemap) : le champ `ordre`, puis la
  // date. Le hub /blog et l'accueil retrient eux-mêmes par date décroissante.
  const docs = await depuisPayload('articles', async (payload) => {
    const { docs } = await payload.find({
      collection: 'articles',
      limit: 200,
      sort: ['ordre', 'date'],
      depth: 1,
      where: { publie: { not_equals: false } },
    })
    return docs
  })

  if (!docs) {
    return ARTICLES.map((a) => ({
      slug: a.slug,
      titre: a.titre,
      excerpt: a.excerpt,
      date: a.date,
      blocs: a.blocs ?? a.paragraphes.map((texte) => ({ t: 'p' as const, texte })),
      image: ARTICLE_IMG[a.slug] ?? '',
    }))
  }

  return docs.map((d) => ({
    slug: d.slug,
    titre: d.titre,
    excerpt: d.excerpt,
    date: jourIso(d.date),
    blocs: (d.blocs ?? []).map((b): Bloc =>
      b.t === 'h2' ? { t: 'h2', texte: b.texte } : { t: 'p', texte: b.texte },
    ),
    image: urlMedia(d.image) ?? ARTICLE_IMG[d.slug] ?? '',
  }))
})

export const getArticle = cache(async (slug: string): Promise<ArticleVue | undefined> => {
  const articles = await getArticles()
  return articles.find((a) => a.slug === slug)
})

// ---------------------------------------------------------------------------
// Paramètres du site (global)
// ---------------------------------------------------------------------------

export type ParametresVue = {
  coordonnees: {
    telephone: string
    telephoneHref: string
    email: string
    emailHref: string
    adresse: string
    adresseHref: string
    mapsEmbedUrl: string
    mapTitle: string
  }
  horaires: string
  inscriptionUrl: string
  crmInscriptionUrl: string
}

const PARAMETRES_FICHIER: ParametresVue = {
  coordonnees: { ...COORDONNEES },
  horaires: HORAIRES,
  inscriptionUrl: INSCRIPTION_URL,
  crmInscriptionUrl: CRM_INSCRIPTION_URL,
}

export const getParametres = cache(async (): Promise<ParametresVue> => {
  if (!basePresente()) return PARAMETRES_FICHIER
  try {
    const { getPayloadClient } = await import('./payload')
    const payload = await getPayloadClient()
    const g = await payload.findGlobal({ slug: 'parametres' })
    const c = g?.coordonnees ?? {}
    const f = PARAMETRES_FICHIER
    // Champ par champ : un champ vide dans l'admin ne doit pas vider le site.
    return {
      coordonnees: {
        telephone: texteOu(c.telephone, f.coordonnees.telephone),
        telephoneHref: texteOu(c.telephoneHref, f.coordonnees.telephoneHref),
        email: texteOu(c.email, f.coordonnees.email),
        emailHref: texteOu(c.emailHref, f.coordonnees.emailHref),
        adresse: texteOu(c.adresse, f.coordonnees.adresse),
        adresseHref: texteOu(c.adresseHref, f.coordonnees.adresseHref),
        mapsEmbedUrl: texteOu(c.mapsEmbedUrl, f.coordonnees.mapsEmbedUrl),
        mapTitle: texteOu(c.mapTitle, f.coordonnees.mapTitle),
      },
      horaires: texteOu(g?.horaires, f.horaires),
      inscriptionUrl: texteOu(g?.inscriptionUrl, f.inscriptionUrl),
      crmInscriptionUrl: texteOu(g?.crmInscriptionUrl, f.crmInscriptionUrl),
    }
  } catch (erreur) {
    console.warn(
      `[contenu] parametres : lecture Payload impossible, repli sur src/data — ${
        erreur instanceof Error ? erreur.message : String(erreur)
      }`,
    )
    return PARAMETRES_FICHIER
  }
})
