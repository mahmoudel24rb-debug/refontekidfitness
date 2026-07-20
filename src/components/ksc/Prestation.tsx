import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import TerrainLines from './TerrainLines'
import Underline from './Underline'
import { KSC, display } from './ui'
import { PRESTATIONS, prestationBySlug } from '@/data/prestations'

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
        {/* Hero v2 : 2 colonnes, photo de la prestation + badge d'âge sur l'image */}
        <HeroMarine
          kicker="Nos prestations"
          title={p.titre}
          sub={p.accroche}
          image={p.image}
          imageAlt={p.titre}
          badge={p.age}
          padding="72px 24px 128px"
        >
          <InscriptionCTA />
          <a href="/seance-essai" className="ksc-btn ksc-btn--cream">Séance d’essai</a>
        </HeroMarine>

        {/* Carte chevauchante (« pull-up card ») : Le principe / Les bénéfices.
            Flux normal (marge négative + position relative), hauteur auto. */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="ksc-reveal" style={{ position: 'relative', zIndex: 2, marginTop: -56, background: KSC.white, border: `1px solid ${KSC.border}`, borderRadius: 24, boxShadow: KSC.shadowMd, padding: 'clamp(28px,4vw,48px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '40px 56px' }}>
              <div>
                <h2 style={{ ...display, fontSize: 28, fontWeight: 800, color: KSC.marine, margin: '0 0 18px' }}>Le <Underline>principe</Underline></h2>
                <p style={{ color: '#404a63', fontSize: 17, lineHeight: 1.75, margin: '0 0 24px' }}>{p.intro}</p>
                <div style={{ background: KSC.cream, border: `1px solid ${KSC.border}`, borderRadius: 12, padding: '18px 22px' }}>
                  <p style={{ margin: 0, color: KSC.marine, fontWeight: 700 }}>Créneaux</p>
                  <p style={{ margin: '6px 0 0', color: '#525c75' }}><Creneaux texte={p.creneaux} /></p>
                </div>
              </div>
              <div>
                <h2 style={{ ...display, fontSize: 28, fontWeight: 800, color: KSC.marine, margin: '0 0 18px' }}>Les <Underline>bénéfices</Underline></h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {p.benefices.map((b) => (
                    <li key={b} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', color: '#404a63', fontSize: 17, lineHeight: 1.5 }}>
                      <span aria-hidden style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: KSC.magenta, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bloc Tarif : carte marine, prix display, TerrainLines discret, CTA magenta */}
            <div style={{ position: 'relative', background: KSC.marine, color: KSC.cream, borderRadius: KSC.radiusCard, padding: 'clamp(24px,3vw,34px)', marginTop: 'clamp(32px,4vw,44px)', overflow: 'hidden' }}>
              <TerrainLines opacity={0.05} />
              <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '20px 32px', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, color: 'rgba(251,249,240,.8)' }}>Tarif</p>
                  <p style={{ ...display, margin: '6px 0 0', fontSize: 'clamp(30px,3.4vw,38px)', fontWeight: 800, lineHeight: 1.15 }}>{p.prix}</p>
                  <p style={{ margin: '10px 0 0', fontSize: 14 }}>
                    <a href="/tarifs" style={{ color: KSC.cream, textDecoration: 'underline', textUnderlineOffset: 3 }}>Voir tous les tarifs</a>
                  </p>
                </div>
                <InscriptionCTA />
              </div>
            </div>
          </div>
        </section>

        {/* Autres prestations (maillage interne) */}
        <section style={{ background: KSC.cream2, padding: '64px 24px', marginTop: 70 }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
