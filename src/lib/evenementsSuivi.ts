// Événement de conversion d'un formulaire, commun au navigateur (dataLayer,
// donc balises GTM Meta Pixel et GA4) et au serveur (API Conversions Meta).
// Les deux côtés en déduisent le même nom depuis `source` : avec le même
// event_id, Meta dédoublonne l'événement reçu du Pixel et celui du serveur.
// Module PUR : utilisable côté navigateur et côté serveur.

export type EvenementLead = {
  /** Nom de l'événement poussé dans le dataLayer (déclencheurs GTM). */
  dataLayer: 'lead' | 'schedule' | 'contact'
  /** Nom de l'événement standard Meta (Pixel et API Conversions). */
  meta: 'Lead' | 'Schedule' | 'Contact'
}

/**
 * - `seance-essai` (page Séance d'essai) : Schedule ;
 * - `contact` (page Contact) : Contact ;
 * - tout autre formulaire (landings, fiches prestation, pages des cours) : Lead.
 */
export function evenementLead(source: string): EvenementLead {
  if (source === 'seance-essai') return { dataLayer: 'schedule', meta: 'Schedule' }
  if (source === 'contact') return { dataLayer: 'contact', meta: 'Contact' }
  return { dataLayer: 'lead', meta: 'Lead' }
}
