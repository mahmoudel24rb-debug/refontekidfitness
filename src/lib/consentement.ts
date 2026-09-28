// Consentement aux cookies (règles CNIL) et Google Consent Mode v2.
//
// Module PUR : aucune lecture de window, document ou cookie ici. Les valeurs
// du navigateur (chaîne des cookies, date, protocole) sont passées en
// paramètres, ce qui rend chaque étape testable hors navigateur. Sert au
// script inline du <head> (src/app/GoogleTagManager.tsx), au bandeau
// (src/components/ksc/BandeauConsentement.tsx), au suivi de l'attribution et
// à l'envoi des formulaires.
//
// Catégories soumises au choix du visiteur (les cookies nécessaires, dont
// celui qui mémorise le choix, sont toujours actifs) :
// - audience : mesure d'audience (statistiques de visite, ex. Google
//   Analytics via GTM), signal analytics_storage ;
// - publicite : publicité et suivi des campagnes (Google Ads, Meta, cookie
//   ksc_attribution), signaux ad_storage, ad_user_data, ad_personalization.
//
// Le choix, accord comme refus, est conservé 6 mois dans le cookie
// first-party ksc_consentement : { v, audience, publicite, date }. `v` est la
// version de la liste des traceurs : l'augmenter redemande le choix à tous
// les visiteurs (un choix d'une autre version est ignoré).

/** Nom du cookie qui mémorise le choix. */
export const COOKIE_CONSENTEMENT = 'ksc_consentement'

/** Version de la liste des traceurs. Un choix d'une autre version est ignoré : le bandeau revient. */
export const VERSION_CONSENTEMENT = 1

/** Durée de validité du choix : 6 mois (180 jours, 15 552 000 s), accord comme refus. */
export const DUREE_CONSENTEMENT_SECONDES = 180 * 24 * 60 * 60

/** Choix du visiteur, catégorie par catégorie. */
export type Choix = { audience: boolean; publicite: boolean }

/** Catégorie soumise au choix du visiteur. */
export type Categorie = keyof Choix

/** Contenu du cookie. */
export type Consentement = { v: number; audience: boolean; publicite: boolean; date: string }

/** Signaux Consent Mode v2 pilotés par le choix du visiteur. */
export type SignalConsentMode = 'ad_storage' | 'ad_user_data' | 'ad_personalization' | 'analytics_storage'

export type EtatSignal = 'granted' | 'denied'

/** Catégorie qui autorise chaque signal Consent Mode. Source unique, reprise par le script du <head>. */
export const CATEGORIE_PAR_SIGNAL: Record<SignalConsentMode, Categorie> = {
  ad_storage: 'publicite',
  ad_user_data: 'publicite',
  ad_personalization: 'publicite',
  analytics_storage: 'audience',
}

/** Consent Mode v2 : état par défaut, posé avant GTM sur chaque page publique. */
export const CONSENT_PAR_DEFAUT = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500,
} as const

export const TOUT_ACCEPTER: Choix = { audience: true, publicite: true }
export const TOUT_REFUSER: Choix = { audience: false, publicite: false }

/** Signaux à passer à gtag('consent', 'update', ...) pour un choix. */
export function signauxConsentMode(choix: Choix): Record<SignalConsentMode, EtatSignal> {
  const signaux = {} as Record<SignalConsentMode, EtatSignal>
  for (const signal of Object.keys(CATEGORIE_PAR_SIGNAL) as SignalConsentMode[]) {
    signaux[signal] = choix[CATEGORIE_PAR_SIGNAL[signal]] ? 'granted' : 'denied'
  }
  return signaux
}

/** Événement poussé dans le dataLayer à chaque choix (déclencheur des balises non Google de GTM). */
export function evenementConsentement(choix: Choix) {
  return {
    event: 'consent_update',
    consentement_audience: choix.audience,
    consentement_publicite: choix.publicite,
  }
}

/** Contenu du cookie pour un choix fait à `date`. */
export function creerConsentement(choix: Choix, date: Date): Consentement {
  return { v: VERSION_CONSENTEMENT, audience: choix.audience, publicite: choix.publicite, date: date.toISOString() }
}

/** Valeur du cookie : JSON encodé pour l'URL. */
export function serialiserConsentement(consentement: Consentement): string {
  const { v, audience, publicite, date } = consentement
  return encodeURIComponent(JSON.stringify({ v, audience, publicite, date }))
}

