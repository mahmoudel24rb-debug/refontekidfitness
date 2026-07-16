import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import TerrainLines from './TerrainLines'
import Underline from './Underline'
import { KSC, display, kicker } from './ui'
import { PRESTATIONS, prestationBySlug } from './prestations'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

// Rend « voir le planning » cliquable (lien /planning) dans le bloc Créneaux.
function Creneaux({ texte }: { texte: string }) {
  const marqueur = 'voir le planning'
  const i = texte.indexOf(marqueur)
  if (i === -1) return <>{texte}</>
  return (
    <>
      {texte.slice(0, i)}
      <a href="/planning" style={{ color: KSC.magenta, fontWeight: 700 }}>voir le planning</a>
      {texte.slice(i + marqueur.length)}
    </>
  )
}

export default function Prestation({ slug }: { slug: string }) {
  const p = prestationBySlug(slug)
  if (!p) return null
  const autres = PRESTATIONS.filter((x) => x.slug !== slug).slice(0, 3)

  // Données structurées : fil d'Ariane + service local (SEO Rochecorbon).
  // NB : un schéma Event (stages/anniversaire) sera ajouté quand le client fournira des dates réelles.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos prestations', item: `${SITE}/nos-prestations` },
          { '@type': 'ListItem', position: 3, name: p.titre, item: `${SITE}/nos-prestations/${p.slug}` },
        ],
      },
      {
        '@type': 'Service',
        name: `${p.titre} — Kid Sport Club`,
        serviceType: p.motCle,
        description: p.intro,
        url: `${SITE}/nos-prestations/${p.slug}`,
        areaServed: { '@type': 'City', name: 'Rochecorbon' },
        provider: {
          '@type': 'SportsActivityLocation',
          name: 'Kid Sport Club',
          telephone: '+33247444143',
          address: { '@type': 'PostalAddress', streetAddress: '1 Quai de la Loire', postalCode: '37210', addressLocality: 'Rochecorbon', addressCountry: 'FR' },
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody }}>
        {/* Hero marine + lignes de terrain */}
        <section style={{ position: 'relative', background: KSC.marine, color: KSC.cream, padding: '80px 24px 110px', overflow: 'hidden' }}>
          <TerrainLines />
          <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ ...kicker, color: KSC.magentaLight, margin: '0 0 14px' }}>
              Nos prestations{' '}
              <span className="ksc-age-badge ksc-age-badge--dark" style={{ marginLeft: 8, verticalAlign: 'middle', textTransform: 'none', letterSpacing: 0 }}>{p.age}</span>
            </p>
            <h1 style={{ ...display, fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 18px', color: KSC.cream }}>{p.titre}</h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, margin: '0 auto 30px', maxWidth: 680, color: 'rgba(251,249,240,.8)' }}>{p.accroche}</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <InscriptionCTA />
              <a href="/seance-essai" className="ksc-btn ksc-btn--cream">Séance d’essai</a>
            </div>
          </div>
        </section>

        {/* Photo bannière */}
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', marginTop: -40, position: 'relative' }}>
          <img src={p.image} alt={p.titre} style={{ width: '100%', height: 'clamp(240px,38vw,420px)', objectFit: 'cover', borderRadius: KSC.radiusCard, display: 'block', boxShadow: KSC.shadowMd }} />
        </div>

        {/* Corps */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48 }}>
          <div className="ksc-reveal">
            <h2 style={{ ...display, fontSize: 28, fontWeight: 800, color: KSC.marine, margin: '0 0 18px' }}>Le <Underline>principe</Underline></h2>
            <p style={{ color: '#404a63', fontSize: 17, lineHeight: 1.75, margin: '0 0 28px' }}>{p.intro}</p>
            <div className="ksc-card" style={{ padding: '20px 24px' }}>
              <p style={{ margin: 0, color: KSC.marine, fontWeight: 700 }}>Créneaux</p>
              <p style={{ margin: '6px 0 0', color: '#525c75' }}><Creneaux texte={p.creneaux} /></p>
            </div>
            <div style={{ position: 'relative', background: KSC.marine, color: KSC.cream, borderRadius: KSC.radiusCard, padding: '20px 24px', marginTop: 16, overflow: 'hidden' }}>
              <TerrainLines opacity={0.05} />
              <div style={{ position: 'relative' }}>
                <p style={{ margin: 0, fontWeight: 700, color: 'rgba(251,249,240,.8)' }}>Tarif</p>
                <p style={{ margin: '6px 0 0', fontSize: 22, fontWeight: 800 }}>{p.prix}</p>
                <p style={{ margin: '10px 0 0', fontSize: 13 }}>
                  <a href="/tarifs" style={{ color: KSC.cream, textDecoration: 'underline' }}>Voir tous les tarifs</a>
                </p>
              </div>
            </div>
          </div>
          <div className="ksc-reveal">
            <h2 style={{ ...display, fontSize: 28, fontWeight: 800, color: KSC.marine, margin: '0 0 18px' }}>Les <Underline>bénéfices</Underline></h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {p.benefices.map((b) => (
                <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#404a63', fontSize: 17, lineHeight: 1.5 }}>
                  <span aria-hidden style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: KSC.magenta, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Autres prestations (maillage interne) */}
        <section style={{ background: KSC.cream2, padding: '64px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ ...display, fontSize: 26, fontWeight: 800, color: KSC.marine, margin: '0 0 28px', textAlign: 'center' }}>Découvrez <Underline>aussi</Underline></h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
              {autres.map((a) => (
                <a key={a.slug} href={`/nos-prestations/${a.slug}`} className="ksc-card ksc-reveal" style={{ padding: 24, textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ ...display, fontSize: 19, fontWeight: 700, color: KSC.marine, margin: '0 0 8px' }}>{a.titre}</h3>
                  <p style={{ color: '#525c75', fontSize: 15, lineHeight: 1.5, margin: '0 0 14px' }}>{a.accroche}</p>
                  <span className="ksc-link-arrow" style={{ fontSize: 15 }}>
                    Découvrir
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginLeft: 5 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </a>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <a href="/nos-prestations" style={{ color: KSC.marine, fontWeight: 700, textDecoration: 'underline' }}>Voir toutes nos prestations</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
