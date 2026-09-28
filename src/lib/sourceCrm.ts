import type { Visite } from './attribution'

// Valeur du champ `source` du CRM (MSDS) déduite d'une visite de
// l'attribution (src/lib/attribution.ts). /api/lead la calcule sur la
// dernière visite (attribution.last) et la transmet au webhook dans le champ
// `sourceCrm` (documentation : WEBHOOK-LEADS.md).
//
// Module PUR : aucune lecture de window, document ou cookie.
//
// Normalisation : utm_source, utm_medium et utm_campaign sans espaces de bord
// et en minuscules ; hôte du référent sans « www. ».
//
// Règles, dans cet ordre (la première qui s'applique gagne) :
//  1. utm_source égal, casse ignorée, à une valeur de SOURCES_CRM : cette valeur ;
//  2. gclid renseigné : GOOGLE_ADS ;
//  3. source Google Ads, ou google avec un support payant : GOOGLE_ADS ;
//  4. source fiche Google, ou google avec un indice de fiche dans le support
//     ou la campagne : GOOGLE_MYBUSINESS ;
//  5. source Meta : avec un support organique, INSTAGRAM (instagram, ig),
//     FACEBOOK_MESSENGER (messenger, msg) ou FACEBOOK ; sinon META_ADS ;
//  6. autres sources connues (WhatsApp, ChatGPT, ActiveCampaign, etc.) ;
//  7. utm_source renseigné mais non reconnu : MSDS_EXTERN_REFERER ;
//  8. sans utm_source, fbclid renseigné : INSTAGRAM si le référent est
//     Instagram, sinon FACEBOOK ;
//  9. sans aucun paramètre UTM, référent externe : selon son domaine, sinon
//     MSDS_EXTERN_REFERER ;
// 10. sinon (visite directe) : WEBSITE_FORM.

/** Valeurs acceptées par le champ `source` du CRM, dans l'ordre de la liste du CRM. */
export const SOURCES_CRM = [
  'MSDS_MANUAL_LEAD',
  'PHONE_CALL',
  'IMPORT_EXCEL',
  'ACTIVE_CAMPAIGN',
  'LEADFOX',
  'ELEVATE_MARKETING',
  'SPONSORSHIP',
  'INCENTIVED',
  'WELOVECUSTOMERS',
  'GOOGLE',
  'GOOGLE_MYBUSINESS',
  'FACEBOOK_MESSENGER',
  'FACEBOOK_LINK',
  'CHATBOT_IG',
  'GOOGLE_ADS',
  'META_ADS',
  'FACEBOOK',
  'INSTAGRAM',
  'MSDS_EXTERN_REFERER',
  'WEBSITE_FORM',
  'MSDS_R2_VEL',
  'CLICKFUNNELS',
  'SWIPE_PAGES',
  'FUNNELO',
  'LEAD_APPOINTMENT',
  'RESERVE_WITH_GOOGLE',
  'URBAN_CHALLENGE',
  'URBAN_SPORTS_CLUB',
  'MSDS',
  'WIDGET',
  'CLUB_CONNECT',
  'DECIPLUS',
  'HEITZ',
  'RESAMANIA',
  'RESAMANIA_2',
  'RESAWOD',
  'FITNESSBOOST',
  'LEAD_SURVEY',
  'SYSTEM_IO',
  'TYPEFORM',
  'AGENCE',
  'EXO',
  'CHATGPT',
  'WHATSAPP',
] as const

export type SourceCrm = (typeof SOURCES_CRM)[number]

/** Règle 3 : sources Google Ads. */
const SOURCES_GOOGLE_ADS = new Set(['google_ads', 'googleads', 'adwords', 'gads'])

/** Règle 3 : supports payants. */
const SUPPORTS_PAYANTS = new Set(['cpc', 'ppc', 'paid', 'sem', 'ads', 'ad', 'cpm', 'display', 'paid_search'])

/** Règle 4 : sources fiche Google (Google Business Profile). */
const SOURCES_FICHE_GOOGLE = new Set([
  'gmb',
  'gbp',
  'google_my_business',
  'googlemybusiness',
  'google_business',
  'googlebusiness',
  'google_business_profile',
  'mybusiness',
])

/** Règle 4 : indices de fiche Google dans utm_medium ou utm_campaign (google). */
const INDICES_FICHE = ['gmb', 'gbp', 'mybusiness', 'business', 'fiche', 'maps']

/**
 * Règle 5 : sources Meta. fb, ig, an et msg sont les valeurs du paramètre
 * dynamique Meta {{site_source_name}}.
 */
const SOURCES_META = new Set([
  'meta',
  'meta_ads',
  'metaads',
  'facebook_ads',
  'facebookads',
  'fb_ads',
  'instagram_ads',
  'ig_ads',
  'facebook',
  'fb',
  'instagram',
  'ig',
  'an',
  'audience_network',
  'msg',
  'messenger',
])

/** Règle 5 : une source qui contient l'un de ces mots est aussi une source Meta. */
const MOTS_META = ['facebook', 'instagram', 'meta']

/** Règle 5 : supports organiques (publication, profil, lien de bio, etc.). */
const SUPPORTS_ORGANIQUES = new Set([
  'social',
  'organic',
  'organique',
  'post',
  'bio',
  'profile',
  'profil',
  'story',
  'reel',
  'link',
  'lien',
])

