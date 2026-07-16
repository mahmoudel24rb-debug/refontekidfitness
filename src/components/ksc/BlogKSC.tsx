import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import { KSC, display } from './ui'
import { ARTICLES, formatDateFr } from './articles'

export const ARTICLE_IMG: Record<string, string> = {
  'a-quel-age-sport-enfant': '/assets/ksc/cours-10-36-mois.webp',
  'bienfaits-motricite-tout-petit': '/assets/ksc/cours-3-5-ans.webp',
  'idees-anniversaire-sportif-enfant': '/assets/ksc/anniversaire.webp',
  'enfants-vacances-scolaires': '/assets/ksc/stages-vacances.webp',
}

export default function BlogKSC() {
  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        <HeroMarine kicker="Blog & actualités" title="Conseils & actus du club" padding="72px 24px" />
        <section style={{ maxWidth: 940, margin: '0 auto', padding: '60px 24px 90px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,410px),1fr))', gap: 26 }}>
            {[...ARTICLES].sort((a, b) => b.date.localeCompare(a.date)).map((a) => (
              <a key={a.slug} href={`/blog/${a.slug}`} className="ksc-card ksc-reveal" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ height: 160, overflow: 'hidden' }}>
                  <img src={ARTICLE_IMG[a.slug]} alt={a.titre} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ color: '#8a92a6', fontSize: 13, fontWeight: 600, margin: '0 0 8px' }}><time dateTime={a.date}>{formatDateFr(a.date)}</time></p>
                  <h2 style={{ ...display, fontSize: 20, fontWeight: 700, color: KSC.marine, margin: '0 0 10px', lineHeight: 1.3 }}>{a.titre}</h2>
                  <p style={{ color: '#525c75', lineHeight: 1.6, margin: '0 0 18px', flex: 1 }}>{a.excerpt}</p>
                  <span className="ksc-link-arrow">
                    Lire l’article
                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginLeft: 6 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
