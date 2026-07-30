import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cardInteractive } from '@/components/ui/card'
import { cn } from '@/lib/utils'
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

// Les 2 prestations phares (1re rangée) en cartes larges de la mosaïque.
const WIDE_SLUGS = ['mercredis-sportifs', 'stages-vacances']

const cardLink = cn(
  'group flex flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm',
  cardInteractive
)

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

  // Mosaïque : cartes larges d'abord (rangée 1), puis les autres.
  const larges = prestations.filter((p) => WIDE_SLUGS.includes(p.slug))
  const normales = prestations.filter((p) => !WIDE_SLUGS.includes(p.slug))

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

        {/* Mosaïque image-first */}
        <Section tone="cream">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {[...larges, ...normales].map((p) => {
                const wide = WIDE_SLUGS.includes(p.slug)
                return (
                  <a
                    key={p.slug}
                    href={`/nos-prestations/${p.slug}`}
                    className={cn(cardLink, wide ? 'lg:col-span-3' : 'lg:col-span-2')}
                  >
                    <div className={cn('relative', wide ? 'aspect-[16/9]' : 'aspect-[4/3]')}>
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, calc(100vw - 48px)"
                        className="object-cover"
                      />
                      {/* Overlay dégradé (overlay d'IMAGE) + titre/badge posés sur l'image */}
                      <div className="absolute inset-0 flex flex-col items-start justify-end gap-2.5 bg-gradient-to-t from-marine/80 to-transparent p-5">
                        <Badge variant="ageDark">{p.age}</Badge>
                        <h2 className="font-heading text-2xl font-extrabold leading-tight text-white">{p.titre}</h2>
                      </div>
                    </div>
                    {/* Zone texte : accroche + lien */}
                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <p className="flex-1 leading-relaxed text-muted-foreground">{p.accroche}</p>
                      <span className="inline-flex items-center gap-1.5 font-bold text-magenta">
                        Découvrir
                        <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </Container>
        </Section>

        {/* Fit' Parents/Enfants : moment intégré aux cours, PAS une prestation. */}
        <Section tone="cream">
          <Container>
            <div className="rounded-lg border-l-4 border-magenta bg-cream-2 p-8">
              <h2 className="mb-2.5 font-heading text-xl font-bold text-marine">Fit’ Parents/Enfants, intégré à nos cours</h2>
              <p className="leading-relaxed text-ink">
                Un moment de sport à partager en famille. Parents et enfants bougent ensemble à travers des exercices ludiques et complices, une manière différente de se retrouver, entre jeu et activité physique.
              </p>
            </div>
          </Container>
        </Section>

        <WaveDivider colorTop="var(--ksc-cream)" colorBottom="var(--ksc-marine)" />

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
