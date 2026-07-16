import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { KSC, display } from './ui'

export type LegalContent = { titre: string; intro?: string; sections: { h: string; p: string }[] }

export default function LegalPage({ content }: { content: LegalContent }) {
  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        <section style={{ maxWidth: 820, margin: '0 auto', padding: '90px 24px 80px' }}>
          <h1 style={{ ...display, fontSize: 'clamp(30px,4.5vw,44px)', fontWeight: 800, color: KSC.marine, margin: '0 0 18px' }}>{content.titre}</h1>
          {content.intro && <p style={{ fontSize: 17, lineHeight: 1.7, margin: '0 0 28px' }}>{content.intro}</p>}
          <p style={{ fontSize: 13, color: '#9aa1b2', margin: '0 0 36px', fontStyle: 'italic' }}>
            Contenu type à faire valider par le client / un conseil juridique avant la mise en ligne.
          </p>
          {content.sections.map((s) => (
            <div key={s.h} style={{ marginBottom: 28 }}>
              <h2 style={{ ...display, fontSize: 21, fontWeight: 700, color: KSC.marine, margin: '0 0 10px' }}>{s.h}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>{s.p}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
