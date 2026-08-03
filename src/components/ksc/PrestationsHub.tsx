import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, slugifie } from '@/lib/utils'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Section from './Section'
import Container from './Container'
import Underline from './Underline'
import { getPrestations } from '@/lib/contenu'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export default async function PrestationsHub() {
  const prestations = await getPrestations()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos activités', item: `${SITE}/nos-prestations` },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: prestations.map((p, i) => ({
          '@type': 'ListItem', position: i + 1, name: p.titre, url: `${SITE}/nos-prestations/${p.slug}`,
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main>
        <HeroMarine
          kicker="Nos activités"
          title="Le sport des enfants, sous toutes ses formes"
          sub={<>De la baby gym dès 10 mois au sport ado, en passant par les mercredis sportifs, les stages et les anniversaires :
            au Kid Sport Club de Rochecorbon, chaque enfant trouve son activité.</>}
        />

        {/* Une section détaillée par activité, image et texte alternés.
            Fonds crème / crème 2 en alternance pour rythmer la lecture. */}
        {prestations.map((p, i) => {
          const inverse = i % 2 === 1
          return (
            <Section key={p.slug} tone={inverse ? 'cream2' : 'cream'} id={p.slug} className="scroll-mt-24">
              <Container>
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  {/* Image grand format, côté alterné en desktop */}
                  <div
                    className={cn(
                      'relative aspect-[4/3] overflow-hidden rounded-lg shadow-md',
                      inverse && 'lg:order-2',
                    )}
                  >
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 46vw, calc(100vw - 48px)"
                      className="object-cover"
                    />
                  </div>

                  {/* Colonne texte : badge âge, titre, intro, bénéfices, prix, CTA */}
                  <div className={cn(inverse && 'lg:order-1')}>
                    <Badge variant="age">{p.age}</Badge>
                    <h2 className="mt-3.5 font-heading text-[clamp(26px,3.4vw,34px)] font-extrabold leading-tight text-marine">
                      {p.titre}
                    </h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-ink">{p.intro}</p>

                    <ul className="mt-6 flex flex-col gap-3">
                      {p.benefices.map((b) => (
                        <li key={b} className="flex items-start gap-3.5 text-[16.5px] leading-snug text-ink">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-magenta text-white">
                            <Check size={13} strokeWidth={3} aria-hidden="true" />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* Les activités de la tranche : raccourcis vers les ancres
                        de la fiche (uniquement les 4 cours par âge). */}
                    {p.disciplines && p.disciplines.length > 0 && (
                      <div className="mt-6">
                        <p className="mb-2.5 text-sm font-bold uppercase tracking-[.04em] text-marine">
                          Au programme
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {p.disciplines.map((d) => (
                            <li key={d.nom}>
                              <a
                                href={`/nos-prestations/${p.slug}#${slugifie(d.nom)}`}
                                className="inline-flex rounded-full border border-border bg-white px-3.5 py-1.5 text-[13px] font-bold text-marine transition-colors hover:border-magenta hover:text-magenta"
                              >
                                {d.nom}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="mt-6 font-heading text-[clamp(22px,2.6vw,26px)] font-extrabold text-magenta">
                      {p.prix}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3.5">
                      <Button asChild variant="primary">
                        <a href={`/nos-prestations/${p.slug}`}>Voir la fiche</a>
                      </Button>
                      <InscriptionCTA variant="outline" />
                    </div>
                  </div>
                </div>
              </Container>
            </Section>
          )
        })}

        {/* Fit' Parents/Enfants : moment intégré aux cours, PAS une prestation. */}
        <Section tone={prestations.length % 2 === 1 ? 'cream2' : 'cream'}>
          <Container>
            <div className="rounded-lg border-l-4 border-magenta bg-white p-8">
              <h2 className="mb-2.5 font-heading text-xl font-bold text-marine">Fit’ Parents/Enfants, intégré à nos cours</h2>
              <p className="leading-relaxed text-ink">
                Un moment de sport à partager en famille. Parents et enfants bougent ensemble à travers des exercices ludiques et complices, une manière différente de se retrouver, entre jeu et activité physique.
              </p>
            </div>
          </Container>
        </Section>

        <WaveDivider
          colorTop={prestations.length % 2 === 1 ? 'var(--ksc-cream2)' : 'var(--ksc-cream)'}
          colorBottom="var(--ksc-marine)"
        />

        {/* Bande CTA pré-footer (textes existants de la page) */}
        <CtaBand
          title={<>Prêt à inscrire votre <Underline>enfant&nbsp;?</Underline></>}
          sub="Première séance d’essai pour découvrir le club."
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
