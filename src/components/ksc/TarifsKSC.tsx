import React from 'react'
import { CalendarDays, Check, CreditCard, Layers2, Layers3, Sun, Zap } from 'lucide-react'

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
import Kicker from './Kicker'
import Underline from './Underline'
import { getTarifs, type TarifVue } from '@/lib/contenu'
import type { IconeTarif } from '@/data/tarifs'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

// Cartes de formule : structure du composant Untitled UI « PricingSimpleIcon »
// fourni par le client (en-tête de section aligné à gauche, puis grille de
// cartes icône / titre / prix / description / liste d'avantages / CTA en pied),
// transposée aux tokens KSC — Card shadcn maison, coches magenta du motif de
// Prestation.tsx, CTA « S'inscrire » existant, badge « La plus choisie ».
//
// Retour client n5 : la page ne sépare plus abonnements et prestations mais
// formules PRIORITAIRES (champ `prioritaire` : 1 cours / semaine, Illimité,
// Mercredis Sportifs, Stages vacances), en cartes complètes, et « autres
// formules », en lignes compactes d'emprise nettement moindre.

const ICONES: Record<IconeTarif, React.ComponentType<{ className?: string }>> = {
  zap: Zap,
  layers2: Layers2,
  layers3: Layers3,
  carte: CreditCard,
  calendrier: CalendarDays,
  vacances: Sun,
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

/** Une carte de formule prioritaire. */
function CarteTarif({ tarif, className }: { tarif: TarifVue; className?: string }) {
  const featured = tarif.enAvant
  return (
    <Card
      className={cn(
        // Pas de hauteur explicite : la grille étire déjà les cartes d'une même
        // rangée (align-items: stretch), ce qui les égalise deux à deux.
        'items-start gap-0 p-7',
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
      {/* 30px : à 4 colonnes, « 29,90 €/mois » tient encore sur une ligne. */}
      <p className="mt-2 font-heading text-[30px] font-extrabold leading-[1.15] text-magenta">
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
      {/* CTA en pied de carte : `mt-auto` aligne les boutons sur la même ligne,
          quelle que soit la longueur des listes d'avantages. */}
      <div className="mt-auto w-full pt-8">
        <InscriptionCTA className="w-full" />
      </div>
    </Card>
  )
}

export default async function TarifsKSC() {
  const tarifs = await getTarifs()
  // Abonnements et prestations sont réunis : c'est le champ `prioritaire` qui
  // décide du rendu, et non le type. L'ordre d'affichage est celui des données
  // (1 cours / semaine, Illimité, puis Mercredis Sportifs, Stages vacances).
  const tous = [...tarifs.abonnements, ...tarifs.prestations]
  const prioritaires = tous.filter((t) => t.prioritaire)
  const autres = tous.filter((t) => !t.prioritaire)
  // Product/Offer par formule : le prix numérique s'extrait proprement des
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
    ...tous
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

        {/* Nos formules : en-tête de section aligné à gauche puis grille de
            cartes complètes (les 4 formules prioritaires). */}
        <Section tone="cream">
          <Container>
            <div className="flex w-full max-w-3xl flex-col">
              <Kicker>Nos formules</Kicker>
              <SectionHeading className="mt-3">Une formule par rythme</SectionHeading>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:mt-5">
                Un cours par semaine ou tous les cours de la tranche d’âge, avec ou sans
                engagement. Dans tous les cas, la première séance d’essai est gratuite.
              </p>
            </div>
            {/* 1 colonne en mobile, 2 dès sm, 4 en xl : avec 4 formules, les
                rangées sont toujours pleines (2 + 2, puis 4 sur une ligne).
                Pas d'overflow-hidden ici : le badge « La plus choisie »
                déborde en haut de sa carte. */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
              {prioritaires.map((t) => (
                <CarteTarif key={t.titre} tarif={t} />
              ))}
            </div>
          </Container>
        </Section>

        {/* Autres formules, fond blanc : lignes compactes, ni pastille, ni
            liste d'avantages, un simple lien d'inscription. */}
        <Section tone="white">
          <Container>
            <SectionHeading underline className="mb-8 text-[clamp(24px,3vw,32px)]">
              Autres formules
            </SectionHeading>
            <ul className="flex flex-col gap-3">
              {autres.map((t) => (
                <li
                  key={t.titre}
                  className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-lg border border-border bg-card p-5 shadow-sm"
                >
                  <div className="min-w-0">
                    <h3 className="font-heading text-lg font-bold text-marine">{t.titre}</h3>
                    <p className="text-[14px] text-muted-foreground">{t.detail}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <p className="font-heading text-xl font-extrabold text-magenta">{t.prix}</p>
                    <InscriptionCTA variant="outline" size="sm" />
                  </div>
                </li>
              ))}
            </ul>
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
