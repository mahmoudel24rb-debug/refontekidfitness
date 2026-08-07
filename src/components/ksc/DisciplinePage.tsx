import React from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

// Page d'une activité de tranche d'âge : /nos-prestations/[cours]/[activite].
// Le prix, les créneaux et la photo sont ceux du COURS parent (une activité
// n'a pas de tarif propre) : la page ne fait qu'en détailler le contenu.
// Contenus servis par Payload avec repli champ par champ sur src/data — les
// blocs dont le champ est vide des deux côtés ne sont tout simplement pas rendus.
export default async function DisciplinePage({
  slug,
  discipline,
}: {
  slug: string
  discipline: string
}) {
  const [prestations, planning] = await Promise.all([getPrestations(), getPlanningPlat()])
  const p = prestations.find((x) => x.slug === slug)
  const d = p?.disciplines?.find((x) => x.slug === discipline)
  if (!p || !d) return null

  const autres = (p.disciplines ?? []).filter((x) => x.slug !== d.slug)
  const creneaux = creneauxPourPrestation(p.slug, planning)
  const estCours614 = p.slug === 'cours-6-10-ans' || p.slug === 'cours-11-14-ans'
  const url = `${SITE}/nos-prestations/${p.slug}/${d.slug}`

  // Fil d'Ariane à 4 niveaux + service local (SEO Rochecorbon).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos activités', item: `${SITE}/nos-prestations` },
          { '@type': 'ListItem', position: 3, name: p.titre, item: `${SITE}/nos-prestations/${p.slug}` },
          { '@type': 'ListItem', position: 4, name: d.nom, item: url },
        ],
      },
      {
        '@type': 'Service',
        name: `${d.nom}, Kid Sport Club`,
        serviceType: p.motCle,
        description: d.accroche,
        url,
        audience: { '@type': 'PeopleAudience', suggestedMinAge: 0, name: p.age },
        areaServed: { '@type': 'City', name: 'Rochecorbon' },
        isPartOf: { '@type': 'Service', name: `${p.titre}, Kid Sport Club`, url: `${SITE}/nos-prestations/${p.slug}` },
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
        {/* Hero : le kicker fait office de retour vers la fiche du cours. */}
        <HeroMarine
          kicker={
            <a
              href={`/nos-prestations/${p.slug}`}
              className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              {p.titre}
            </a>
          }
          title={d.nom}
          sub={d.accroche}
          image={p.image}
          imageAlt={p.titre}
          badge={p.age}
          padding="72px 24px 128px"
        >
          <InscriptionCTA />
          <Button asChild variant="outlineCream">
            <a href="#reserver">Demander une place</a>
          </Button>
        </HeroMarine>

        {/* Carte chevauchante : la présentation détaillée + les bénéfices. */}
        <div className="px-6">
          <Card className="relative z-10 mx-auto -mt-14 max-w-[1200px] gap-0 p-[clamp(28px,4vw,48px)] shadow-md">
            <div className="grid gap-x-14 gap-y-10 lg:grid-cols-2">
              {d.intro.length > 0 && (
                <div>
                  <h2 className="mb-[18px] font-heading text-[28px] font-extrabold text-marine">
                    La <Underline>séance</Underline>
                  </h2>
                  <div className="flex flex-col gap-4">
                    {d.intro.map((paragraphe) => (
                      <p key={paragraphe} className="text-[17px] leading-relaxed text-ink">{paragraphe}</p>
                    ))}
                  </div>
                </div>
              )}
              {d.benefices.length > 0 && (
                <div>
                  <h2 className="mb-[18px] font-heading text-[28px] font-extrabold text-marine">
                    Les <Underline>bénéfices</Underline>
                  </h2>
                  <ul className="flex flex-col gap-4">
                    {d.benefices.map((b) => (
                      <li key={b} className="flex items-start gap-3.5 text-[17px] leading-snug text-ink">
                        <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-magenta text-white">
                          <Check size={14} strokeWidth={3} aria-hidden="true" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {d.pourQui && (
              <div className="relative mt-[clamp(32px,4vw,44px)] overflow-hidden rounded-lg bg-marine p-6 text-cream lg:p-8">
                <TerrainLines opacity={0.05} />
                <div className="relative max-w-[860px]">
                  <h2 className="mb-2.5 font-heading text-[22px] font-extrabold text-cream">Pour qui&nbsp;?</h2>
                  <p className="text-[17px] leading-relaxed text-cream/85">{d.pourQui}</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Réserver : rappel du tarif du cours parent + formulaire. */}
        <Section tone="cream" id="reserver" className="mt-[70px] scroll-mt-6">
          <Container className="max-w-[1100px]">
            <SectionHeading underline className="mb-3 text-center text-[26px]">Réserver</SectionHeading>
            <p className="mx-auto mb-9 max-w-[600px] text-center text-muted-foreground">
              {d.nom} fait partie du cours {p.titre}. Laissez-nous vos coordonnées : notre équipe vous
              recontacte pour organiser la venue de votre enfant.
            </p>
            <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="rounded-lg border border-border bg-cream p-6 lg:p-8">
                <p className="text-sm font-bold uppercase tracking-[.04em] text-magenta">
                  Tarif du cours {p.titre}
                </p>
                <p className="mt-1 font-heading text-[clamp(26px,3vw,32px)] font-extrabold text-marine">{p.prix}</p>
                <p className="mt-1.5 text-sm">
                  <a href="/tarifs" className="font-bold text-magenta underline-offset-4 hover:underline">Voir tous les tarifs</a>
                </p>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="font-bold text-marine">Créneaux</p>
                  <p className="mt-1.5 text-muted-foreground">
                    Les horaires de {d.nom} figurent au{' '}
                    <a href="/planning" className="font-bold text-magenta underline-offset-4 hover:underline">planning de la semaine</a>.
                  </p>
                </div>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="font-bold text-marine">La fiche du cours</p>
                  <p className="mt-1.5 text-muted-foreground">
                    <a
                      href={`/nos-prestations/${p.slug}`}
                      className="font-bold text-magenta underline-offset-4 hover:underline"
                    >
                      {p.titre} ({p.age})
                    </a>{' '}
                    : le principe, les bénéfices et toutes les activités de la tranche.
                  </p>
                </div>
              </div>
              <div>
                {estCours614 && (
                  <p className="mb-3 inline-flex rounded-full bg-cream-2 px-3.5 py-1.5 text-sm font-bold text-marine">
                    Créneaux 6-14 ans
                  </p>
                )}
                <LeadForm
                  source={`activite-${p.slug}-${d.slug}`}
                  landing={p.slug}
                  withEmail
                  creneaux={creneaux}
                  ctaLabel="Demander une place"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Maillage : les autres activités de la même tranche d'âge. */}
        {autres.length > 0 && (
          <Section tone="cream2" className="mt-[70px]">
            <Container className="max-w-[1100px]">
              <SectionHeading underline className="mb-3 text-center text-[26px]">
                Les autres activités
              </SectionHeading>
              <p className="mx-auto mb-7 max-w-[620px] text-center text-muted-foreground">
                Toujours dans le cours {p.titre}, {p.age}.
              </p>
              <ul className="flex flex-wrap justify-center gap-2.5">
                {autres.map((a) => (
                  <li key={a.slug}>
                    <a
                      href={`/nos-prestations/${p.slug}/${a.slug}`}
                      className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-[14px] font-bold text-marine transition-colors hover:border-magenta hover:text-magenta"
                    >
                      {a.nom}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <Button asChild variant="outline">
                  <a href="/seance-essai">Réserver une séance d’essai</a>
                </Button>
                <Link
                  href={`/nos-prestations/${p.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-marine underline underline-offset-[3px]"
                >
                  Revenir à la fiche {p.titre}
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </Container>
          </Section>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
