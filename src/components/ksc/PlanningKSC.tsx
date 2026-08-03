import React from 'react'

import { Button } from '@/components/ui/button'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Section from './Section'
import Container from './Container'
import PlanningCalendarKSC from './PlanningCalendarKSC'
import { getPlanningPlat } from '@/lib/contenu'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export default async function PlanningKSC() {
  const creneaux = await getPlanningPlat()
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

        <Section tone="cream" className="overflow-visible">
          <Container>
            {/* Calendrier de la semaine : 6 colonnes, tri par heure, couleurs
                par tranche d'âge (le rendu détaillé vit dans son composant). */}
            <PlanningCalendarKSC creneaux={creneaux} />
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
