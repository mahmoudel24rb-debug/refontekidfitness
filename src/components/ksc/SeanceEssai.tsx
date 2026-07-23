import React from 'react'
import { Check, Phone, Mail, MapPin, Clock } from 'lucide-react'

import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import RoundIcon from './RoundIcon'
import LeadForm from './LeadForm'
import PullQuote from './PullQuote'
import LandingTeam from './LandingTeam'
import AvisParents from './AvisParents'
import { COORDONNEES, HORAIRES } from '@/data/site'

// Points de réassurance — reformulés à partir du texte existant de la page
// (« La séance d'essai est gratuite. Votre demande est traitée directement par
// notre équipe, qui vous recontacte pour fixer le créneau. »).
const POINTS = ['Gratuite et sans engagement', 'Réponse rapide de l’équipe', 'On vous trouve le bon créneau']

export default function SeanceEssai() {
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
            {/* Formulaire unifié (LeadForm) + rappel téléphone sous le form */}
            <div>
              <LeadForm source="seance-essai" withEmail ctaLabel="Demander ma séance d’essai" />
              <p className="mt-4 text-center text-[13px] opacity-70">Ou appelez-nous au {COORDONNEES.telephone}.</p>
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
                <a href={COORDONNEES.telephoneHref} className="flex items-center gap-3.5 font-semibold text-marine no-underline">
                  <RoundIcon><Phone className="size-[18px]" /></RoundIcon>
                  {COORDONNEES.telephone}
                </a>
                <a href={COORDONNEES.emailHref} className="flex items-center gap-3.5 font-semibold text-marine no-underline [overflow-wrap:anywhere]">
                  <RoundIcon><Mail className="size-[18px]" /></RoundIcon>
                  {COORDONNEES.email}
                </a>
                <a href={COORDONNEES.adresseHref} className="flex items-center gap-3.5 font-semibold text-marine no-underline">
                  <RoundIcon><MapPin className="size-[18px]" /></RoundIcon>
                  {COORDONNEES.adresse}
                </a>
                <div className="flex items-start gap-3.5">
                  <RoundIcon><Clock className="size-[18px]" /></RoundIcon>
                  <p className="m-0! font-semibold leading-relaxed text-marine">{HORAIRES}</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Réassurance : citation parent, équipe (valeurs), avis */}
        <PullQuote
          tone="cream2"
          avisIndex={2}
          extrait="les cours sont adaptés et les encadrants d’une bienveillance qu’on apprécie en tant que parent"
          href="#lead-form"
          ctaLabel="Demander ma séance d’essai"
        />
        <LandingTeam tone="cream" withValeurs />
        <AvisParents />
      </main>
      <SiteFooter />
    </>
  )
}
