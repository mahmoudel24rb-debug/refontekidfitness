import React from 'react'
import { Baby, Shapes, Medal, Trophy } from 'lucide-react'

import Section from '@/components/ksc/Section'
import Container from '@/components/ksc/Container'
import Kicker from '@/components/ksc/Kicker'
import SectionHeading from '@/components/ksc/SectionHeading'
import RoundIcon from '@/components/ksc/RoundIcon'
import { Badge } from '@/components/ui/badge'
import { cardInteractive } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { HOME } from '@/data/home'

// « Tranches d'âge » — poursuit l'univers marine (après Bienvenue). 4 cartes
// blanches cliquables vers les prestations par âge. Cartes sobres :
// hover = ombre uniquement (cardInteractive), pas de lift ni de zoom.
const ICONS = [Baby, Shapes, Medal, Trophy] as const

export default function TranchesAge() {
  const { tranches } = HOME
  return (
    <Section tone="marine">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Kicker dark>{tranches.kicker}</Kicker>
          <SectionHeading dark>{tranches.titre}</SectionHeading>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tranches.items.map((item, i) => {
            const Icon = ICONS[i] ?? Baby
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm',
                  cardInteractive
                )}
              >
                <RoundIcon className="size-12">
                  <Icon size={22} />
                </RoundIcon>
                <h3 className="font-heading text-lg font-bold text-marine">{item.nom}</h3>
                <Badge variant="age">{item.age}</Badge>
                <p className="text-[15px] leading-[1.55] text-ink/75">{item.texte}</p>
              </a>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outlineCream">
            <a href={tranches.cta.href}>{tranches.cta.label}</a>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
