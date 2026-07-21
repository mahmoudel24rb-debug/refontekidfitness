import React from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import RoundIcon from './RoundIcon'
import { COORDONNEES, HORAIRES } from '@/data/site'

// « Où nous trouver » : coordonnées (RoundIcon Phone/Mail/MapPin + Clock) et
// carte Google Maps (attributs repris de ContactKSC : mêmes URL/title, lazy).
// Toutes les valeurs proviennent de COORDONNEES/HORAIRES (site.ts).
const INFOS = [
  { t: 'Téléphone', v: COORDONNEES.telephone, href: COORDONNEES.telephoneHref, icon: <Phone className="size-[18px]" /> },
  { t: 'Email', v: COORDONNEES.email, href: COORDONNEES.emailHref, icon: <Mail className="size-[18px]" /> },
  { t: 'Adresse', v: COORDONNEES.adresse, href: COORDONNEES.adresseHref, icon: <MapPin className="size-[18px]" /> },
]

export default function LandingPlace({
  tone = 'white',
}: {
  tone?: 'cream' | 'cream2' | 'white'
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading underline className="mb-9 text-center">
          Où nous trouver
        </SectionHeading>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="flex flex-col gap-[18px]">
            {INFOS.map((i) => (
              <a
                key={i.t}
                href={i.href}
                className="flex items-center gap-3.5 font-semibold text-marine no-underline [overflow-wrap:anywhere]"
              >
                <RoundIcon>{i.icon}</RoundIcon>
                <span>
                  <span className="mb-0.5 block text-[13px] font-extrabold uppercase tracking-[.04em] text-magenta">
                    {i.t}
                  </span>
                  {i.v}
                </span>
              </a>
            ))}
            <div className="flex items-start gap-3.5">
              <RoundIcon>
                <Clock className="size-[18px]" />
              </RoundIcon>
              <p className="font-semibold leading-relaxed text-marine">
                <strong>Horaires :</strong> {HORAIRES}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              title={COORDONNEES.mapTitle}
              src={COORDONNEES.mapsEmbedUrl}
              className="block h-80 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
