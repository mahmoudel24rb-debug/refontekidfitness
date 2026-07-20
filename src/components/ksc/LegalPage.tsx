import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import type { LegalContent } from '@/data/legal'

// Gabarit typographique sobre des pages légales (mentions, CGV, confidentialité,
// cookies) : bandeau HeroMarine + corps texte étroit. Aucune donnée en dur —
// tout vient de @/data/legal.
export default function LegalPage({ content }: { content: LegalContent }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream text-ink">
        <HeroMarine title={content.titre} padding="72px 24px" />

        <section className="mx-auto max-w-[760px] px-6 py-14">
          {content.intro && <p className="mb-6! text-[17px] leading-relaxed">{content.intro}</p>}
          <p className="mb-9! text-[13px] italic text-muted-foreground">
            Contenu type à faire valider par le client / un conseil juridique avant la mise en ligne.
          </p>
          {content.sections.map((s) => (
            <div key={s.h}>
              <h2 className="mt-10! mb-3! font-heading text-xl">{s.h}</h2>
              <p className="mb-4! leading-relaxed whitespace-pre-line">{s.p}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
