import React from 'react'
import Image from 'next/image'
import { Heart, Shield, Smile, Blocks, type LucideIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'
import RoundIcon from './RoundIcon'
import { VALEURS } from '@/data/equipe'
import { getEquipe } from '@/lib/contenu'

const ICONES: Record<string, LucideIcon> = { Heart, Shield, Smile, Blocks }

export default async function QuiSommesNous() {
  const equipe = await getEquipe()
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero : 2 colonnes avec la photo existante de la page */}
        <HeroMarine
          kicker="Qui sommes-nous"
          title="Le club de sport des enfants"
          sub={<>À Rochecorbon, le Kid Sport Club initie les enfants de 10 mois à 14 ans au sport et au mouvement,
            par le jeu, dans un cadre bienveillant et sécurisé.</>}
          image="/assets/ksc/stages-mercredi.webp"
          imageAlt="Enfants en activité au Kid Sport Club"
          badge="10 mois – 14 ans"
          padding="72px 24px 84px"
        />

        {/* Pédagogie — 2 colonnes texte / image (textes du récap client) */}
        <Section tone="cream">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <SectionHeading underline className="mb-5 text-[clamp(26px,3.5vw,36px)]">
                  Notre pédagogie
                </SectionHeading>
                <p className="mb-4 text-lg leading-relaxed text-ink">
                  Kid Sport Club est né de la volonté de proposer aux enfants de 10 mois à 14 ans un espace où le sport devient un vecteur d’épanouissement, de confiance en soi et de socialisation. Installé à Rochecorbon, le club accompagne chaque enfant à son rythme, de la découverte des premiers mouvements jusqu’à une pratique sportive plus structurée à l’adolescence.
                </p>
                <p className="text-lg leading-relaxed text-ink">
                  Notre pédagogie s’appuie sur les principes de la psychomotricité : chaque activité est pensée pour développer la motricité, la coordination et la confiance en soi de l’enfant, dans un cadre ludique et sécurisant. Nous croyons qu’un enfant qui prend plaisir à bouger construit des bases solides pour toute sa vie.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/assets/ksc/esprit-equipe.webp"
                  alt="L’équipe du Kid Sport Club en séance avec les enfants"
                  fill
                  sizes="(min-width: 1024px) 45vw, calc(100vw - 48px)"
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Valeurs — fond blanc */}
        <Section tone="white">
          <Container>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALEURS.map((v) => {
                const Icon = ICONES[v.icone]
                return (
                  <Card key={v.nom} className="items-start gap-3 p-8">
                    <RoundIcon>
                      <Icon size={20} aria-hidden="true" />
                    </RoundIcon>
                    <h3 className="font-heading text-xl font-bold text-marine">{v.nom}</h3>
                    <p className="leading-relaxed text-ink">{v.texte}</p>
                  </Card>
                )
              })}
            </div>
          </Container>
        </Section>

        {/* Équipe — fond crème 2 */}
        <Section tone="cream2">
          <Container>
            <div className="mx-auto mb-9 max-w-[640px] text-center">
              <SectionHeading underline className="mb-3 text-[clamp(24px,3vw,34px)]">
                Notre équipe
              </SectionHeading>
              <p className="text-[17px] text-ink">
                Des animateurs et coachs diplômés, formés à l’encadrement des enfants, qui mettent l’énergie et la bienveillance au cœur de chaque séance.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {equipe.map((c) => (
                <Card key={c.nom} className="items-center gap-3 p-8 text-center">
                  {c.photo ? (
                    <Image
                      src={c.photo}
                      alt={c.photoAlt ?? c.nom}
                      width={64}
                      height={64}
                      className="size-16 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="grid size-16 place-items-center rounded-full bg-marine font-heading text-xl font-bold text-cream"
                    >
                      {c.initiales}
                    </div>
                  )}
                  <h3 className="font-heading text-xl font-bold text-marine">{c.nom}</h3>
                  <p className="text-[15.5px] leading-relaxed text-ink">{c.bio}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <WaveDivider colorTop="var(--ksc-cream2)" colorBottom="var(--ksc-marine)" />

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
