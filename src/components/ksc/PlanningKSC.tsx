import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import { PLANNING } from './planning'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'
const CREME = 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)'

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
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif', color: '#404a63' }}>
        <section style={{ background: CREME, padding: '72px 24px', textAlign: 'center' }}>
          <p style={{ color: '#e6007e', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 14px' }}>Planning</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, color: '#081646', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 18px' }}>
            Le planning des cours
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 680, margin: '0 auto' }}>
            Baby Gym, Gym Dance, Multisports, Cross Boxe&hellip; retrouvez les créneaux de chaque activité, jour par jour et salle par salle.
          </p>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            {PLANNING.map((j) => (
              <div key={j.jour} style={{ background: CREME, borderRadius: 18, padding: '28px 30px' }}>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#081646', margin: '0 0 18px' }}>{j.jour}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 18 }}>
                  {j.salles.map((s) => (
                    <div key={s.salle} style={{ background: '#fff', border: '1px solid #ececec', borderRadius: 14, padding: '20px 22px' }}>
                      <h3 style={{ fontSize: 14, fontWeight: 800, color: '#e6007e', textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 14px' }}>{s.salle}</h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {s.creneaux.map((c) => (
                          <li key={`${c.heure}-${c.activite}`} style={{ display: 'flex', gap: 10, alignItems: 'baseline', lineHeight: 1.4 }}>
                            <span style={{ color: '#081646', fontWeight: 800, fontSize: 15, whiteSpace: 'nowrap', minWidth: 52 }}>{c.heure}</span>
                            <span style={{ fontSize: 15.5 }}>
                              <strong style={{ color: '#081646', fontWeight: 700 }}>{c.activite}</strong>
                              {c.age && <span style={{ color: '#525c75' }}> ({c.age})</span>}
                            </span>
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
          <a href="/seance-essai" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, fontSize: 16, textDecoration: 'none', color: '#fff', background: '#e6007e', border: '2px solid #e6007e' }}>Réserver une séance d’essai</a>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
