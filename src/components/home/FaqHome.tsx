import React from 'react'
import { Plus } from 'lucide-react'

import Section from '@/components/ksc/Section'
import Container from '@/components/ksc/Container'
import SectionHeading from '@/components/ksc/SectionHeading'
import { Reponse } from '@/components/ksc/Faq'
import { Button } from '@/components/ui/button'
import { HOME } from '@/data/home'
import { faqParQuestions, getFaq } from '@/lib/contenu'

// « Questions fréquentes » (accueil) — accordéon : la réponse s'ouvre sous la
// question sans quitter la page (même mécanique details/summary que /faq).
// Les réponses viennent de data/faq.ts (source unique de la page FAQ) ; le CTA
// « Toutes les questions » reste le chemin vers la FAQ complète.
export default async function FaqHome() {
  const { faqHome } = HOME
  const items = faqParQuestions(await getFaq(), faqHome.questions)
  return (
    <Section tone="white">
      <Container className="mx-auto flex max-w-[860px] flex-col gap-8">
        <SectionHeading>
          {faqHome.titreLigne1} {faqHome.titreLigne2}
        </SectionHeading>

        <div className="flex flex-col">
          {items.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading font-bold text-marine transition-colors hover:text-magenta [&::-webkit-details-marker]:hidden">
                {f.q}
                {/* Icône « + » qui pivote en « × » à l'ouverture (details[open]). */}
                <Plus aria-hidden="true" className="size-[18px] shrink-0 text-magenta transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 leading-relaxed text-ink"><Reponse item={f} /></p>
            </details>
          ))}
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <a href={faqHome.cta.href}>{faqHome.cta.label}</a>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
