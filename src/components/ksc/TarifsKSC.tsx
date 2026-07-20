import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import Underline from './Underline'
import { ABONNEMENTS, PRESTATIONS_TARIFS, FEATURED_TITRE, type Tarif } from '@/data/tarifs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

function Groupe({ heading, items }: { heading: string; items: Tarif[] }) {
  return (
    <div>
      <SectionHeading underline className="mb-8 text-[clamp(24px,3vw,32px)]">
        {heading}
      </SectionHeading>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => {
          const featured = t.titre === FEATURED_TITRE
          return (
            <Card
              key={t.titre}
              className={cn(
                'items-start gap-3 p-7',
                featured &&
                  'relative overflow-visible border-2 border-magenta lg:scale-[1.03]'
              )}
            >
              {featured && (
                // Badge à cheval sur le bord haut (décoratif absolu autorisé).
                <Badge
                  variant="brand"
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2"
                >
                  La plus choisie
                </Badge>
              )}
              <h3 className="font-heading text-lg font-bold leading-snug text-marine">
                {t.titre}
              </h3>
              <p className="font-heading text-[38px] font-extrabold leading-[1.15] text-magenta">
                {t.prix}
              </p>
              <span className="rounded-full bg-cream-2 px-3.5 py-1.5 text-[13px] font-semibold leading-snug text-muted-foreground">
                {t.detail}
              </span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default function TarifsKSC() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Tarifs', item: `${SITE}/tarifs` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>
        <HeroMarine
          kicker="Tarifs"
          title="Nos tarifs, en toute transparence"
          sub="Abonnements aux cours et prestations du Kid Sport Club de Rochecorbon. Une première séance d’essai pour découvrir le club."
          padding="72px 24px"
        />

        {/* Abonnements — fond crème */}
        <Section tone="cream">
          <Container>
            <Groupe heading="Abonnements" items={ABONNEMENTS} />
          </Container>
        </Section>

        {/* Prestations — fond blanc */}
        <Section tone="white">
          <Container>
            <Groupe heading="Prestations" items={PRESTATIONS_TARIFS} />
            <p className="mt-7 text-sm italic text-muted-foreground">
              Les réservations en ligne sont confirmées par notre équipe.
            </p>
          </Container>
        </Section>

        <WaveDivider colorTop="var(--card)" colorBottom="var(--ksc-marine)" />

        {/* Bande CTA pré-footer (textes existants de la page) */}
        <CtaBand
          title={<>Prêt à inscrire votre <Underline>enfant&nbsp;?</Underline></>}
          sub="Rejoignez le club ou venez d’abord tester une séance."
        >
          <InscriptionCTA />
          <Button asChild variant="outlineCream">
            <a href="/seance-essai">Réserver une séance d’essai</a>
          </Button>
        </CtaBand>
      </main>
      <SiteFooter />
    </>
  )
}
