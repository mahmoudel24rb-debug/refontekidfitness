import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { ARTICLES } from './articles'

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
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif', color: '#404a63' }}>
        <section style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', padding: '72px 24px', textAlign: 'center' }}>
          <p style={{ color: '#e6007e', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 14px' }}>Blog & actualités</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#081646', letterSpacing: '-0.02em', margin: 0 }}>Conseils & actus du club</h1>
        </section>
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 90px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 26 }}>
            {ARTICLES.map((a, i) => (
              <a key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, overflow: 'hidden', textDecoration: 'none', color: 'inherit', border: '1px solid #ececec', background: '#fff' }}>
                <img src={ARTICLE_IMG[a.slug]} alt={a.titre} loading="lazy" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#081646', margin: '0 0 10px', lineHeight: 1.3 }}>{a.titre}</h2>
                  <p style={{ color: '#525c75', lineHeight: 1.6, margin: '0 0 18px', flex: 1 }}>{a.excerpt}</p>
                  <span style={{ color: '#e6007e', fontWeight: 700 }}>Lire l’article →</span>
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
