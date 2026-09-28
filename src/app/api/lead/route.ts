import { after, NextResponse } from 'next/server'

import { normaliserVisite, visiteVide, type Visite } from '@/lib/attribution'
import { evenementLead } from '@/lib/evenementsSuivi'
import { envoyerEvenementMeta } from '@/lib/metaCapi'

// Réception des leads (tous les formulaires du site : landings Meta Ads,
// Contact, Séance d'essai, fiches prestation, pages des cours).
// - Transfert vers LEAD_WEBHOOK_URL (Make/CRM) si la variable d'env est posée ;
//   sinon accusé de réception sans transfert (préview) et log NEUTRE : on ne
//   journalise JAMAIS de données personnelles côté serveur (RGPD).
// - `website` est un champ-piège (honeypot) : rempli = bot -> 200 silencieux.
// - Chaque champ est borné ; `attribution` ne garde que les clés connues.
// Liste des champs transmis au webhook : WEBHOOK-LEADS.md (racine du dépôt).
// - Lead accepté : événement envoyé en plus à l'API Conversions Meta, après la
//   réponse (after), avec l'event_id du navigateur pour le dédoublonnage avec
//   le Pixel (src/lib/metaCapi.ts, gtm/README.md). `suivi` n'est pas transmis
//   au webhook.
// Le jour J : poser LEAD_WEBHOOK_URL dans Vercel (voir .env.example).

type LeadPayload = {
  source?: string
  landing?: string
  /** Chemin de la page du formulaire. */
  page?: string
  prenom?: string
  nom?: string
  telephone?: string
  email?: string
  ageEnfant?: string
  /** Activité qui intéresse le prospect (liste déroulante ou déduite de la page). */
  activite?: string
  creneau?: string
  message?: string
  utm?: Partial<Record<'source' | 'medium' | 'campaign' | 'content' | 'term', string>>
  /** Première et dernière source du visiteur (cookie ksc_attribution). */
  attribution?: { first?: unknown; last?: unknown }
  website?: string // honeypot
  /** Identifiants de suivi Meta (API Conversions). */
  suivi?: { eventId?: unknown; fbp?: unknown; fbc?: unknown; visiteur?: unknown }
}

const MAX = { court: 120, message: 2000, page: 300, attribution: 300 } as const

const borné = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

// Une visite de l'attribution : clés connues seulement, 300 caractères par
// valeur ; visite vide si la donnée manque (forme stable pour le mapping CRM).
const visite = (v: unknown) => normaliserVisite(v, MAX.attribution) ?? visiteVide()

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

/**
 * Cookie fbc : celui posé par le Pixel, sinon reconstruit depuis le fbclid de
 * la dernière (ou à défaut de la première) visite campagne, au format Meta
 * fb.1.{horodatage ms}.{fbclid}.
 */
function fbc(cookie: string, visites: Visite[]): string | undefined {
  if (cookie) return cookie
  const v = visites.find((x) => x.fbclid)
  if (!v) return undefined
  const date = Date.parse(v.date)
  return `fb.1.${Number.isNaN(date) ? Date.now() : date}.${v.fbclid}`
}

/** IP du visiteur (derrière le proxy de l'hébergeur). */
function ipClient(req: Request): string | undefined {
  const transmise = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return transmise || req.headers.get('x-real-ip')?.trim() || undefined
}

export async function POST(req: Request) {
  let body: LeadPayload
  try {
    body = (await req.json()) as LeadPayload
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // Honeypot : on répond comme si tout allait bien, sans rien transmettre.
  if (borné(body.website, MAX.court)) {
    return NextResponse.json({ ok: true })
  }

  const attribution: NonNullable<LeadPayload['attribution']> =
    body.attribution && typeof body.attribution === 'object' ? body.attribution : {}

  const lead = {
    source: borné(body.source, MAX.court) || 'inconnu',
    landing: borné(body.landing, MAX.court) || undefined,
    page: borné(body.page, MAX.page) || undefined,
    prenom: borné(body.prenom, MAX.court),
    nom: borné(body.nom, MAX.court) || undefined,
    telephone: borné(body.telephone, MAX.court),
    email: borné(body.email, MAX.court) || undefined,
    ageEnfant: borné(body.ageEnfant, MAX.court) || undefined,
    activite: borné(body.activite, MAX.court) || undefined,
    creneau: borné(body.creneau, MAX.court) || undefined,
    message: borné(body.message, MAX.message) || undefined,
    utm: {
      source: borné(body.utm?.source, MAX.court) || undefined,
      medium: borné(body.utm?.medium, MAX.court) || undefined,
      campaign: borné(body.utm?.campaign, MAX.court) || undefined,
      content: borné(body.utm?.content, MAX.court) || undefined,
      term: borné(body.utm?.term, MAX.court) || undefined,
    },
    attribution: {
      first: visite(attribution.first),
      last: visite(attribution.last),
    },
    recuLe: new Date().toISOString(),
  }

  // Prénom + au moins un canal de recontact (téléphone ou email).
  if (!lead.prenom || (!lead.telephone && !lead.email)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  // API Conversions Meta, après la réponse : seulement pour un lead accepté
  // (le navigateur ne déclenche le Pixel qu'après une réponse ok).
  const suivi = body.suivi && typeof body.suivi === 'object' ? body.suivi : {}
  const eventId = borné(suivi.eventId, MAX.court)
  const suivreMeta = () => {
    if (!eventId) return
    const evenement = {
      evenement: evenementLead(lead.source).meta,
      eventId,
      url: new URL(lead.page || '/', SITE).toString(),
      email: lead.email,
      telephone: lead.telephone,
      prenom: lead.prenom,
      nom: lead.nom,
      externalId: borné(suivi.visiteur, MAX.court) || undefined,
      ip: ipClient(req),
      userAgent: req.headers.get('user-agent') || undefined,
      fbp: borné(suivi.fbp, MAX.page) || undefined,
      fbc: fbc(borné(suivi.fbc, MAX.page), [lead.attribution.last, lead.attribution.first]),
      customData: { content_name: lead.source, content_category: lead.activite },
    }
    after(() => envoyerEvenementMeta(evenement))
  }

  const webhook = process.env.LEAD_WEBHOOK_URL
  if (!webhook) {
    // Pas de webhook branché (préview) : accusé de réception, log sans données perso.
    console.warn(
      `LEAD_WEBHOOK_URL absente — lead non transmis (reçu à ${lead.recuLe}, source ${lead.source})`,
    )
    suivreMeta()
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) throw new Error(`webhook ${res.status}`)
    suivreMeta()
    return NextResponse.json({ ok: true })
  } catch {
    console.error(
      `Transfert du lead échoué (reçu à ${lead.recuLe}, source ${lead.source})`,
    )
    return NextResponse.json({ ok: false }, { status: 502 })
  }
}
