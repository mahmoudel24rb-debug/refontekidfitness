import { utmDerniereVisite } from './attribution'
import { attributionPourEnvoi } from './attributionNavigateur'
import { evenementLead } from './evenementsSuivi'

// Envoi d'un lead vers /api/lead, commun à tous les formulaires du site
// (LeadForm, ContactForm). Appelé à la soumission, donc dans le navigateur
// uniquement. Ajoute aux champs saisis :
// - page : chemin de la page du formulaire ;
// - attribution : { first, last } lus dans le cookie ksc_attribution si la
//   catégorie « Publicité et suivi des campagnes » est acceptée ; sinon la
//   visite d'arrivée gardée en mémoire, en first comme en last (aucun
//   stockage sur l'appareil) ;
// - utm : UTM de la dernière visite (champ historique, mapping Make existant) ;
// - suivi : event_id, cookies Meta _fbp / _fbc et identifiant visiteur
//   ksc_vid, pour l'API Conversions Meta (non transmis au webhook).
// Après un envoi réussi : dataLayer.push({ event, event_id, source, activite }),
// event valant 'lead', 'schedule' ou 'contact' (src/lib/evenementsSuivi.ts) ;
// les balises GTM Meta Pixel et GA4 se déclenchent dessus (gtm/README.md).
// Liste des champs reçus par le webhook : WEBHOOK-LEADS.md.

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

/** Valeur envoyée quand une liste déroulante d'activité est laissée par défaut. */
export const ACTIVITE_NON_PRECISEE = 'Je ne sais pas encore'

export type ChampsLead = {
  /** Formulaire d'origine (ex. « contact », « landing-essai-gratuit »). */
  source: string
  /** Activité qui intéresse le prospect (liste déroulante ou déduite de la page). */
  activite: string
  landing?: string
  prenom?: string
  nom?: string
  telephone?: string
  email?: string
  ageEnfant?: string
  creneau?: string
  message?: string
  /** Champ-piège anti-bots. */
  website?: string
}

/** Valeur texte non vide d'un champ de formulaire, sinon undefined. */
export function champ(data: FormData, nom: string): string | undefined {
  const valeur = data.get(nom)
  return typeof valeur === 'string' && valeur.trim() !== '' ? valeur : undefined
}

/** Cookie d'identifiant visiteur (external_id Meta) : 13 mois. */
const COOKIE_VISITEUR = 'ksc_vid'
const DUREE_VISITEUR = 60 * 60 * 24 * 395

/** Valeur d'un cookie, undefined s'il est absent ou illisible. */
function cookie(nom: string): string | undefined {
  try {
    const m = document.cookie.match(new RegExp('(?:^|; )' + nom + '=([^;]*)'))
    return m ? decodeURIComponent(m[1]) : undefined
  } catch {
    return undefined
  }
}

/** Identifiant aléatoire (event_id, identifiant visiteur). */
function identifiant(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
}

/** Identifiant visiteur stable, créé au premier envoi puis réutilisé. */
function identifiantVisiteur(): string {
  const existant = cookie(COOKIE_VISITEUR)
  if (existant) return existant
  const nouveau = identifiant()
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${COOKIE_VISITEUR}=${nouveau}; Max-Age=${DUREE_VISITEUR}; Path=/; SameSite=Lax${secure}`
  } catch {
    // Cookies inaccessibles : identifiant valable pour cet envoi seulement.
  }
  return nouveau
}

/** Poste le lead ; lève une erreur si la réponse n'est pas un succès. */
export async function envoyerLead(champs: ChampsLead): Promise<void> {
  const attribution = attributionPourEnvoi()
  const eventId = identifiant()
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...champs,
      page: window.location.pathname,
      utm: utmDerniereVisite(attribution),
      attribution,
      suivi: { eventId, fbp: cookie('_fbp'), fbc: cookie('_fbc'), visiteur: identifiantVisiteur() },
    }),
  })
  if (!res.ok) throw new Error(String(res.status))
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: evenementLead(champs.source).dataLayer,
    event_id: eventId,
    source: champs.source,
    activite: champs.activite,
  })
}
