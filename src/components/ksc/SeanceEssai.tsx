'use client'

import React, { useState } from 'react'
import { Check, Phone, Mail, MapPin, Clock } from 'lucide-react'

import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import RoundIcon from './RoundIcon'
import FormField from './FormField'
import { Button } from '@/components/ui/button'

// Points de réassurance — reformulés à partir du texte existant de la page
// (« La séance d'essai est gratuite. Votre demande est traitée directement par
// notre équipe, qui vous recontacte pour fixer le créneau. »).
const POINTS = ['Gratuite et sans engagement', 'Réponse rapide de l’équipe', 'On vous trouve le bon créneau']

export default function SeanceEssai() {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER : aucun envoi en preview (outil interne non branché). À brancher en prod.
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <>
      <SiteHeader />
      <main className="bg-cream text-ink">
        <HeroMarine
          kicker="Séance d’essai"
          title="Venez essayer, c’est la meilleure façon de découvrir"
          sub="Réservez une séance d’essai gratuite : votre enfant découvre l’activité, vous rencontrez l’équipe, et vous décidez ensuite."
          padding="78px 24px"
          maxWidth={760}
        />

        <section className="mx-auto max-w-[1200px] px-6 pt-16 pb-[90px]">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[7fr_5fr] lg:gap-14">
            {/* Carte formulaire */}
            <div className="rounded-lg border border-border bg-white p-[clamp(26px,4vw,44px)] shadow-md">
              {sent ? (
                <div className="py-5 text-center">
                  <h2 className="mb-2.5! font-heading text-2xl font-extrabold text-marine">Merci !</h2>
                  <p className="leading-relaxed">Votre demande est bien notée. Nous vous recontactons rapidement pour fixer la séance d’essai.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
                  <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                    <FormField id="prenom" label="Prénom du parent" required />
                    <FormField id="nom" label="Nom" required />
                  </div>
                  <FormField id="email" label="Email" type="email" required />
                  <FormField id="tel" label="Téléphone" type="tel" required />
                  <FormField id="age" label="Âge de l’enfant" placeholder="ex. 4 ans" />
                  <FormField id="msg" label="Votre message (optionnel)" as="textarea" rows={4} />
                  <Button type="submit" className="w-full">Demander ma séance d’essai</Button>
                  <p className="m-0! text-center text-[13px] opacity-70">Ou appelez-nous au 02 47 44 41 43.</p>
                </form>
              )}
            </div>

            {/* Colonne réassurance */}
            <aside>
              <p className="mb-6! text-base leading-[1.7]">
                La séance d’essai est gratuite. Votre demande est traitée directement par notre équipe, qui vous recontacte pour fixer le créneau.
              </p>

              <ul className="mb-8 flex list-none flex-col gap-3.5 p-0">
                {POINTS.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-base font-semibold text-marine">
                    <span aria-hidden="true" className="inline-flex size-[26px] shrink-0 items-center justify-center rounded-full bg-magenta text-white">
                      <Check className="size-[13px]" strokeWidth={3} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-[18px]">
                <a href="tel:+33247444143" className="flex items-center gap-3.5 font-semibold text-marine no-underline">
                  <RoundIcon><Phone className="size-[18px]" /></RoundIcon>
                  02 47 44 41 43
                </a>
                <a href="mailto:kidfitnessrochecorbon@gmail.com" className="flex items-center gap-3.5 font-semibold text-marine no-underline [overflow-wrap:anywhere]">
                  <RoundIcon><Mail className="size-[18px]" /></RoundIcon>
                  kidfitnessrochecorbon@gmail.com
                </a>
                <a href="https://maps.google.com/?q=1+Quai+de+la+Loire+37210+Rochecorbon" className="flex items-center gap-3.5 font-semibold text-marine no-underline">
                  <RoundIcon><MapPin className="size-[18px]" /></RoundIcon>
                  1 Quai de la Loire, 37210 Rochecorbon
                </a>
                <div className="flex items-start gap-3.5">
                  <RoundIcon><Clock className="size-[18px]" /></RoundIcon>
                  <p className="m-0! font-semibold leading-relaxed text-marine">
                    Lun–Ven : 9h00–19h30 (sans coupure)<br />Samedi : 9h30–12h30
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
