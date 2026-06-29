import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import { PRESTATIONS, prestationBySlug } from './prestations'

export default function Prestation({ slug }: { slug: string }) {
  const p = prestationBySlug(slug)
  if (!p) return null
  const autres = PRESTATIONS.filter((x) => x.slug !== slug).slice(0, 3)

  return (
    <>
      <SiteHeader />
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif' }}>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg,#e6007e,#1060c8)', color: '#fff', padding: '80px 24px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 14px', opacity: 0.9 }}>Nos prestations · {p.age}</p>
            <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 18px' }}>{p.titre}</h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, margin: '0 auto 30px', maxWidth: 680, opacity: 0.95 }}>{p.accroche}</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <InscriptionCTA variant="light" />
              <a href="/seance-essai" style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, fontSize: 16, textDecoration: 'none', color: '#fff', border: '2px solid #fff' }}>Séance d’essai</a>
            </div>
          </div>
        </section>

        {/* Corps */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#081646', margin: '0 0 18px' }}>Le principe</h2>
            <p style={{ color: '#404a63', fontSize: 17, lineHeight: 1.75, margin: '0 0 28px' }}>{p.intro}</p>
            <div style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', borderRadius: 14, padding: '20px 24px' }}>
              <p style={{ margin: 0, color: '#081646', fontWeight: 700 }}>Créneaux</p>
              <p style={{ margin: '6px 0 0', color: '#525c75' }}>{p.creneaux}</p>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#081646', margin: '0 0 18px' }}>Les bénéfices</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {p.benefices.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#404a63', fontSize: 17, lineHeight: 1.5 }}>
                  <span aria-hidden style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: '#e6007e', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, marginTop: 2 }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Autres prestations (maillage interne) */}
        <section style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', padding: '64px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#081646', margin: '0 0 28px', textAlign: 'center' }}>Découvrez aussi</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
              {autres.map((a) => (
                <a key={a.slug} href={`/nos-prestations/${a.slug}`} style={{ background: '#fff', border: '1px solid #ececec', borderRadius: 14, padding: 24, textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#081646', margin: '0 0 8px' }}>{a.titre}</h3>
                  <p style={{ color: '#525c75', fontSize: 15, lineHeight: 1.5, margin: '0 0 14px' }}>{a.accroche}</p>
                  <span style={{ color: '#e6007e', fontWeight: 700, fontSize: 15 }}>Découvrir →</span>
                </a>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <a href="/nos-prestations" style={{ color: '#081646', fontWeight: 700, textDecoration: 'underline' }}>Voir toutes nos prestations</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
