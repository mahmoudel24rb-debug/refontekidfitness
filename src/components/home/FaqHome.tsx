import React from 'react'
import { ChevronRight } from 'lucide-react'

import Section from '@/components/ksc/Section'
import Container from '@/components/ksc/Container'
import SectionHeading from '@/components/ksc/SectionHeading'
import { Button } from '@/components/ui/button'
import { HOME } from '@/data/home'

// « Questions fréquentes » (accueil) — aperçu de 4 questions, chacune renvoyant
// vers /faq (accordéons réels là-bas). Rangées sobres : la question passe au
// magenta au survol (couleur uniquement), chevron lucide.
export default function FaqHome() {
  const { faqHome } = HOME
  return (
    <Section tone="white">
      <Container className="mx-auto flex max-w-[860px] flex-col gap-8">
        <SectionHeading>
          {faqHome.titreLigne1} {faqHome.titreLigne2}
        </SectionHeading>

        <div className="flex flex-col">
          {faqHome.questions.map((question) => (
            <a
              key={question}
              href="/faq"
              className="group flex items-center justify-between gap-4 border-b border-border py-5"
            >
              <span className="font-heading font-bold text-marine transition-colors group-hover:text-magenta">
                {question}
              </span>
              <ChevronRight className="size-5 shrink-0 text-magenta" aria-hidden="true" />
            </a>
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
