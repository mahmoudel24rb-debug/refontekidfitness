// Attribution des visiteurs : première source (first touch) et dernière source
// (last touch), conservées 90 jours dans le cookie first-party ksc_attribution
// et transmises au webhook avec chaque lead (documentation : WEBHOOK-LEADS.md).
// Le cookie est écrit dès la première page vue, sans condition
// (src/lib/attributionNavigateur.ts).
//
// Module PUR : aucune lecture de window, document ou cookie ici. Les valeurs
// du navigateur sont passées en paramètres, ce qui rend chaque étape testable
// hors navigateur. Sert au suivi côté navigateur (src/lib/attributionNavigateur.ts :
// visite d'arrivée, écriture du cookie, attribution des formulaires) et à
// /api/lead (clés acceptées).
//
// Règles :
// - visite « campagne » : au moins un des 7 paramètres de campagne dans l'URL ;
// - sinon visite « referent » : document.referrer d'un autre domaine ;
// - sinon visite directe (sans référent) ou navigation interne ;
// - first : créé une seule fois, à la première visite (quel qu'en soit le
//   type), jamais écrasé ;
// - last : égal à first au départ, remplacé à chaque visite campagne ou
//   référent ; une visite directe ou interne ne change rien ;
// - chaque écriture repousse l'expiration du cookie à 90 jours.

/** Nom du cookie first-party. */
export const COOKIE_ATTRIBUTION = 'ksc_attribution'

/** Durée de vie du cookie : 90 jours (7 776 000 s), repoussée à chaque écriture. */
export const DUREE_COOKIE_SECONDES = 90 * 24 * 60 * 60

/** Paramètres de campagne capturés dans l'URL d'arrivée. */
export const PARAMETRES_CAMPAGNE = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
] as const

/** Clés d'une visite, dans l'ordre du cookie et du webhook. */
export const CLES_VISITE = [...PARAMETRES_CAMPAGNE, 'referrer', 'landing_page', 'date'] as const

export type ParametreCampagne = (typeof PARAMETRES_CAMPAGNE)[number]
export type CleVisite = (typeof CLES_VISITE)[number]

/** Une visite : toutes les clés sont présentes, chaîne vide quand la valeur manque. */
export type Visite = Record<CleVisite, string>

/** Contenu du cookie. */
export type Attribution = { first: Visite; last: Visite }

export type TypeVisite = 'campagne' | 'referent' | 'direct' | 'interne'

/** Longueur maximale de chaque valeur conservée (cookie sous 4 Ko). */
export const LONGUEUR_MAX = 200

/**
 * Plafond de la valeur encodée du cookie. Les navigateurs refusent un cookie
 * de plus de 4 096 octets (nom compris) : au-delà, les valeurs sont raccourcies
 * davantage (cas extrême de valeurs longues pleines de caractères accentués).
 */
const TAILLE_MAX_VALEUR = 3800

/** Paliers de raccourcissement successifs quand le cookie dépasse le plafond. */
const PALIERS = [LONGUEUR_MAX, 100, 50, 25, 10] as const

/** Espaces de bord retirés puis coupe à `max` caractères (sans casser un caractère). */
export function tronquer(valeur: string, max: number = LONGUEUR_MAX): string {
  const texte = valeur.trim()
  if (texte.length <= max) return texte
  return Array.from(texte).slice(0, max).join('')
}

/** Visite dont toutes les valeurs sont vides. */
export function visiteVide(): Visite {
  const visite = {} as Visite
  for (const cle of CLES_VISITE) visite[cle] = ''
  return visite
}

/** Les 7 paramètres de campagne présents dans une chaîne de requête (« ?a=b&c=d »). */
export function lireParametres(recherche: string): Partial<Record<ParametreCampagne, string>> {
  const params = new URLSearchParams(recherche)
  const trouves: Partial<Record<ParametreCampagne, string>> = {}
  for (const cle of PARAMETRES_CAMPAGNE) {
    const valeur = tronquer(params.get(cle) ?? '')
    if (valeur) trouves[cle] = valeur
  }
  return trouves
}

/** Domaine comparable : minuscules, sans « www. » en tête. */
const domaine = (hote: string) => hote.toLowerCase().replace(/^www\./, '')

/** Nom d'hôte d'une URL, ou null si elle est illisible. */
function hoteDe(url: string): string | null {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}

/** Ce que le navigateur sait d'un chargement de page. */
export type ContexteVisite = {
  /** Chaîne de requête de l'URL (location.search). */
  recherche: string
  /** Chemin de l'URL (location.pathname). */
  chemin: string
  /** Nom d'hôte du site (location.hostname). */
  hote: string
  /** Page d'où vient le visiteur (document.referrer), vide si aucune. */
  referent: string
  /** Instant du chargement. */
  date: Date
}

