import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import TerrainLines from './TerrainLines'
import Underline from './Underline'
import { KSC, display } from './ui'
import { PRESTATIONS } from './prestations'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export default function PrestationsHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos prestations', item: `${SITE}/nos-prestations` },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: PRESTATIONS.map((p, i) => ({
          '@type': 'ListItem', position: i + 1, name: p.titre, url: `${SITE}/nos-prestations/${p.slug}`,
        })),
      },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody }}>
        <HeroMarine
          kicker="Nos prestations"
          title="Le sport des enfants, sous toutes ses formes"
          sub={<>De la baby gym dès 10 mois au sport ado, en passant par les mercredis sportifs, les stages et les anniversaires :
            au Kid Sport Club de Rochecorbon, chaque enfant trouve son activité.</>}
        />

        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 90px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 26 }}>
            {PRESTATIONS.map((p) => (
              <a key={p.slug} href={`/nos-prestations/${p.slug}`} className="ksc-card ksc-reveal"
                style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img src={p.image} alt={p.titre} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span className="ksc-age-badge" style={{ alignSelf: 'flex-start', marginBottom: 12 }}>{p.age}</span>
                  <h2 style={{ ...display, fontSize: 23, fontWeight: 700, color: KSC.marine, margin: '0 0 10px' }}>{p.titre}</h2>
                  <p style={{ color: '#525c75', lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>{p.accroche}</p>
                  <span className="ksc-link-arrow">
                    Découvrir
                    <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginLeft: 6 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Fit' Parents/Enfants : moment intégré aux cours, PAS une prestation (pas de carte dans la grille). */}
          <div className="ksc-reveal" style={{ marginTop: 40, background: KSC.cream2, borderLeft: `4px solid ${KSC.magenta}`, borderRadius: KSC.radiusCard, padding: '26px 30px' }}>
            <h2 style={{ ...display, fontSize: 20, fontWeight: 700, color: KSC.marine, margin: '0 0 10px' }}>Fit&rsquo; Parents/Enfants — intégré à nos cours</h2>
            <p style={{ color: '#404a63', lineHeight: 1.65, margin: 0 }}>
              Un moment de sport à partager en famille. Parents et enfants bougent ensemble à travers des exercices ludiques et complices — une manière différente de se retrouver, entre jeu et activité physique.
            </p>
          </div>

          {/* Bloc CTA marine + lignes de terrain */}
          <div className="ksc-reveal" style={{ position: 'relative', textAlign: 'center', marginTop: 64, background: KSC.marine, color: KSC.cream, borderRadius: KSC.radiusCard, padding: '54px 24px', overflow: 'hidden' }}>
            <TerrainLines />
            <div style={{ position: 'relative' }}>
              <h2 style={{ ...display, fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, margin: '0 0 14px' }}>Prêt à inscrire votre <Underline>enfant&nbsp;?</Underline></h2>
              <p style={{ color: 'rgba(251,249,240,.8)', fontSize: 17, margin: '0 0 28px' }}>Première séance d’essai pour découvrir le club.</p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <InscriptionCTA />
                <a href="/seance-essai" className="ksc-btn ksc-btn--cream">Réserver une séance d’essai</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
