import React from 'react'
import InscriptionCTA from './InscriptionCTA'
import TerrainLines from './TerrainLines'
import Reveal from './Reveal'
import Underline from './Underline'
import { KSC, display, kicker } from './ui'
import { landingBySlug } from '@/data/landings'

// Gabarit Landing (conversion-first, sans navigation pour limiter les fuites).
// Barre de marque minimale (logo + tél + CTA), hero marine + lignes de terrain,
// réassurance, bénéfices, preuve, CTA final marine.
export default function Landing({ slug }: { slug: string }) {
  const l = landingBySlug(slug)
  if (!l) return null
  return (
    <div style={{ fontFamily: KSC.fontBody, color: '#404a63', background: KSC.cream }}>
      {/* Observer des apparitions au scroll (pas de SiteFooter ici). */}
      <Reveal />
      {/* Barre de marque minimale */}
      <header style={{ background: KSC.cream }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <a href="/" aria-label="Kid Sport Club — accueil"><img src="/assets/ksc-logo.png" alt="Kid Sport Club" style={{ height: 48, width: 'auto', display: 'block' }} /></a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <a href="tel:+33247444143" style={{ color: KSC.marine, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>02 47 44 41 43</a>
            <InscriptionCTA label={l.ctaLabel} size="sm" className="px-[22px] py-3" />
          </div>
        </div>
      </header>

      {/* Hero marine + lignes de terrain */}
      <section style={{ position: 'relative', background: KSC.marine, color: KSC.cream, padding: '56px 24px 72px', overflow: 'hidden' }}>
        <TerrainLines />
        <div style={{ position: 'relative', maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <p style={{ ...kicker, letterSpacing: '.05em', color: KSC.magentaLight, margin: '0 0 16px' }}>{l.eyebrow}</p>
            <h1 style={{ ...display, fontSize: 'clamp(32px,4.6vw,50px)', fontWeight: 800, color: KSC.cream, lineHeight: 1.08, margin: '0 0 20px' }}>{l.h1}</h1>
            <p style={{ fontSize: 19, lineHeight: 1.65, margin: '0 0 30px', maxWidth: 520, color: 'rgba(251,249,240,.8)' }}>{l.sousTitre}</p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <InscriptionCTA label={l.ctaLabel} />
              <a href="/contact" className="ksc-btn ksc-btn--cream">Nous contacter</a>
            </div>
          </div>
          <img src={l.image} alt={l.h1} style={{ width: '100%', height: 'clamp(280px,40vw,440px)', objectFit: 'cover', borderRadius: KSC.radiusCard, display: 'block', boxShadow: KSC.shadowMd }} />
        </div>
      </section>

      {/* Bandeau réassurance — surface marine secondaire */}
      <div style={{ background: KSC.navy2, color: KSC.cream }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '18px 24px', display: 'flex', flexWrap: 'wrap', gap: '10px 32px', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>
          {l.reassurance.map((r) => (<span key={r}>{r}</span>))}
        </div>
      </div>

      {/* Bénéfices */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {l.points.map((pt) => (
            <div key={pt.titre} className="ksc-card ksc-reveal" style={{ padding: 30 }}>
              <h2 style={{ ...display, fontSize: 21, fontWeight: 700, color: KSC.marine, margin: '0 0 12px' }}>{pt.titre}</h2>
              <p style={{ lineHeight: 1.6, margin: 0 }}>{pt.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preuve sociale — rendue uniquement si un vrai avis client est renseigné */}
      {l.preuve && (
        <section className="ksc-reveal" style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px 20px', textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(20px,2.6vw,26px)', fontWeight: 700, color: KSC.marine, lineHeight: 1.5, margin: '0 0 14px' }}>&laquo;&nbsp;{l.preuve.texte}&nbsp;&raquo;</p>
          <p style={{ color: KSC.magenta, fontWeight: 700, margin: 0 }}>{l.preuve.auteur}</p>
        </section>
      )}

      {/* CTA final — marine + lignes de terrain (fini le dégradé) */}
      <section style={{ padding: '20px 24px 90px' }}>
        <div className="ksc-reveal" style={{ position: 'relative', maxWidth: 1120, margin: '0 auto', background: KSC.marine, borderRadius: KSC.radiusCard, padding: '56px 24px', textAlign: 'center', color: KSC.cream, overflow: 'hidden' }}>
          <TerrainLines />
          <div style={{ position: 'relative' }}>
            <h2 style={{ ...display, fontSize: 'clamp(26px,3.4vw,38px)', fontWeight: 800, margin: '0 0 14px' }}>Prêt à <Underline>réserver&nbsp;?</Underline></h2>
            <p style={{ fontSize: 17, color: 'rgba(251,249,240,.8)', margin: '0 0 28px' }}>Réservez en quelques clics ou contactez-nous, on vous rappelle.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <InscriptionCTA label={l.ctaLabel} />
              <a href="tel:+33247444143" className="ksc-btn ksc-btn--cream">02 47 44 41 43</a>
            </div>
          </div>
        </div>
      </section>

      {/* Pied minimal (légal) */}
      <footer style={{ background: KSC.cream2, padding: '24px', textAlign: 'center', fontSize: 14 }}>
        <p style={{ margin: '0 0 8px', color: KSC.marine, fontWeight: 700 }}>Kid Sport Club — 1 Quai de la Loire, 37210 Rochecorbon</p>
        <p style={{ margin: 0 }}>
          <a href="/mentions-legales" style={{ color: '#525c75' }}>Mentions légales</a> ·{' '}
          <a href="/confidentialite" style={{ color: '#525c75' }}>Confidentialité</a> ·{' '}
          <a href="/cgv" style={{ color: '#525c75' }}>CGV</a>
        </p>
      </footer>
    </div>
  )
}
