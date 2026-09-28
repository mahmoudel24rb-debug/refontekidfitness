import {
  COOKIE_CONSENTEMENT,
  deserialiserConsentement,
  ecritureConsentement,
  evenementConsentement,
  lireConsentement,
  signauxConsentMode,
  valeurCookie,
  type Choix,
} from './consentement'

// Consentement côté navigateur : état lu par le bandeau (useSyncExternalStore)
// et actions (choix du visiteur, réouverture du panneau par « Gérer les
// cookies »). Règles et formats : src/lib/consentement.ts (module pur).
// Navigateur uniquement (lit window et document).

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    /** Défini par le script de consentement du <head> (src/app/GoogleTagManager.tsx). */
    gtag?: (...args: unknown[]) => void
  }
}

export type EtatConsentement = {
  /** Choix mémorisé ; null s'il n'y en a pas (ou plus : expiré, autre version). */
  choix: Choix | null
  /** Panneau rouvert à la demande (bouton « Gérer les cookies »). */
  panneau: boolean
  /** Nombre d'ouvertures à la demande : chaque ouverture repart du choix mémorisé. */
  ouvertures: number
}

const auditeurs = new Set<() => void>()
let panneau = false
let ouvertures = 0
/** Élément qui a ouvert le panneau, qui reprend le focus à la fermeture. */
let declencheur: HTMLElement | null = null
/** Choix de la page en cours quand le cookie n'a pas pu être écrit (cookies bloqués). */
let choixSansCookie: Choix | null = null
let cache: {
  brut: string | null
  panneau: boolean
  ouvertures: number
  secours: Choix | null
  etat: EtatConsentement
} | null = null

function notifier() {
  for (const auditeur of auditeurs) auditeur()
}

function rendreFocus() {
  const cible = declencheur
  declencheur = null
  if (cible && cible.isConnected) cible.focus()
}

/** Abonnement pour useSyncExternalStore. Un choix fait dans un autre onglet est relu au retour sur celui-ci. */
export function abonner(auditeur: () => void): () => void {
  auditeurs.add(auditeur)
  window.addEventListener('focus', auditeur)
  document.addEventListener('visibilitychange', auditeur)
  return () => {
    auditeurs.delete(auditeur)
    window.removeEventListener('focus', auditeur)
    document.removeEventListener('visibilitychange', auditeur)
  }
}

/** Instantané de l'état : le même objet tant que rien ne change. */
export function lireEtat(): EtatConsentement {
  const brut = valeurCookie(document.cookie, COOKIE_CONSENTEMENT)
  if (
    !cache ||
    cache.brut !== brut ||
    cache.panneau !== panneau ||
    cache.ouvertures !== ouvertures ||
    cache.secours !== choixSansCookie
  ) {
    const memorise = brut === null ? null : deserialiserConsentement(brut, new Date())
    cache = {
      brut,
      panneau,
      ouvertures,
      secours: choixSansCookie,
      etat: {
        choix: memorise ? { audience: memorise.audience, publicite: memorise.publicite } : choixSansCookie,
        panneau,
        ouvertures,
      },
    }
  }
  return cache.etat
}

/** Rendu serveur et hydratation : aucun bandeau (il n'existe que dans le navigateur). */
export function lireEtatServeur(): EtatConsentement | null {
  return null
}

/** Rouvre le panneau de personnalisation ; `origine` reprend le focus à la fermeture. */
export function ouvrirPanneau(origine?: HTMLElement | null) {
  declencheur = origine ?? null
  panneau = true
  ouvertures += 1
  notifier()
}

/** Ferme le panneau rouvert, sans rien enregistrer. */
export function fermerPanneau() {
  panneau = false
  notifier()
  rendreFocus()
}

/**
 * Enregistre le choix du visiteur : cookie ksc_consentement (6 mois), mise à
 * jour Consent Mode, puis événement consent_update pour GTM.
 */
export function enregistrerChoix(choix: Choix) {
  const maintenant = new Date()
  try {
    document.cookie = ecritureConsentement(choix, maintenant, window.location.protocol === 'https:')
    const relu = lireConsentement(document.cookie, maintenant)
    const ecrit = relu !== null && relu.audience === choix.audience && relu.publicite === choix.publicite
    choixSansCookie = ecrit ? null : { ...choix }
  } catch {
    // Cookies inaccessibles : le choix vaut pour la page en cours.
    choixSansCookie = { ...choix }
  }
  window.gtag?.('consent', 'update', signauxConsentMode(choix))
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(evenementConsentement(choix))
  panneau = false
  notifier()
  rendreFocus()
}
