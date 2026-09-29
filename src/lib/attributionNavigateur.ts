import {
  construireVisite,
  ecritureCookie,
  fusionner,
  lireCookie,
  type Attribution,
  type TypeVisite,
  type Visite,
} from './attribution'

// Attribution côté navigateur (règles et formats : src/lib/attribution.ts).
//
// - Visite d'arrivée : paramètres de campagne, référent externe et page
//   d'entrée du chargement de page, gardés EN MÉMOIRE dès le premier appel
//   (variable de module). Elle vit jusqu'au prochain chargement complet de
//   page.
// - Cookie ksc_attribution : écrit dès la première page vue, sans condition,
//   puis mis à jour à chaque chargement de page (first / last touch) ; 90
//   jours, repoussés à chaque écriture.
// - Envoi d'un formulaire : le cookie ; la visite d'arrivée en mémoire, en
//   first comme en last, seulement si les cookies sont bloqués.
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
 * Met à jour le cookie ksc_attribution avec la visite d'arrivée : fusion
 * first / last touch, puis écriture si la visite change quelque chose
 * (première visite, visite campagne ou référent).
 */
export function mettreAJourAttribution() {
  try {
    const { type, visite } = visiteArrivee()
    const suivant = fusionner(lireCookie(document.cookie), type, visite)
    if (suivant) document.cookie = ecritureCookie(suivant, window.location.protocol === 'https:')
  } catch {
    // Cookies inaccessibles : rien à écrire.
  }
}

/**
 * Attribution jointe à un lead : celle du cookie ksc_attribution ; si le
 * cookie est absent ou illisible (cookies bloqués), la visite d'arrivée en
 * mémoire, en first comme en last.
 */
export function attributionPourEnvoi(): Attribution {
  const { visite } = visiteArrivee()
  try {
    const cookie = lireCookie(document.cookie)
    if (cookie) return cookie
  } catch {
    // Cookies inaccessibles : visite d'arrivée.
  }
  return { first: visite, last: visite }
}
