'use client'

import React, { useState } from 'react'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import FormField from './FormField'

// Formulaire de capture de lead (landings Meta Ads + Contact + Séance d'essai).
// - ≤ 5 champs (standard conversion), honeypot anti-bots, UTM capturés depuis
//   l'URL et transmis avec le lead (traçabilité campagne -> prospect).
//   NB : les UTM sont lus AU SUBMIT via window.location.search (pas de
//   useSearchParams : il forcerait une frontière Suspense et sortirait le
//   formulaire du HTML statique prérendu).
// - Poste sur /api/lead ; état succès inline + dataLayer.push({event:'lead'})
//   (préparation pixel/CAPI — aucun cookie posé ici).
// - RGPD : first-party, mention de consentement + lien Confidentialité.

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

type Props = {
  source: string
  landing?: string
  ctaLabel?: string
  /** compact : sans champ message (hero de landing) */
  compact?: boolean
  /** avec champ email (page Contact) */
  withEmail?: boolean
  /** Options de créneau (fiches prestation) : ajoute un <select> optionnel. */
  creneaux?: { value: string; label: string }[]
  /** Activités proposées (page Séance d'essai) : ajoute un <select> optionnel. */
  activites?: string[]
  /** id du <form> (défaut 'lead-form'). Le 2e formulaire de fin de page
   *  utilise 'lead-form-final' pour être observé par la StickyCtaBar. */
  formId?: string
  className?: string
}

export default function LeadForm({ source, landing, ctaLabel = 'Envoyer', compact, withEmail, creneaux, activites, formId = 'lead-form', className }: Props) {
  const [etat, setEtat] = useState<'idle' | 'envoi' | 'ok' | 'erreur'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (etat === 'envoi') return
    const form = e.currentTarget
    const data = new FormData(form)
    // UTM lus au moment de l'envoi (les paramètres de l'annonce restent dans
    // l'URL pendant toute la visite de la landing).
    const params = new URLSearchParams(window.location.search)
    setEtat('envoi')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          landing,
          prenom: data.get('prenom'),
          telephone: data.get('telephone'),
          email: data.get('email') || undefined,
          ageEnfant: data.get('ageEnfant') || undefined,
          activite: data.get('activite') || undefined,
          creneau: data.get('creneau') || undefined,
          message: data.get('message') || undefined,
          website: data.get('website') || undefined,
          utm: {
            source: params.get('utm_source') ?? undefined,
            medium: params.get('utm_medium') ?? undefined,
            campaign: params.get('utm_campaign') ?? undefined,
            content: params.get('utm_content') ?? undefined,
            term: params.get('utm_term') ?? undefined,
          },
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'lead', source })
      setEtat('ok')
    } catch {
      setEtat('erreur')
    }
  }

  if (etat === 'ok') {
    return (
      <div className={className} id={formId}>
        <div className="flex flex-col items-center gap-3 rounded-lg bg-card p-8 text-center shadow-md">
          <span className="grid size-12 place-items-center rounded-full bg-magenta text-white">
            <Check size={24} strokeWidth={3} aria-hidden="true" />
          </span>
          <p className="font-heading text-xl font-bold text-marine">Merci !</p>
          <p className="leading-relaxed">Notre équipe vous rappelle très vite pour tout organiser.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={className} id={formId} noValidate={false}>
      <div className="flex flex-col gap-4 rounded-lg bg-card p-6 shadow-md sm:p-7">
        <FormField id={`${source}-prenom`} name="prenom" label="Prénom du parent" required autoComplete="given-name" />
        <FormField id={`${source}-tel`} name="telephone" label="Téléphone" type="tel" required autoComplete="tel" />
        {withEmail && <FormField id={`${source}-email`} name="email" label="Email" type="email" autoComplete="email" />}
        <FormField id={`${source}-age`} name="ageEnfant" label="Âge de l’enfant" placeholder="ex. 4 ans" />
        {activites && activites.length > 0 && (
          <div className="grid gap-2">
            <Label htmlFor={`${source}-activite`} className="text-sm font-semibold text-marine">
              Quelle activité voulez-vous tester ? (optionnel)
            </Label>
            <select
              id={`${source}-activite`}
              name="activite"
              defaultValue=""
              className="h-[52px] rounded-xl border-[1.5px] border-input bg-[#fdfcf7] px-4 text-base text-ink"
            >
              <option value="">Je ne sais pas encore</option>
              {activites.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        )}
        {creneaux && creneaux.length > 0 && (
          <div className="grid gap-2">
            <Label htmlFor={`${source}-creneau`} className="text-sm font-semibold text-marine">
              Créneau souhaité (optionnel)
            </Label>
            <select
              id={`${source}-creneau`}
              name="creneau"
              defaultValue=""
              className="h-[52px] rounded-xl border-[1.5px] border-input bg-[#fdfcf7] px-4 text-base text-ink"
            >
              <option value="">Je ne sais pas encore</option>
              {creneaux.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        )}
        {!compact && (
          <FormField id={`${source}-msg`} name="message" label="Votre message (optionnel)" as="textarea" rows={3} />
        )}
        {/* Champ-piège anti-bots : invisible pour les humains. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${source}-website`}>Ne pas remplir</label>
          <input id={`${source}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <Button type="submit" className="w-full" disabled={etat === 'envoi'}>
          {etat === 'envoi' ? 'Envoi en cours…' : ctaLabel}
        </Button>
        {etat === 'erreur' && (
          <p className="text-sm font-semibold text-destructive">
            L’envoi a échoué. Réessayez, ou appelez-nous au{' '}
            <a href="tel:+33247444143" className="underline underline-offset-2">02 47 44 41 43</a>.
          </p>
        )}
        <p className="text-xs leading-relaxed text-muted-foreground">
          En envoyant ce formulaire, vous acceptez d’être recontacté par le club.{' '}
          <a href="/confidentialite" className="underline underline-offset-2 hover:text-marine">Confidentialité</a>
        </p>
      </div>
    </form>
  )
}
