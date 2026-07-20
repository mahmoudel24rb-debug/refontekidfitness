'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import Underline from './Underline'
import RoundIcon from './RoundIcon'
import FormField from './FormField'
import { Button } from '@/components/ui/button'

const INFOS = [
  { t: 'Téléphone', v: '02 47 44 41 43', href: 'tel:+33247444143', icon: <Phone className="size-[18px]" /> },
  { t: 'Email', v: 'kidfitnessrochecorbon@gmail.com', href: 'mailto:kidfitnessrochecorbon@gmail.com', icon: <Mail className="size-[18px]" /> },
  { t: 'Adresse', v: '1 Quai de la Loire, 37210 Rochecorbon', href: 'https://maps.google.com/?q=1+Quai+de+la+Loire+37210+Rochecorbon', icon: <MapPin className="size-[18px]" /> },
]

export default function ContactKSC() {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER : aucun envoi en preview (outil interne non branché). À brancher en prod.
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <>
      <SiteHeader />
      <main className="bg-cream text-ink">
        <HeroMarine
          kicker="Contact"
          title="Contactez-nous"
          sub="Une question, une inscription, une visite ? L’équipe du Kid Sport Club vous répond."
          padding="72px 24px"
          maxWidth={640}
        />

        <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-[90px]">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
            {/* Carte formulaire */}
            <div className="rounded-lg border border-border bg-white p-[clamp(26px,4vw,44px)] shadow-md">
              <h2 className="mb-6! font-heading text-[26px] font-extrabold text-marine">Envoyez-nous un <Underline>message</Underline></h2>
              {sent ? (
                <p className="m-0! leading-relaxed"><strong className="text-marine">Merci !</strong> Votre message est bien noté, nous revenons vers vous rapidement.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
                  <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                    <FormField id="p" label="Prénom" required />
                    <FormField id="n" label="Nom" required />
                  </div>
                  <FormField id="e" label="Email" type="email" required />
                  <FormField id="t" label="Téléphone" type="tel" />
                  <FormField id="m" label="Message" as="textarea" rows={5} required />
                  <Button type="submit" className="w-full">Envoyer</Button>
                </form>
              )}
            </div>

            {/* Colonne réassurance : coordonnées, horaires, plan */}
            <aside>
              <div className="mb-[26px] flex flex-col gap-[18px]">
                {INFOS.map((i) => (
                  <a key={i.t} href={i.href} className="flex items-center gap-3.5 font-semibold text-marine no-underline [overflow-wrap:anywhere]">
                    <RoundIcon>{i.icon}</RoundIcon>
                    <span>
                      <span className="mb-0.5 block text-[13px] font-extrabold uppercase tracking-[.04em] text-magenta">{i.t}</span>
                      {i.v}
                    </span>
                  </a>
                ))}
                <div className="flex items-start gap-3.5">
                  <RoundIcon><Clock className="size-[18px]" /></RoundIcon>
                  <p className="m-0! font-semibold leading-relaxed text-marine">
                    <strong>Horaires :</strong> Lun–Ven : 9h00–19h30 (sans coupure) · Samedi : 9h30–12h30
                  </p>
                </div>
              </div>

              <h2 className="mb-4! font-heading text-[22px] font-extrabold text-marine">Nous <Underline>trouver</Underline></h2>
              <div className="overflow-hidden rounded-lg border border-border">
                <iframe
                  title="Plan — Kid Sport Club Rochecorbon"
                  src="https://maps.google.com/maps?q=1%20Quai%20de%20la%20Loire%2037210%20Rochecorbon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="block h-80 w-full border-0"
                  loading="lazy"
                />
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
