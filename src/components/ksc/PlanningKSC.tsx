import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import { KSC, display } from './ui'
import { PLANNING } from './planning'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export default function PlanningKSC() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Planning', item: `${SITE}/planning` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        <HeroMarine
          kicker="Planning"
          title="Le planning des cours"
          sub={<>Baby Gym, Gym Dance, Multisports, Cross Boxe&hellip; retrouvez les créneaux de chaque activité, jour par jour et salle par salle.</>}
          padding="72px 24px"
          maxWidth={760}
        />

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {PLANNING.map((j) => (
              <div key={j.jour} className="ksc-reveal" style={{ background: KSC.cream2, borderRadius: KSC.radiusCard, padding: '28px 30px' }}>
                <h2 style={{ ...display, fontSize: 24, fontWeight: 800, color: KSC.marine, margin: '0 0 18px' }}>{j.jour}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 18 }}>
                  {j.salles.map((s) => (
                    <div key={s.salle} className="ksc-card" style={{ padding: '20px 22px' }}>
                      <h3 style={{ fontFamily: KSC.fontBody, fontSize: 14, fontWeight: 800, color: KSC.magenta, textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 14px' }}>{s.salle}</h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {s.creneaux.map((c) => (
                          <li key={`${c.heure}-${c.activite}`} style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', lineHeight: 1.4 }}>
                            <span style={{ color: KSC.marine, fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap', minWidth: 52 }}>{c.heure}</span>
                            <strong style={{ color: KSC.marine, fontWeight: 700, fontSize: 15.5 }}>{c.activite}</strong>
                            {c.age && <span className="ksc-age-badge">{c.age}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, fontStyle: 'italic', color: '#525c75', margin: '22px 0 0', textAlign: 'center' }}>
            Planning de la rentrée de septembre 2026 — susceptible d&rsquo;évoluer.
          </p>
        </section>

        <section style={{ textAlign: 'center', padding: '36px 24px 90px' }}>
          <a href="/seance-essai" className="ksc-btn ksc-btn--primary">Réserver une séance d’essai</a>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
