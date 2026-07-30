'use client'

import React, { useState } from 'react'

import Underline from './Underline'
import FormField from './FormField'
import { Button } from '@/components/ui/button'

// Formulaire de la page Contact (partie interactive). Extrait de ContactKSC pour
// que la page reste un composant serveur : c'est elle qui lit les coordonnées
// dans le global `parametres` (repli src/data/site.ts) et passe le téléphone ici
// pour le message d'erreur. Le rendu (markup, classes, textes) est inchangé.
export default function ContactForm({ telephone }: { telephone: string }) {
  const [etat, setEtat] = useState<'idle' | 'envoi' | 'ok' | 'erreur'>('idle')
  const sent = etat === 'ok'
  // Envoi réel vers /api/lead (transféré au CRM via LEAD_WEBHOOK_URL quand posée).
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (etat === 'envoi') return
    const data = new FormData(e.currentTarget)
    setEtat('envoi')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          prenom: data.get('p'),
          nom: data.get('n') || undefined,
          email: data.get('e') || undefined,
          telephone: data.get('t') || undefined,
          message: data.get('m') || undefined,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'lead', source: 'contact' })
      setEtat('ok')
    } catch {
      setEtat('erreur')
    }
  }

  return (
    <>
      <h2 className="mb-6! font-heading text-[26px] font-extrabold text-marine">Envoyez-nous un <Underline>message</Underline></h2>
      {sent ? (
        <p className="m-0! leading-relaxed"><strong className="text-marine">Merci !</strong> Votre message est bien noté, nous revenons vers vous rapidement.</p>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
          <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
            <FormField id="p" label="Prénom" required />
            <FormField id="n" label="Nom" required />
          </div>
          <FormField id="e" label="Email" type="email" required />
          <FormField id="t" label="Téléphone" type="tel" />
          <FormField id="m" label="Message" as="textarea" rows={5} required />
          <Button type="submit" className="w-full" disabled={etat === 'envoi'}>
            {etat === 'envoi' ? 'Envoi en cours…' : 'Envoyer'}
          </Button>
          {etat === 'erreur' && (
            <p className="m-0! text-sm font-semibold text-destructive">
              L’envoi a échoué. Réessayez, ou appelez-nous au {telephone}.
            </p>
          )}
        </form>
      )}
    </>
  )
}