/** Règle 6 : autres sources connues (google est traité à part). */
const AUTRES_SOURCES = new Map<string, SourceCrm>([
  ['whatsapp', 'WHATSAPP'],
  ['wa', 'WHATSAPP'],
  ['chatgpt', 'CHATGPT'],
  ['chatgpt.com', 'CHATGPT'],
  ['openai', 'CHATGPT'],
  ['activecampaign', 'ACTIVE_CAMPAIGN'],
  ['active_campaign', 'ACTIVE_CAMPAIGN'],
  ['typeform', 'TYPEFORM'],
  ['systeme', 'SYSTEM_IO'],
  ['systeme_io', 'SYSTEM_IO'],
  ['system_io', 'SYSTEM_IO'],
  ['systemeio', 'SYSTEM_IO'],
  ['clickfunnels', 'CLICKFUNNELS'],
  ['urban_sports_club', 'URBAN_SPORTS_CLUB'],
  ['urbansportsclub', 'URBAN_SPORTS_CLUB'],
  ['usc', 'URBAN_SPORTS_CLUB'],
  ['resamania', 'RESAMANIA'],
  ['deciplus', 'DECIPLUS'],
])

/** Règles 8 et 9 : domaines de référents connus (google.* est traité à part). */
const REFERENTS = new Map<string, SourceCrm>([
  ['facebook.com', 'FACEBOOK'],
  ['m.facebook.com', 'FACEBOOK'],
  ['l.facebook.com', 'FACEBOOK'],
  ['lm.facebook.com', 'FACEBOOK'],
  ['business.facebook.com', 'FACEBOOK'],
  ['instagram.com', 'INSTAGRAM'],
  ['l.instagram.com', 'INSTAGRAM'],
  ['messenger.com', 'FACEBOOK_MESSENGER'],
  ['m.me', 'FACEBOOK_MESSENGER'],
  ['chatgpt.com', 'CHATGPT'],
  ['chat.openai.com', 'CHATGPT'],
  ['wa.me', 'WHATSAPP'],
  ['whatsapp.com', 'WHATSAPP'],
  ['web.whatsapp.com', 'WHATSAPP'],
  ['api.whatsapp.com', 'WHATSAPP'],
])

/** Valeur comparable : sans espaces de bord, en minuscules ; chaîne vide si absente. */
const normaliser = (valeur: unknown) => (typeof valeur === 'string' ? valeur.trim().toLowerCase() : '')

/** Vrai si la valeur est une chaîne non vide une fois les espaces de bord retirés. */
const renseigne = (valeur: unknown) => typeof valeur === 'string' && valeur.trim() !== ''

/** Hôte du référent sans « www. » en tête ; chaîne vide s'il est absent ou illisible. */
function hoteReferent(referrer: unknown): string {
  if (!renseigne(referrer)) return ''
  try {
    return new URL((referrer as string).trim()).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * Valeur du CRM correspondant à une visite (même forme que attribution.last).
 * Renvoie toujours une valeur de SOURCES_CRM.
 */
export function sourceCrm(visite: Visite): SourceCrm {
  const source = normaliser(visite.utm_source)
  const support = normaliser(visite.utm_medium)
  const campagne = normaliser(visite.utm_campaign)

  // 1. Code du CRM directement dans utm_source (ex. utm_source=META_ADS).
  const code = SOURCES_CRM.find((valeur) => valeur.toLowerCase() === source)
  if (code) return code

  // 2. Marquage automatique Google Ads.
  if (renseigne(visite.gclid)) return 'GOOGLE_ADS'

  // 3. Google Ads marqué à la main.
  if (SOURCES_GOOGLE_ADS.has(source) || (source === 'google' && SUPPORTS_PAYANTS.has(support))) {
    return 'GOOGLE_ADS'
  }

  // 4. Fiche Google.
  if (
    SOURCES_FICHE_GOOGLE.has(source) ||
    (source === 'google' && INDICES_FICHE.some((indice) => support.includes(indice) || campagne.includes(indice)))
  ) {
    return 'GOOGLE_MYBUSINESS'
  }

  // 5. Meta : publication organique, sinon publicité.
  if (SOURCES_META.has(source) || MOTS_META.some((mot) => source.includes(mot))) {
    if (SUPPORTS_ORGANIQUES.has(support)) {
      if (source === 'instagram' || source === 'ig') return 'INSTAGRAM'
      if (source === 'messenger' || source === 'msg') return 'FACEBOOK_MESSENGER'
      return 'FACEBOOK'
    }
    return 'META_ADS'
  }

  // 6. Autres sources connues.
  const connue = AUTRES_SOURCES.get(source)
  if (connue) return connue
  if (source === 'google') return 'GOOGLE'

  // 7. Source non reconnue.
  if (source) return 'MSDS_EXTERN_REFERER'

  const hote = hoteReferent(visite.referrer)

  // 8. Clic depuis Facebook ou Instagram sans utm_source (publication ou publicité).
  if (renseigne(visite.fbclid)) return REFERENTS.get(hote) === 'INSTAGRAM' ? 'INSTAGRAM' : 'FACEBOOK'

  // 9. Référent externe, sans aucun paramètre UTM.
  const sansUtm = [visite.utm_medium, visite.utm_campaign, visite.utm_content, visite.utm_term].every(
    (valeur) => !renseigne(valeur),
  )
  if (sansUtm && renseigne(visite.referrer)) {
    if (hote.startsWith('google.')) return 'GOOGLE'
    return REFERENTS.get(hote) ?? 'MSDS_EXTERN_REFERER'
  }

  // 10. Visite directe, rien de connu.
  return 'WEBSITE_FORM'
}
