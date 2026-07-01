import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import { articleBySlug, ARTICLES } from './articles'
import { ARTICLE_IMG } from './BlogKSC'

export default function Article({ slug }: { slug: string }) {
  const a = articleBySlug(slug)
  if (!a) return null
  const autres = ARTICLES.filter((x) => x.slug !== slug).slice(0, 3)
  return (
    <>
      <SiteHeader />
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif', color: '#404a63' }}>
        <section style={{ background: 'linear-gradient(135deg,#e6007e,#1060c8)', color: '#fff', padding: '72px 24px' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <a href="/blog" style={{ color: '#fff', opacity: 0.9, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>← Blog</a>
            <h1 style={{ fontSize: 'clamp(28px,4.5vw,46px)', fontWeight: 800, lineHeight: 1.1, margin: '16px 0 0' }}>{a.titre}</h1>
          </div>
        </section>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', marginTop: -32 }}>
          <img src={ARTICLE_IMG[slug]} alt={a.titre} style={{ width: '100%', height: 'clamp(220px,34vw,380px)', objectFit: 'cover', borderRadius: 18, display: 'block', boxShadow: '0 16px 40px rgba(8,22,70,.18)' }} />
        </div>
        <article style={{ maxWidth: 740, margin: '0 auto', padding: '56px 24px 70px' }}>
          {a.paragraphes.map((p, i) => (
            <p key={i} style={{ fontSize: 18, lineHeight: 1.8, margin: '0 0 22px' }}>{p}</p>
          ))}
          <div style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', borderRadius: 16, padding: 32, textAlign: 'center', marginTop: 20 }}>
            <p style={{ color: '#081646', fontWeight: 700, fontSize: 18, margin: '0 0 18px' }}>Envie d’essayer le Kid Sport Club ?</p>
            <InscriptionCTA label="Réserver une séance d’essai" />
          </div>
        </article>
        <section style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', padding: '56px 24px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#081646', textAlign: 'center', margin: '0 0 26px' }}>À lire aussi</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 18 }}>
              {autres.map((x) => (
                <a key={x.slug} href={`/blog/${x.slug}`} style={{ background: '#fff', border: '1px solid #ececec', borderRadius: 14, padding: 22, textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: '#081646', margin: '0 0 8px', lineHeight: 1.3 }}>{x.titre}</h3>
                  <span style={{ color: '#e6007e', fontWeight: 700, fontSize: 14 }}>Lire →</span>
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