/**
 * Choix lu dans une valeur de cookie ; null s'il est illisible, d'une autre
 * version ou plus vieux que la durée de validité. Mêmes règles que le script
 * du <head> (scriptConsentementParDefaut).
 */
export function deserialiserConsentement(valeur: string, maintenant: Date): Consentement | null {
  try {
    const brut: unknown = JSON.parse(decodeURIComponent(valeur))
    if (!brut || typeof brut !== 'object') return null
    const { v, audience, publicite, date } = brut as Record<string, unknown>
    if (
      v !== VERSION_CONSENTEMENT ||
      typeof audience !== 'boolean' ||
      typeof publicite !== 'boolean' ||
      typeof date !== 'string'
    ) {
      return null
    }
    const instant = Date.parse(date)
    if (Number.isNaN(instant) || maintenant.getTime() - instant > DUREE_CONSENTEMENT_SECONDES * 1000) return null
    return { v: VERSION_CONSENTEMENT, audience, publicite, date }
  } catch {
    return null
  }
}

/** Valeur brute d'un cookie dans une chaîne de cookies (document.cookie ou en-tête Cookie) ; null s'il est absent. */
export function valeurCookie(cookies: string, nom: string): string | null {
  for (const morceau of cookies.split(';')) {
    const egal = morceau.indexOf('=')
    if (egal === -1) continue
    if (morceau.slice(0, egal).trim() === nom) return morceau.slice(egal + 1).trim()
  }
  return null
}

/** Choix mémorisé dans une chaîne de cookies ; null s'il n'y en a pas de valide. */
export function lireConsentement(cookies: string, maintenant: Date): Consentement | null {
  const valeur = valeurCookie(cookies, COOKIE_CONSENTEMENT)
  return valeur === null ? null : deserialiserConsentement(valeur, maintenant)
}

/** Chaîne à affecter à document.cookie : 6 mois, tout le site, SameSite=Lax, Secure en https. */
export function ecritureConsentement(choix: Choix, date: Date, https: boolean): string {
  return (
    `${COOKIE_CONSENTEMENT}=${serialiserConsentement(creerConsentement(choix, date))}; ` +
    `Max-Age=${DUREE_CONSENTEMENT_SECONDES}; Path=/; SameSite=Lax` +
    (https ? '; Secure' : '')
  )
}

/**
 * Script inline du <head>, exécuté AVANT le snippet GTM :
 * 1. initialise window.dataLayer et gtag (code officiel de Google : gtag
 *    pousse l'objet `arguments`, seule forme reconnue par GTM) ;
 * 2. pose le consentement par défaut (tout refusé sauf fonctionnel et
 *    sécurité, attente de 500 ms d'une mise à jour) ;
 * 3. si un choix valide est mémorisé, pose aussitôt la mise à jour
 *    correspondante, avant le chargement de GTM.
 * Nom du cookie, version, durée et correspondance des signaux viennent des
 * constantes de ce module. Écrit en ES5, sans dépendance.
 */
export function scriptConsentementParDefaut(): string {
  return [
    'window.dataLayer=window.dataLayer||[];',
    'function gtag(){dataLayer.push(arguments);}',
    `gtag('consent','default',${JSON.stringify(CONSENT_PAR_DEFAUT)});`,
    '(function(){try{',
    `var n=${JSON.stringify(COOKIE_CONSENTEMENT)},v=${JSON.stringify(VERSION_CONSENTEMENT)},`,
    `d=${JSON.stringify(DUREE_CONSENTEMENT_SECONDES * 1000)},s=${JSON.stringify(CATEGORIE_PAR_SIGNAL)},`,
    "l=document.cookie.split(';');",
    'for(var i=0;i<l.length;i++){',
    "var e=l[i].indexOf('=');",
    'if(e===-1||l[i].slice(0,e).trim()!==n)continue;',
    'var c=JSON.parse(decodeURIComponent(l[i].slice(e+1).trim()));',
    "if(!c||typeof c!=='object'||c.v!==v||typeof c.audience!=='boolean'||typeof c.publicite!=='boolean'||typeof c.date!=='string')return;",
    'var t=Date.parse(c.date);',
    'if(isNaN(t)||Date.now()-t>d)return;',
    "var u={};for(var k in s)u[k]=c[s[k]]?'granted':'denied';",
    "gtag('consent','update',u);return}",
    '}catch(x){}})();',
  ].join('')
}
