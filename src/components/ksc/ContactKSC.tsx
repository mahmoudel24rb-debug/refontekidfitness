import React from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import Underline from './Underline'
import RoundIcon from './RoundIcon'
import ContactForm from './ContactForm'
import { getParametres } from '@/lib/contenu'

// Page Contact — composant SERVEUR : les coordonnées viennent du global
// `parametres` (repli src/data/site.ts). La partie interactive (formulaire +
// état d'envoi) est isolée dans ContactForm ('use client').
export default async function ContactKSC() {
  const { coordonnees, horaires } = await getParametres()
  const INFOS = [
    { t: 'Téléphone', v: coordonnees.telephone, href: coordonnees.telephoneHref, icon: <Phone className="size-[18px]" /> },
    { t: 'Email', v: coordonnees.email, href: coordonnees.emailHref, icon: <Mail className="size-[18px]" /> },
    { t: 'Adresse', v: coordonnees.adresse, href: coordonnees.adresseHref, icon: <MapPin className="size-[18px]" /> },
  ]

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
              <ContactForm telephone={coordonnees.telephone} />
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
                    <strong>Horaires :</strong> {horaires}
                  </p>
                </div>
              </div>

              <h2 className="mb-4! font-heading text-[22px] font-extrabold text-marine">Nous <Underline>trouver</Underline></h2>
              <div className="overflow-hidden rounded-lg border border-border">
                <iframe
                  title={coordonnees.mapTitle}
                  src={coordonnees.mapsEmbedUrl}
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
