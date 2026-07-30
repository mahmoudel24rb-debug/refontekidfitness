import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Section from './Section'
import Container from './Container'
import { getPlanning } from '@/lib/contenu'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

// Tranches d'âge présentes dans le planning (légende), dans l'ordre croissant.
const TRANCHES = ['10-36 mois', '3-5 ans', '6-14 ans']

export default async function PlanningKSC() {
  const planning = await getPlanning()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Planning', item: `${SITE}/planning` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>
        <HeroMarine
          kicker="Planning"
          title="Le planning des cours"
          sub={<>Baby Gym, Gym Dance, Multisports, Cross Boxe&hellip; retrouvez les créneaux de chaque activité, jour par jour et salle par salle.</>}
          padding="72px 24px"
          maxWidth={760}
        />

        <Section tone="cream">
          <Container>
            {/* Légende des tranches d'âge (pills royal) */}
            <div className="mb-8 flex flex-wrap justify-center gap-2.5">
              {TRANCHES.map((t) => (
                <Badge key={t} variant="age" className="px-3.5 py-2 text-sm">
                  {t}
                </Badge>
              ))}
            </div>

            {/* Jours : 2 colonnes desktop, 1 colonne mobile (hauteurs auto) */}
            <div className="grid gap-6 lg:grid-cols-2">
              {planning.map((j) => {
                const nb = j.salles.reduce((n, s) => n + s.creneaux.length, 0)
                return (
                  <Card key={j.jour} className="gap-4 p-7">
                    <div className="flex flex-wrap items-center justify-between gap-3.5">
                      <h2 className="font-heading text-[26px] font-extrabold text-marine">{j.jour}</h2>
                      {/* Pastille : nombre de créneaux du jour */}
                      <span className="whitespace-nowrap rounded-full bg-cream-2 px-3 py-1.5 text-[13px] font-bold text-marine">
                        {nb} {nb > 1 ? 'créneaux' : 'créneau'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3.5">
                      {j.salles.map((s) => (
                        <div key={s.salle} className="rounded-md bg-cream-2 p-4">
                          <h3 className="mb-3 text-[13px] font-extrabold uppercase tracking-[.05em] text-magenta">
                            {s.salle}
                          </h3>
                          <ul className="flex flex-col gap-2.5">
                            {s.creneaux.map((c) => (
                              <li
                                key={`${c.heure}-${c.activite}`}
                                className="flex flex-wrap items-center gap-2.5 leading-snug"
                              >
                                {/* Heure en pill marine */}
                                <span className="whitespace-nowrap rounded-full bg-marine px-2.5 py-1 text-[13px] font-bold text-cream">
                                  {c.heure}
                                </span>
                                <strong className="text-[15.5px] font-bold text-marine">{c.activite}</strong>
                                {c.age && <Badge variant="age">{c.age}</Badge>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Card>
                )
              })}
            </div>
            <p className="mt-7 text-center text-sm italic text-muted-foreground">
              Planning de la rentrée de septembre 2026, susceptible d’évoluer.
            </p>
          </Container>
        </Section>

        <WaveDivider colorTop="var(--ksc-cream)" colorBottom="var(--ksc-marine)" />

        {/* Bande CTA pré-footer (texte existant de la page : le bouton) */}
        <CtaBand>
          <Button asChild variant="primary">
            <a href="/seance-essai">Réserver une séance d’essai</a>
          </Button>
        </CtaBand>
      </main>
      <SiteFooter />
    </>
  )
}
