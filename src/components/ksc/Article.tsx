import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import TerrainLines from './TerrainLines'
import Underline from './Underline'
import { KSC, display } from './ui'
import { articleBySlug, ARTICLES, formatDateFr } from './articles'
import { ARTICLE_IMG } from './BlogKSC'

export default function Article({ slug }: { slug: string }) {
  const a = articleBySlug(slug)
  if (!a) return null
  const autres = ARTICLES.filter((x) => x.slug !== slug).slice(0, 3)
  // Chapo (1er paragraphe) mis en avant, suite en corps de texte.
  const [chapo, ...suite] = a.paragraphes
  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        {/* Hero v2 avec image de couverture */}
        <HeroMarine
          kicker={
            <a href="/blog" style={{ color: KSC.magentaLight, textDecoration: 'none' }}>
              <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginRight: 5 }}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
              Blog
            </a>
          }
          title={a.titre}
          sub={<>Publié le <time dateTime={a.date}>{formatDateFr(a.date)}</time></>}
          image={ARTICLE_IMG[slug]}
          imageAlt={a.titre}
          padding="64px 24px 72px"
        />

        {/* Corps : chapo 19px medium, largeur de lecture 680px, liens stylés (.ksc-article-body) */}
        <article className="ksc-article-body" style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px 70px' }}>
          <p style={{ fontSize: 19, fontWeight: 500, color: KSC.marine, lineHeight: 1.7, margin: '0 0 26px' }}>{chapo}</p>
          {suite.map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.8, margin: '0 0 22px' }}>{p}</p>
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
