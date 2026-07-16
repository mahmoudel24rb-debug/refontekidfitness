import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import TerrainLines from './TerrainLines'
import Underline from './Underline'
import { KSC, display } from './ui'
import { articleBySlug, ARTICLES, formatDateFr } from './articles'
import { ARTICLE_IMG } from './BlogKSC'

export default function Article({ slug }: { slug: string }) {
  const a = articleBySlug(slug)
  if (!a) return null
  const autres = ARTICLES.filter((x) => x.slug !== slug).slice(0, 3)
  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        {/* Bandeau marine + lignes de terrain */}
        <section style={{ position: 'relative', background: KSC.marine, color: KSC.cream, padding: '72px 24px 100px', overflow: 'hidden' }}>
          <TerrainLines />
          <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
            <a href="/blog" style={{ color: KSC.magentaLight, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginRight: 5 }}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
              Blog
            </a>
            <h1 style={{ ...display, fontSize: 'clamp(28px,4.5vw,46px)', fontWeight: 800, lineHeight: 1.12, margin: '16px 0 0', color: KSC.cream }}>{a.titre}</h1>
            <p style={{ margin: '14px 0 0', fontSize: 15, fontWeight: 600, color: 'rgba(251,249,240,.8)' }}>
              Publié le <time dateTime={a.date}>{formatDateFr(a.date)}</time>
            </p>
          </div>
        </section>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', marginTop: -32, position: 'relative' }}>
          <img src={ARTICLE_IMG[slug]} alt={a.titre} style={{ width: '100%', height: 'clamp(220px,34vw,380px)', objectFit: 'cover', borderRadius: KSC.radiusCard, display: 'block', boxShadow: KSC.shadowMd }} />
        </div>
        <article style={{ maxWidth: 740, margin: '0 auto', padding: '56px 24px 70px' }}>
          {a.paragraphes.map((p, i) => (
            <p key={i} style={{ fontSize: 18, lineHeight: 1.8, margin: '0 0 22px' }}>{p}</p>
          ))}
          {/* Encart CTA marine + lignes de terrain */}
          <div style={{ position: 'relative', background: KSC.marine, color: KSC.cream, borderRadius: KSC.radiusCard, padding: 32, textAlign: 'center', marginTop: 20, overflow: 'hidden' }}>
            <TerrainLines />
            <div style={{ position: 'relative' }}>
              <p style={{ ...display, fontWeight: 700, fontSize: 20, margin: '0 0 18px' }}>Envie d’essayer le Kid Sport Club ?</p>
              <a href="/seance-essai" className="ksc-btn ksc-btn--primary">Réserver une séance d’essai</a>
            </div>
          </div>
        </article>
        <section style={{ background: KSC.cream2, padding: '56px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ ...display, fontSize: 24, fontWeight: 800, color: KSC.marine, textAlign: 'center', margin: '0 0 26px' }}>À lire <Underline>aussi</Underline></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
              {autres.map((x) => (
                <a key={x.slug} href={`/blog/${x.slug}`} className="ksc-card ksc-reveal" style={{ padding: 22, textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ ...display, fontSize: 17, fontWeight: 700, color: KSC.marine, margin: '0 0 8px', lineHeight: 1.3 }}>{x.titre}</h3>
                  <span className="ksc-link-arrow" style={{ fontSize: 14 }}>
                    Lire
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginLeft: 5 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
