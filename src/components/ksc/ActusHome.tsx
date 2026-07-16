import React from 'react'
import Underline from './Underline'
import { KSC, display, kicker } from './ui'
import { ARTICLES } from './articles'
import { ARTICLE_IMG } from './BlogKSC'

// Bandeau « Actus & conseils » pour l'accueil (brief §4 : bandeau actus).
// Affiche les 3 derniers articles + lien vers le blog. Maillage interne home -> blog.
export default function ActusHome() {
  const derniers = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
  return (
    <section style={{ background: KSC.cream, fontFamily: KSC.fontBody, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 34 }}>
          <div>
            <p style={{ ...kicker, color: KSC.magenta, margin: '0 0 10px' }}>Actus &amp; conseils</p>
            <h2 style={{ ...display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: KSC.marine, margin: 0 }}>Le blog du <Underline>club</Underline></h2>
          </div>
          <a href="/blog" className="ksc-btn ksc-btn--secondary" style={{ padding: '12px 24px', fontSize: 15 }}>Tous les articles</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 26 }}>
          {derniers.map((a) => (
            <a key={a.slug} href={`/blog/${a.slug}`} className="ksc-card ksc-reveal" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ height: 170, overflow: 'hidden' }}>
                <img src={ARTICLE_IMG[a.slug]} alt={a.titre} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ ...display, fontSize: 19, fontWeight: 700, color: KSC.marine, margin: '0 0 10px', lineHeight: 1.3 }}>{a.titre}</h3>
                <p style={{ color: '#525c75', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>{a.excerpt}</p>
                <span className="ksc-link-arrow">
                  Lire l&rsquo;article
                  <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginLeft: 6 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