/**
 * Type et contenu de la visite correspondant à un chargement de page. Le
 * référent n'est conservé que s'il est externe : pour une visite directe ou
 * une navigation interne, `referrer` reste vide.
 */
export function construireVisite(contexte: ContexteVisite): { type: TypeVisite; visite: Visite } {
  const parametres = lireParametres(contexte.recherche)
  const referent = contexte.referent.trim()
  const hoteReferent = referent ? hoteDe(referent) : null
  // Référent illisible : on le garde, il ne peut pas être reconnu comme le site.
  const externe = referent !== '' && (hoteReferent === null || domaine(hoteReferent) !== domaine(contexte.hote))

  let type: TypeVisite
  if (Object.keys(parametres).length > 0) type = 'campagne'
  else if (externe) type = 'referent'
  else if (referent) type = 'interne'
  else type = 'direct'

  const visite: Visite = {
    ...visiteVide(),
    ...parametres,
    referrer: externe ? tronquer(referent) : '',
    landing_page: tronquer(contexte.chemin + contexte.recherche),
    date: contexte.date.toISOString(),
  }
  return { type, visite }
}

/**
 * Fusion first / last touch. Renvoie l'état à écrire dans le cookie, ou null
 * quand la visite ne change rien (visite directe ou interne, cookie existant).
 */
export function fusionner(existant: Attribution | null, type: TypeVisite, visite: Visite): Attribution | null {
  if (!existant) return { first: visite, last: visite }
  if (type === 'campagne' || type === 'referent') return { first: existant.first, last: visite }
  return null
}

/**
 * Visite relue depuis l'extérieur (cookie, corps d'une requête) : seules les
 * clés connues sont gardées, chaque valeur est une chaîne bornée à `max`.
 * Renvoie null si la donnée n'est pas un objet.
 */
export function normaliserVisite(brut: unknown, max: number = LONGUEUR_MAX): Visite | null {
  if (!brut || typeof brut !== 'object' || Array.isArray(brut)) return null
  const source = brut as Record<string, unknown>
  const visite = visiteVide()
  for (const cle of CLES_VISITE) {
    const valeur = source[cle]
    if (typeof valeur === 'string') visite[cle] = tronquer(valeur, max)
  }
  return visite
}

/** Mêmes valeurs raccourcies à `max` caractères (la date ISO reste entière). */
function raccourcir(visite: Visite, max: number): Visite {
  const court = visiteVide()
  for (const cle of CLES_VISITE) court[cle] = cle === 'date' ? visite[cle] : tronquer(visite[cle], max)
  return court
}

/** Valeur du cookie : JSON encodé pour l'URL, sous le plafond de taille. */
export function serialiser(attribution: Attribution): string {
  let valeur = ''
  for (const max of PALIERS) {
    valeur = encodeURIComponent(
      JSON.stringify({ first: raccourcir(attribution.first, max), last: raccourcir(attribution.last, max) }),
    )
    if (valeur.length <= TAILLE_MAX_VALEUR) break
  }
  return valeur
}

/** Contenu d'une valeur de cookie ; null si elle est illisible ou incomplète. */
export function deserialiser(valeur: string): Attribution | null {
  try {
    const brut: unknown = JSON.parse(decodeURIComponent(valeur))
    if (!brut || typeof brut !== 'object') return null
    const { first, last } = brut as { first?: unknown; last?: unknown }
    const premiere = normaliserVisite(first)
    if (!premiere) return null
    return { first: premiere, last: normaliserVisite(last) ?? premiere }
  } catch {
    return null
  }
}

/** Attribution lue dans une chaîne de cookies (document.cookie ou en-tête Cookie). */
export function lireCookie(cookies: string): Attribution | null {
  for (const morceau of cookies.split(';')) {
    const egal = morceau.indexOf('=')
    if (egal === -1) continue
    if (morceau.slice(0, egal).trim() === COOKIE_ATTRIBUTION) {
      return deserialiser(morceau.slice(egal + 1).trim())
    }
  }
  return null
}

/** Chaîne à affecter à document.cookie : 90 jours, tout le site, SameSite=Lax, Secure en https. */
export function ecritureCookie(attribution: Attribution, https: boolean): string {
  return (
    `${COOKIE_ATTRIBUTION}=${serialiser(attribution)}; Max-Age=${DUREE_COOKIE_SECONDES}; Path=/; SameSite=Lax` +
    (https ? '; Secure' : '')
  )
}

/** Champ `utm` historique du webhook : les UTM de la dernière visite (last touch). */
export function utmDerniereVisite(attribution: Attribution) {
  const derniere = attribution.last
  return {
    source: derniere.utm_source || undefined,
    medium: derniere.utm_medium || undefined,
    campaign: derniere.utm_campaign || undefined,
    content: derniere.utm_content || undefined,
    term: derniere.utm_term || undefined,
  }
}
