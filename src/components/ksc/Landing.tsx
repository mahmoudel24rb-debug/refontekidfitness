import React from 'react'
import InscriptionCTA from './InscriptionCTA'
import { landingBySlug } from './landings'

// Gabarit Landing (conversion-first, sans navigation pour limiter les fuites).
// Barre de marque minimale (logo + tél + CTA), hero, réassurance, bénéfices, preuve, CTA final.
const CREME = 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)'

export default function Landing({ slug }: { slug: string }) {
  const l = landingBySlug(slug)
  if (!l) return null
  return (
    <div style={{ fontFamily: '"Inter", sans-serif', color: '#404a63', background: '#fff' }}>
      {/* Barre de marque minimale */}
      <header style={{ background: CREME }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="/" aria-label="Kid Sport Club — accueil"><img src="/assets/ksc-logo.png" alt="Kid Sport Club" style={{ height: 48, width: 'auto', display: 'block' }} /></a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <a href="tel:+33247444143" style={{ color: '#081646', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>02 47 44 41 43</a>
            <InscriptionCTA label={l.ctaLabel} style={{ padding: '12px 22px', fontSize: 15 }} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: CREME, padding: '56px 24px 72px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <p style={{ color: '#e6007e', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 16px' }}>{l.eyebrow}</p>
            <h1 style={{ fontSize: 'clamp(32px,4.6vw,50px)', fontWeight: 800, color: '#081646', letterSpacing: '-0.02em', lineHeight: 1.06, margin: '0 0 20px' }}>{l.h1}</h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, margin: '0 0 30px', maxWidth: 520 }}>{l.sousTitre}</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <InscriptionCTA label={l.ctaLabel} />
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, fontSize: 16, textDecoration: 'none', color: '#081646', border: '2px solid #081646' }}>Nous contacter</a>
            </div>
          </div>
          <img src={l.image} alt={l.h1} style={{ width: '100%', height: 'clamp(280px,40vw,440px)', objectFit: 'cover', borderRadius: 22, display: 'block', boxShadow: '0 20px 50px rgba(8,22,70,.18)' }} />
        </div>
      </section>

      {/* Bandeau réassurance */}
      <div style={{ background: '#081646', color: '#fff' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '18px 24px', display: 'flex', flexWrap: 'wrap', gap: '10px 32px', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>
          {l.reassurance.map((r) => (<span key={r}>{r}</span>))}
        </div>
      </div>

      {/* Bénéfices */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {l.points.map((pt) => (
            <div key={pt.titre} style={{ background: CREME, borderRadius: 16, padding: 30 }}>
              <h2 style={{ fontSize: 21, fontWeight: 800, color: '#081646', margin: '0 0 12px' }}>{pt.titre}</h2>
              <p style={{ lineHeight: 1.6, margin: 0 }}>{pt.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preuve sociale */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: 'clamp(20px,2.6vw,26px)', fontWeight: 700, color: '#081646', lineHeight: 1.5, margin: '0 0 14px' }}>&laquo;&nbsp;{l.preuve.texte}&nbsp;&raquo;</p>
        <p style={{ color: '#e6007e', fontWeight: 700, margin: 0 }}>{l.preuve.auteur}</p>
      </section>

      {/* CTA final */}
      <section style={{ padding: '20px 24px 90px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', background: 'linear-gradient(135deg,#e6007e,#1060c8)', borderRadius: 24, padding: '56px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 'clamp(26px,3.4vw,38px)', fontWeight: 800, margin: '0 0 14px' }}>Prêt à réserver&nbsp;?</h2>
          <p style={{ fontSize: 17, opacity: 0.95, margin: '0 0 28px' }}>Réservez en quelques clics ou contactez-nous, on vous rappelle.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <InscriptionCTA label={l.ctaLabel} variant="light" />
            <a href="tel:+33247444143" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, fontSize: 16, textDecoration: 'none', color: '#fff', border: '2px solid #fff' }}>02 47 44 41 43</a>
          </div>
        </div>
      </section>

      {/* Pied minimal (légal) */}
      <footer style={{ background: CREME, padding: '24px', textAlign: 'center', fontSize: 14 }}>
        <p style={{ margin: '0 0 8px', color: '#081646', fontWeight: 700 }}>Kid Sport Club — 1 Quai de la Loire, 37210 Rochecorbon</p>
        <p style={{ margin: 0 }}>
          <a href="/mentions-legales" style={{ color: '#525c75' }}>Mentions légales</a> ·{' '}
          <a href="/confidentialite" style={{ color: '#525c75' }}>Confidentialité</a> ·{' '}
          <a href="/cgv" style={{ color: '#525c75' }}>CGV</a>
        </p>
      </footer>
    </div>
  )
}
