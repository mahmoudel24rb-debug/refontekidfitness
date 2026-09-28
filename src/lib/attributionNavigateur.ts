import {
  construireVisite,
  ecritureCookie,
  fusionner,
  lireCookie,
  suppressionCookie,
  type Attribution,
  type TypeVisite,
  type Visite,
} from './attribution'
import { lireConsentement } from './consentement'

// Attribution côté navigateur, soumise au consentement « Publicité et suivi
// des campagnes » (catégorie publicite de src/lib/consentement.ts).
//
// - Visite d'arrivée : paramètres de campagne, référent externe et page
//   d'entrée du chargement de page, gardés EN MÉMOIRE dès le premier appel
//   (variable de module, aucun stockage sur l'appareil). Elle vit jusqu'au
//   prochain chargement complet de page.
// - Cookie ksc_attribution : écrit uniquement si la publicité est acceptée,
//   supprimé si elle est refusée ou retirée.
// - Envoi d'un formulaire : cookie si la publicité est acceptée, sinon la
//   visite d'arrivée en mémoire, en first comme en last.
// Navigateur uniquement (lit window et document).

let arrivee: { type: TypeVisite; visite: Visite } | null = null

/** Visite d'arrivée du chargement de page en cours, calculée au premier appel puis gardée en mémoire. */
export function visiteArrivee(): { type: TypeVisite; visite: Visite } {
  if (!arrivee) {
    arrivee = construireVisite({
      recherche: window.location.search,
      chemin: window.location.pathname,
      hote: window.location.hostname,
      referent: document.referrer,
      date: new Date(),
    })
  }
  return arrivee
}

/**
 * Applique le choix de la catégorie publicité au cookie ksc_attribution :
 * accord, la visite d'arrivée est fusionnée (first / last touch) puis écrite ;
 * refus ou retrait, le cookie est supprimé.
 */
export function appliquerConsentementAttribution(publicite: boolean) {
  try {
    const https = window.location.protocol === 'https:'
    if (publicite) {
      const { type, visite } = visiteArrivee()
      const suivant = fusionner(lireCookie(document.cookie), type, visite)
      if (suivant) document.cookie = ecritureCookie(suivant, https)
    } else {
      document.cookie = suppressionCookie(https)
    }
  } catch {
    // Cookies inaccessibles : rien à écrire ni à supprimer.
  }
}

/**
 * Attribution jointe à un lead : celle du cookie ksc_attribution si la
 * publicité est acceptée ; sinon (refus, pas encore de choix, cookie absent
 * ou illisible) la visite d'arrivée en mémoire, en first comme en last.
 */
export function attributionPourEnvoi(): Attribution {
  const { visite } = visiteArrivee()
  try {
    if (lireConsentement(document.cookie, new Date())?.publicite) {
      const cookie = lireCookie(document.cookie)
      if (cookie) return cookie
    }
  } catch {
    // Cookies inaccessibles : visite d'arrivée.
  }
  return { first: visite, last: visite }
}
