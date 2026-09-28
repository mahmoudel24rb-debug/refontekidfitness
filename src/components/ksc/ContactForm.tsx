'use client'

import React, { useState } from 'react'

import Underline from './Underline'
import FormField from './FormField'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ACTIVITE_NON_PRECISEE, champ, envoyerLead } from '@/lib/envoiLead'

// Formulaire de la page Contact (partie interactive). Extrait de ContactKSC pour
// que la page reste un composant serveur : c'est elle qui lit les coordonnées
// dans le global `parametres` (repli src/data/site.ts) et les prestations, et
// passe ici le téléphone (message d'erreur) et la liste des activités.
// Envoi par envoyerLead (src/lib/envoiLead.ts), comme les autres formulaires :
// page, attribution first / last touch, UTM de la dernière visite, activité ;
// dataLayer.push({ event: 'lead', source, activite }) après succès.
export default function ContactForm({ telephone, activites }: { telephone: string; activites: string[] }) {
  const [etat, setEtat] = useState<'idle' | 'envoi' | 'ok' | 'erreur'>('idle')
  const sent = etat === 'ok'
  // Envoi réel vers /api/lead (transféré au CRM via LEAD_WEBHOOK_URL quand posée).
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (etat === 'envoi') return
    const data = new FormData(e.currentTarget)
    setEtat('envoi')
    try {
      await envoyerLead({
        source: 'contact',
        activite: champ(data, 'activite') ?? ACTIVITE_NON_PRECISEE,
        prenom: champ(data, 'p'),
        nom: champ(data, 'n'),
        email: champ(data, 'e'),
        telephone: champ(data, 't'),
        message: champ(data, 'm'),
      })
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
          {/* Activité qui intéresse le prospect : même liste et même style que
              sur la page Séance d'essai. Laissée par défaut, « Je ne sais pas
              encore » est transmise telle quelle. */}
          <div className="grid gap-2">
            <Label htmlFor="contact-activite" className="text-sm font-semibold text-marine">
              Quelle activité vous intéresse ?
            </Label>
            <select
              id="contact-activite"
              name="activite"
              defaultValue={ACTIVITE_NON_PRECISEE}
              className="h-[52px] rounded-xl border-[1.5px] border-input bg-[#fdfcf7] px-4 text-base text-ink"
            >
              <option value={ACTIVITE_NON_PRECISEE}>{ACTIVITE_NON_PRECISEE}</option>
              {activites.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
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
