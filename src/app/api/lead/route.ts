import { NextResponse } from 'next/server'

import { normaliserVisite, visiteVide } from '@/lib/attribution'
import { sourceCrm } from '@/lib/sourceCrm'

// Réception des leads (tous les formulaires du site : landings Meta Ads,
// Contact, Séance d'essai, fiches prestation, pages des cours).
// - Transfert vers LEAD_WEBHOOK_URL (Make/CRM) si la variable d'env est posée ;
//   sinon accusé de réception sans transfert (préview) et log NEUTRE : on ne
//   journalise JAMAIS de données personnelles côté serveur (RGPD).
// - `website` est un champ-piège (honeypot) : rempli = bot -> 200 silencieux.
// - Chaque champ est borné ; `attribution` ne garde que les clés connues.
// - Structure stable : toutes les clés sont toujours transmises, chaîne vide
//   quand la valeur manque (les 5 clés d'`utm` comprises). Make ne détecte que
//   les clés reçues : elles sont ainsi mappables quel que soit le formulaire.
// - `sourceCrm` : valeur du champ `source` du CRM, toujours présente, calculée
//   ici sur la dernière visite bornée (src/lib/sourceCrm.ts).
// Liste des champs transmis au webhook : WEBHOOK-LEADS.md (racine du dépôt).
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
  /** Première et dernière source du visiteur (cookie ksc_attribution, ou visite d'arrivée sans consentement). */
  attribution?: { first?: unknown; last?: unknown }
  website?: string // honeypot
}

const MAX = { court: 120, message: 2000, page: 300, attribution: 300 } as const

const borné = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

// Une visite de l'attribution : clés connues seulement, 300 caractères par
// valeur ; visite vide si la donnée manque (forme stable pour le mapping CRM).
const visite = (v: unknown) => normaliserVisite(v, MAX.attribution) ?? visiteVide()

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
  const derniere = visite(attribution.last)

  // Toutes les clés, toujours : chaîne vide quand la valeur manque.
  const lead = {
    source: borné(body.source, MAX.court),
    landing: borné(body.landing, MAX.court),
    page: borné(body.page, MAX.page),
    prenom: borné(body.prenom, MAX.court),
    nom: borné(body.nom, MAX.court),
    telephone: borné(body.telephone, MAX.court),
    email: borné(body.email, MAX.court),
    ageEnfant: borné(body.ageEnfant, MAX.court),
    activite: borné(body.activite, MAX.court),
    creneau: borné(body.creneau, MAX.court),
    message: borné(body.message, MAX.message),
    utm: {
      source: borné(body.utm?.source, MAX.court),
      medium: borné(body.utm?.medium, MAX.court),
      campaign: borné(body.utm?.campaign, MAX.court),
      content: borné(body.utm?.content, MAX.court),
      term: borné(body.utm?.term, MAX.court),
    },
    attribution: {
      first: visite(attribution.first),
      last: derniere,
    },
    // Valeur du champ `source` du CRM, déduite de la dernière visite.
    sourceCrm: sourceCrm(derniere),
    recuLe: new Date().toISOString(),
  }

  // Prénom + au moins un canal de recontact (téléphone ou email).
  if (!lead.prenom || (!lead.telephone && !lead.email)) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const webhook = process.env.LEAD_WEBHOOK_URL
  if (!webhook) {
    // Pas de webhook branché (préview) : accusé de réception, log sans données perso.
    console.warn(
      `LEAD_WEBHOOK_URL absente — lead non transmis (reçu à ${lead.recuLe}, source ${lead.source})`,
    )
    return NextResponse.json({ ok: true })
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    })
    if (!res.ok) throw new Error(`webhook ${res.status}`)
    return NextResponse.json({ ok: true })
  } catch {
    console.error(
      `Transfert du lead échoué (reçu à ${lead.recuLe}, source ${lead.source})`,
    )
    return NextResponse.json({ ok: false }, { status: 502 })
  }
}
