import React from 'react'
import { Plus } from 'lucide-react'

import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import { Button } from '@/components/ui/button'

import { FAQ, type FaqItem } from '@/data/faq'

// Rend « page tarifs » cliquable (lien /tarifs) — le JSON-LD garde le texte brut.
function Reponse({ item }: { item: FaqItem }) {
  const marqueur = 'page tarifs'
  const i = item.lienTarifs ? item.r.indexOf(marqueur) : -1
  if (i === -1) return <>{item.r}</>
  return (
    <>
      {item.r.slice(0, i)}
      <a href="/tarifs" className="font-bold text-magenta hover:text-magenta-hover">page tarifs</a>
      {item.r.slice(i + marqueur.length)}
    </>
  )
}

export default function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
  }
  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="bg-cream text-ink">
        <HeroMarine kicker="FAQ" title="Vos questions, nos réponses" padding="72px 24px" />

        <section className="mx-auto max-w-[820px] px-6 pt-14 pb-[70px]">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 font-heading text-[19px] font-bold text-marine [&::-webkit-details-marker]:hidden">
                {f.q}
                {/* Icône « + » qui pivote en « × » à l'ouverture (details[open]). */}
                <Plus aria-hidden="true" className="size-[18px] shrink-0 text-magenta transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-6 leading-relaxed"><Reponse item={f} /></p>
            </details>
          ))}
        </section>

        <WaveDivider colorTop="var(--ksc-cream)" colorBottom="var(--ksc-marine)" />

        {/* Bande CTA pré-footer (textes existants de la page) */}
        <CtaBand title="Une autre question ?" sub="Venez nous voir ou contactez-nous.">
          <Button asChild variant="primary">
            <a href="/seance-essai">Réserver une séance d’essai</a>
          </Button>
          <Button asChild variant="outlineCream">
            <a href="/contact">Nous contacter</a>
          </Button>
        </CtaBand>
      </main>
      <SiteFooter />
    </>
  )
}
