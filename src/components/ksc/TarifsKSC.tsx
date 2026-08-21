import React from 'react'
import { Check, CreditCard, Layers2, Layers3, Zap } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { classesCarte } from '@/lib/grilleCartes'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import Kicker from './Kicker'
import Underline from './Underline'
import { getTarifs, type TarifVue } from '@/lib/contenu'
import type { IconeTarif } from '@/data/tarifs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

// Cartes d'abonnement : structure du composant Untitled UI « PricingSimpleIcon »
// fourni par le client (en-tête de section aligné à gauche, puis grille de
// cartes icône / titre / prix / description / liste d'avantages / CTA en pied),
// transposée aux tokens KSC — Card shadcn maison, coches magenta du motif de
// Prestation.tsx, CTA « S'inscrire » existant, badge « La plus choisie ».

const ICONES: Record<IconeTarif, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  layers2: Layers2,
  layers3: Layers3,
  carte: CreditCard,
}

function PastilleIcone({ icone }: { icone?: IconeTarif }) {
  const Icone = ICONES[icone ?? 'zap']
  return (
    <span
      aria-hidden="true"
      className="grid size-12 shrink-0 place-items-center rounded-full bg-magenta/10 text-magenta"
    >
      <Icone className="size-6" />
    </span>
  )
}

/** Une carte d'abonnement. */
function CarteTarif({ tarif, className }: { tarif: TarifVue; className?: string }) {
  const featured = tarif.enAvant
  return (
    <Card
      className={cn(
        'h-full items-start gap-0 p-7',
        featured && 'relative overflow-visible border-2 border-magenta',
        className,
      )}
    >
      {featured && (
        // Badge à cheval sur le bord haut (décoratif absolu autorisé).
        <Badge variant="brand" className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          La plus choisie
        </Badge>
      )}
      <PastilleIcone icone={tarif.icone} />
      <h3 className="mt-5 font-heading text-lg font-bold leading-snug text-marine">{tarif.titre}</h3>
      <p className="mt-2 font-heading text-[38px] font-extrabold leading-[1.15] text-magenta">
        {tarif.prix}
      </p>
      <p className="mt-1.5 text-[15px] leading-snug text-muted-foreground">{tarif.detail}</p>
      {tarif.avantages.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3.5">
          {tarif.avantages.map((a) => (
            <li key={a} className="flex items-start gap-3 text-[15px] leading-snug text-ink">
              <span className="mt-px grid size-[22px] shrink-0 place-items-center rounded-full bg-magenta text-white">
                <Check className="size-3" strokeWidth={3.5} aria-hidden="true" />
              </span>
              {a}
            </li>
          ))}
        </ul>
      )}
      {/* CTA en pied de carte : `mt-auto` aligne les 5 boutons sur la même
          ligne, quelle que soit la longueur des listes d'avantages. */}
      <div className="mt-auto w-full pt-8">
        <InscriptionCTA className="w-full" />
      </div>
    </Card>
  )
}

export default async function TarifsKSC() {
  const tarifs = await getTarifs()
  // Product/Offer par abonnement : le prix numérique s'extrait proprement des
  // libellés (« 29,90 €/mois » -> 29.90), on peut donc enrichir le JSON-LD
  // au-delà du fil d'Ariane.
  const prixNumerique = (prix: string) => {
    const m = prix.match(/(\d+(?:[.,]\d+)?)\s*€/)
    return m ? m[1].replace(',', '.') : null
  }
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Tarifs', item: `${SITE}/tarifs` },
      ],
    },
    ...tarifs.abonnements
      .map((t) => {
        const prix = prixNumerique(t.prix)
        if (!prix) return null
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: `Kid Sport Club — ${t.titre}`,
          description: t.detail,
          brand: { '@type': 'Brand', name: 'Kid Sport Club' },
          offers: {
            '@type': 'Offer',
            price: prix,
            priceCurrency: 'EUR',
            url: `${SITE}/tarifs`,
            availability: 'https://schema.org/InStock',
          },
        }
      })
      .filter(Boolean),
  ]
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

        {/* Abonnements — en-tête de section aligné à gauche puis grille 1/2/3 */}
        <Section tone="cream">
          <Container>
            <div className="flex w-full max-w-3xl flex-col">
              <Kicker>Abonnements</Kicker>
              <SectionHeading className="mt-3">Une formule par rythme</SectionHeading>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:mt-5">
                Un cours par semaine ou tous les cours de la tranche d’âge, avec ou sans
                engagement. Dans tous les cas, la première séance d’essai est gratuite.
              </p>
            </div>
            {/* Flux centré : 5 cartes -> 3 + 2 CENTRÉES en desktop, 2 + 2 + 1
                centrée en tablette, jamais de case vide en bout de rangée. La
                base Untitled passe à 3 colonnes en xl (1280) ; le conteneur KSC
                plafonne à 1200px, la bascule est donc avancée à lg (1024),
                sinon un écran 1536 en zoom 125 % (1229 px CSS) resterait à
                2 colonnes. Pas d'overflow-hidden ici : le badge « La plus
                choisie » déborde en haut de sa carte. */}
            <div className="mt-12 flex w-full flex-wrap justify-center gap-6 lg:mt-16">
              {tarifs.abonnements.map((t) => (
                <CarteTarif
                  key={t.titre}
                  tarif={t}
                  className={classesCarte(tarifs.abonnements.length, 3, 6)}
                />
              ))}
            </div>
          </Container>
        </Section>

        {/* Prestations — fond blanc, 3 lignes (style LandingTarifs) */}
        <Section tone="white">
          <Container>
            <SectionHeading underline className="mb-8 text-[clamp(24px,3vw,32px)]">
              Prestations
            </SectionHeading>
            <div className="flex flex-col gap-3">
              {tarifs.prestations.map((t) => (
                <div
                  key={t.titre}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-5 shadow-sm"
                >
                  <div>
                    <h3 className="font-heading text-lg font-bold text-marine">{t.titre}</h3>
                    <p className="text-[14px] text-muted-foreground">{t.detail}</p>
                  </div>
                  <p className="font-heading text-xl font-extrabold text-magenta">{t.prix}</p>
                </div>
              ))}
            </div>
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
