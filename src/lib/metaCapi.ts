import { createHash } from 'node:crypto'

// Envoi d'un événement à l'API Conversions Meta (côté serveur uniquement).
// - Activé seulement si META_PIXEL_ID et META_CAPI_TOKEN sont posées ;
//   META_TEST_EVENT_CODE (optionnelle) envoie vers l'onglet « Tester les
//   évènements » du Gestionnaire d'évènements.
// - Données personnelles normalisées puis hachées en SHA-256, comme l'exige
//   Meta ; IP, user agent, fbc et fbp sont envoyés en clair (non hachés).
// - event_id identique à celui du Pixel (balise GTM) : dédoublonnage.
// - Ne lève jamais d'erreur et ne journalise aucune donnée personnelle.

const VERSION_API = 'v23.0'

export type EvenementMeta = {
  /** Nom standard Meta de l'événement (Lead, Schedule, Contact…). */
  evenement: string
  eventId: string
  /** URL complète de la page du formulaire. */
  url: string
  email?: string
  telephone?: string
  prenom?: string
  nom?: string
  externalId?: string
  ip?: string
  userAgent?: string
  fbc?: string
  fbp?: string
  customData?: Record<string, string | number | undefined>
}

const sha256 = (v: string) => createHash('sha256').update(v).digest('hex')

/** Hache une valeur normalisée ; undefined si elle est vide. */
const hache = (v: string | undefined) => (v ? sha256(v) : undefined)

const normaliserTexte = (v?: string) => v?.trim().toLowerCase() || undefined

/**
 * Téléphone au format international sans « + » ni séparateurs, indicatif
 * français par défaut : « 06 12 34 56 78 » -> « 33612345678 ».
 */
export function normaliserTelephone(v?: string): string | undefined {
  if (!v) return undefined
  let chiffres = v.replace(/\D/g, '')
  if (chiffres.startsWith('00')) chiffres = chiffres.slice(2)
  else if (chiffres.length === 10 && chiffres.startsWith('0')) chiffres = '33' + chiffres.slice(1)
  return chiffres.length >= 8 ? chiffres : undefined
}

export async function envoyerEvenementMeta(e: EvenementMeta): Promise<void> {
  const pixel = process.env.META_PIXEL_ID
  const token = process.env.META_CAPI_TOKEN
  if (!pixel || !token) return

  const user_data = Object.fromEntries(
    Object.entries({
      em: hache(normaliserTexte(e.email)),
      ph: hache(normaliserTelephone(e.telephone)),
      fn: hache(normaliserTexte(e.prenom)),
      ln: hache(normaliserTexte(e.nom)),
      country: hache('fr'),
      external_id: hache(e.externalId?.trim()),
      client_ip_address: e.ip,
      client_user_agent: e.userAgent,
      fbc: e.fbc,
      fbp: e.fbp,
    }).filter(([, v]) => v),
  )

  const corps = {
    data: [
      {
        event_name: e.evenement,
        event_time: Math.floor(Date.now() / 1000),
        event_id: e.eventId,
        event_source_url: e.url,
        action_source: 'website',
        user_data,
        custom_data: e.customData
          ? Object.fromEntries(Object.entries(e.customData).filter(([, v]) => v !== undefined && v !== ''))
          : undefined,
      },
    ],
    test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${VERSION_API}/${encodeURIComponent(pixel)}/events?access_token=${encodeURIComponent(token)}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corps) },
    )
    if (!res.ok) console.error(`API Conversions Meta : échec ${res.status} (événement ${e.evenement})`)
  } catch {
    console.error(`API Conversions Meta : injoignable (événement ${e.evenement})`)
  }
}
