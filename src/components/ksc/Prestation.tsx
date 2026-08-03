import React from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, cardInteractive } from '@/components/ui/card'
import { cn, slugifie } from '@/lib/utils'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import TerrainLines from './TerrainLines'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import Underline from './Underline'
import LeadForm from './LeadForm'
import { creneauxPourPrestation } from '@/data/creneaux'
import { getPlanningPlat, getPrestations } from '@/lib/contenu'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

const cardLink = cn(
  'group overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm',
  cardInteractive
)

// Rend « voir le planning » cliquable (lien /planning) dans le bloc Créneaux.
function Creneaux({ texte }: { texte: string }) {
  const marqueur = 'voir le planning'
  const i = texte.indexOf(marqueur)
  if (i === -1) return <>{texte}</>
  return (
    <>
      {texte.slice(0, i)}
      <a href="/planning" className="font-bold text-magenta underline-offset-4 hover:underline">voir le planning</a>
      {texte.slice(i + marqueur.length)}
    </>
  )
}

export default async function Prestation({ slug }: { slug: string }) {
  const [prestations, planning] = await Promise.all([getPrestations(), getPlanningPlat()])
  const p = prestations.find((x) => x.slug === slug)
  if (!p) return null
  const autres = prestations.filter((x) => x.slug !== slug).slice(0, 3)
  const creneaux = creneauxPourPrestation(slug, planning)
  const estCours614 = slug === 'cours-6-10-ans' || slug === 'cours-11-14-ans'

  // Données structurées : fil d'Ariane + service local (SEO Rochecorbon).
  // NB : un schéma Event (stages/anniversaire) sera ajouté quand le client fournira des dates réelles.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos activités', item: `${SITE}/nos-prestations` },
          { '@type': 'ListItem', position: 3, name: p.titre, item: `${SITE}/nos-prestations/${p.slug}` },
        ],
      },
      {
        '@type': 'Service',
        name: `${p.titre}, Kid Sport Club`,
        serviceType: p.motCle,
        description: p.intro,
        url: `${SITE}/nos-prestations/${p.slug}`,
        areaServed: { '@type': 'City', name: 'Rochecorbon' },
        provider: {
          '@type': 'SportsActivityLocation',
          name: 'Kid Sport Club',
          telephone: '+33247444143',
          address: { '@type': 'PostalAddress', streetAddress: '1 Quai de la Loire', postalCode: '37210', addressLocality: 'Rochecorbon', addressCountry: 'FR' },
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>
        {/* Hero : 2 colonnes, photo de la prestation + badge d'âge sur l'image */}
        <HeroMarine
          kicker="Nos activités"
          title={p.titre}
          sub={p.accroche}
          image={p.image}
          imageAlt={p.titre}
          badge={p.age}
          padding="72px 24px 128px"
        >
          <InscriptionCTA />
          <Button asChild variant="outlineCream">
            <a href="/seance-essai">Séance d’essai</a>
          </Button>
        </HeroMarine>

        {/* Carte chevauchante (« pull-up card ») : Le principe / Les bénéfices. */}
        <div className="px-6">
          <Card className="relative z-10 mx-auto -mt-14 max-w-[1200px] gap-0 p-[clamp(28px,4vw,48px)] shadow-md">
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
              <div>
                <h2 className="mb-[18px] font-heading text-[28px] font-extrabold text-marine">Le <Underline>principe</Underline></h2>
                <p className="text-[17px] leading-relaxed text-ink">{p.intro}</p>
              </div>
              <div>
                <h2 className="mb-[18px] font-heading text-[28px] font-extrabold text-marine">Les <Underline>bénéfices</Underline></h2>
                <ul className="flex flex-col gap-4">
                  {p.benefices.map((b) => (
                    <li key={b} className="flex items-start gap-3.5 text-[17px] leading-snug text-ink">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-magenta text-white">
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bloc Tarif : carte marine, prix display, TerrainLines discret, CTA magenta */}
            <div className="relative mt-[clamp(32px,4vw,44px)] overflow-hidden rounded-lg bg-marine p-6 text-cream">
              <TerrainLines opacity={0.05} />
              <div className="relative flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
                <div>
                  <p className="font-bold text-cream/80">Tarif</p>
                  <p className="mt-1.5 font-heading text-[clamp(30px,3.4vw,38px)] font-extrabold leading-[1.15]">{p.prix}</p>
                  <p className="mt-2.5 text-sm">
                    <a href="/tarifs" className="text-cream underline underline-offset-[3px]">Voir tous les tarifs</a>
                  </p>
                </div>
                <InscriptionCTA />
              </div>
            </div>
          </Card>
        </div>

        {/* Les activités de la tranche d'âge (4 fiches cours uniquement).
            Chaque bloc porte l'ancre visée par le sous-menu et les chips du hub. */}
        {p.disciplines && p.disciplines.length > 0 && (
          <Section tone="white" className="mt-[70px]">
            <Container className="max-w-[1100px]">
              <SectionHeading underline className="mb-3 text-center text-[26px]">Les activités</SectionHeading>
              <p className="mx-auto mb-9 max-w-[620px] text-center text-muted-foreground">
                Ce que votre enfant pratique au fil des séances de cette tranche d’âge.
              </p>
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {p.disciplines.map((d) => (
                  <div key={d.nom} id={slugifie(d.nom)} className="scroll-mt-24">
                    <h3 className="mb-2 font-heading text-xl font-bold text-marine">{d.nom}</h3>
                    <p className="leading-relaxed text-ink">{d.description}</p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* Réserver : demande de place directement sur la fiche (LeadForm). */}
        <Section tone="cream" id="reserver" className="mt-[70px] scroll-mt-6">
          <Container className="max-w-[1100px]">
            <SectionHeading underline className="mb-3 text-center text-[26px]">Réserver</SectionHeading>
            <p className="mx-auto mb-9 max-w-[560px] text-center text-muted-foreground">
              Laissez-nous vos coordonnées : notre équipe vous recontacte pour organiser la venue de votre enfant.
            </p>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Rappel prix + créneaux / lien planning */}
              <div className="rounded-lg border border-border bg-cream p-6 lg:p-8">
                <p className="text-sm font-bold uppercase tracking-[.04em] text-magenta">Tarif</p>
                <p className="mt-1 font-heading text-[clamp(26px,3vw,32px)] font-extrabold text-marine">{p.prix}</p>
                <p className="mt-1.5 text-sm">
                  <a href="/tarifs" className="font-bold text-magenta underline-offset-4 hover:underline">Voir tous les tarifs</a>
                </p>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="font-bold text-marine">Créneaux</p>
                  <p className="mt-1.5 text-muted-foreground"><Creneaux texte={p.creneaux} /></p>
                </div>
              </div>
              {/* Formulaire de demande */}
              <div>
                {estCours614 && (
                  <p className="mb-3 inline-flex rounded-full bg-cream-2 px-3.5 py-1.5 text-sm font-bold text-marine">
                    Créneaux 6-14 ans
                  </p>
                )}
                <LeadForm
                  source={`prestation-${slug}`}
                  landing={slug}
                  withEmail
                  creneaux={creneaux}
                  ctaLabel="Demander une place"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Autres prestations (maillage interne) */}
        <Section tone="cream2" className="mt-[70px]">
          <Container>
            <SectionHeading underline className="mb-7 text-center text-[26px]">Découvrez aussi</SectionHeading>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((a) => (
                <a key={a.slug} href={`/nos-prestations/${a.slug}`} className={cn(cardLink, 'flex flex-col p-6')}>
                  <h3 className="mb-2 font-heading text-[19px] font-bold text-marine">{a.titre}</h3>
                  <p className="mb-3.5 flex-1 text-[15px] leading-snug text-muted-foreground">{a.accroche}</p>
                  <span className="inline-flex items-center gap-1.5 font-bold text-magenta">
                    Découvrir
                    <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-9 text-center">
              <Link href="/nos-prestations" className="font-bold text-marine underline underline-offset-[3px]">Voir toutes nos prestations</Link>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
