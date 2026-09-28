import { construireVisite, lireCookie, utmDerniereVisite, type Attribution } from './attribution'

// Envoi d'un lead vers /api/lead, commun à tous les formulaires du site
// (LeadForm, ContactForm). Appelé à la soumission, donc dans le navigateur
// uniquement. Ajoute aux champs saisis :
// - page : chemin de la page du formulaire ;
// - attribution : { first, last } lus dans le cookie ksc_attribution ;
// - utm : UTM de la dernière visite (champ historique, mapping Make existant).
// Après un envoi réussi : dataLayer.push({ event: 'lead', source, activite }).
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

/**
 * Attribution du cookie ; à défaut (cookie refusé ou effacé), celle de la
 * visite en cours, reconstruite avec les mêmes règles.
 */
function attributionCourante(): Attribution {
  try {
    const cookie = lireCookie(document.cookie)
    if (cookie) return cookie
  } catch {
    // Cookies inaccessibles : visite en cours.
  }
  const { visite } = construireVisite({
    recherche: window.location.search,
    chemin: window.location.pathname,
    hote: window.location.hostname,
    referent: document.referrer,
    date: new Date(),
  })
  return { first: visite, last: visite }
}

/** Poste le lead ; lève une erreur si la réponse n'est pas un succès. */
export async function envoyerLead(champs: ChampsLead): Promise<void> {
  const attribution = attributionCourante()
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...champs,
      page: window.location.pathname,
      utm: utmDerniereVisite(attribution),
      attribution,
    }),
  })
  if (!res.ok) throw new Error(String(res.status))
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'lead', source: champs.source, activite: champs.activite })
}
