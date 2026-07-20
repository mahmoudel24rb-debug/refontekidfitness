import React from 'react'
import Image from 'next/image'

import Section from '@/components/ksc/Section'
import Container from '@/components/ksc/Container'
import TerrainLines from '@/components/ksc/TerrainLines'
import { Button } from '@/components/ui/button'
import { HOME } from '@/data/home'

// Bloc « Bienvenue au Kid Sport Club ! » — section marine (signature
// TerrainLines), visuel esprit d'équipe + accroche et lien « En savoir plus ».
export default function Bienvenue() {
  const { bienvenue } = HOME
  return (
    <Section tone="marine">
      <TerrainLines />
      <Container className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Image
          src={bienvenue.image.src}
          alt={bienvenue.image.alt}
          width={1200}
          height={801}
          sizes="(min-width:1024px) 45vw, 90vw"
          className="h-auto w-full rounded-xl object-cover shadow-md"
        />

        <div className="flex flex-col items-start gap-6">
          <h2 className="font-heading text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-cream">
            <span className="block">{bienvenue.titreLigne1}</span>
            <span className="block">{bienvenue.titreLigne2}</span>
          </h2>
          <p className="max-w-[520px] text-[17px] leading-[1.7] text-cream/85">{bienvenue.texte}</p>
          <Button asChild variant="light">
            <a href={bienvenue.cta.href}>{bienvenue.cta.label}</a>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
