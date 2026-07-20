import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import WaveDivider from './WaveDivider'
import { KSC, display } from './ui'
import { ARTICLES, formatDateFr } from './articles'

export const ARTICLE_IMG: Record<string, string> = {
  'a-quel-age-sport-enfant': '/assets/ksc/cours-10-36-mois.webp',
  'bienfaits-motricite-tout-petit': '/assets/ksc/cours-3-5-ans.webp',
  'idees-anniversaire-sportif-enfant': '/assets/ksc/anniversaire.webp',
  'enfants-vacances-scolaires': '/assets/ksc/stages-vacances.webp',
}

// Pill de date (crème) — partagée entre la carte featured et la grille.
function DatePill({ date }: { date: string }) {
  return (
    <p style={{ margin: 0 }}>
      <time dateTime={date} style={{ display: 'inline-block', background: KSC.cream2, color: '#525c75', fontSize: 13, fontWeight: 600, lineHeight: 1, padding: '6px 12px', borderRadius: KSC.radiusPill }}>
        {formatDateFr(date)}
      </time>
    </p>
  )
}

function LireLien() {
  return (
    <span className="ksc-link-arrow">
      Lire l’article
      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginLeft: 6 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </span>
  )
}

export default function BlogKSC() {
  const tries = [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date))
  const [featured, ...autres] = tries

  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        <HeroMarine kicker="Blog & actualités" title="Conseils & actus du club" padding="72px 24px" />

        {/* Article le plus récent en « featured » horizontal (image gauche 45 %) */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 64px' }}>
          <a href={`/blog/${featured.slug}`} className="ksc-card ksc-reveal ksc-featured" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ overflow: 'hidden' }}>
              <img className="ksc-featured-img" src={ARTICLE_IMG[featured.slug]} alt={featured.titre} />
            </div>
            <div style={{ padding: 'clamp(24px,3.5vw,40px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
              <DatePill date={featured.date} />
              <h2 style={{ ...display, fontSize: 'clamp(23px,2.6vw,28px)', fontWeight: 800, color: KSC.marine, margin: 0, lineHeight: 1.25 }}>{featured.titre}</h2>
              <p style={{ color: '#525c75', lineHeight: 1.65, margin: 0, flex: 1 }}>{featured.excerpt}</p>
              <LireLien />
            </div>
          </a>
        </section>

        <WaveDivider colorTop={KSC.cream} colorBottom={KSC.white} />

        {/* Les autres articles en grille de 3 */}
        <section style={{ background: KSC.white, padding: '48px 24px 90px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 26 }}>
            {autres.map((a) => (
              <a key={a.slug} href={`/blog/${a.slug}`} className="ksc-card ksc-reveal" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ overflow: 'hidden' }}>
                  <img src={ARTICLE_IMG[a.slug]} alt={a.titre} loading="lazy" style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, flex: 1 }}>
                  <DatePill date={a.date} />
                  <h2 style={{ ...display, fontSize: 20, fontWeight: 700, color: KSC.marine, margin: 0, lineHeight: 1.3 }}>{a.titre}</h2>
                  <p style={{ color: '#525c75', lineHeight: 1.6, margin: 0, flex: 1 }}>{a.excerpt}</p>
                  <LireLien />
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
