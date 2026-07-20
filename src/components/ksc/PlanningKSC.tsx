import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import { KSC, display } from './ui'
import { PLANNING } from './planning'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

// Tranches d'âge présentes dans le planning (légende), dans l'ordre croissant.
const TRANCHES = ['10-36 mois', '3-5 ans', '6-14 ans']

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

        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 20px' }}>
          {/* Légende des tranches d'âge (pills royal) */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {TRANCHES.map((t) => (
              <span key={t} className="ksc-age-badge" style={{ fontSize: 14, padding: '8px 14px' }}>{t}</span>
            ))}
          </div>

          {/* Jours : 2 colonnes desktop, 1 colonne mobile (grid, hauteurs auto) */}
          <div className="ksc-planning-grid">
            {PLANNING.map((j) => {
              const nb = j.salles.reduce((n, s) => n + s.creneaux.length, 0)
              return (
                <div key={j.jour} className="ksc-reveal" style={{ background: KSC.white, border: `1px solid ${KSC.border}`, borderRadius: 24, boxShadow: KSC.shadowSm, padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
                    <h2 style={{ ...display, fontSize: 26, fontWeight: 800, color: KSC.marine, margin: 0 }}>{j.jour}</h2>
                    {/* Pastille : nombre de créneaux du jour */}
                    <span style={{ background: KSC.cream2, color: KSC.marine, fontSize: 13, fontWeight: 700, lineHeight: 1, padding: '7px 13px', borderRadius: KSC.radiusPill, whiteSpace: 'nowrap' }}>
                      {nb} {nb > 1 ? 'créneaux' : 'créneau'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {j.salles.map((s) => (
                      <div key={s.salle} style={{ background: KSC.cream, borderRadius: 12, padding: '18px 20px' }}>
                        <h3 style={{ fontFamily: KSC.fontBody, fontSize: 13, fontWeight: 800, color: KSC.magenta, textTransform: 'uppercase', letterSpacing: '.05em', margin: '0 0 12px' }}>{s.salle}</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {s.creneaux.map((c) => (
                            <li key={`${c.heure}-${c.activite}`} style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', lineHeight: 1.4 }}>
                              {/* Heure en pill marine */}
                              <span style={{ background: KSC.marine, color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1, padding: '6px 11px', borderRadius: KSC.radiusPill, whiteSpace: 'nowrap' }}>{c.heure}</span>
                              <strong style={{ color: KSC.marine, fontWeight: 700, fontSize: 15.5 }}>{c.activite}</strong>
                              {c.age && <span className="ksc-age-badge">{c.age}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
          <p style={{ fontSize: 14, fontStyle: 'italic', color: '#525c75', margin: '26px 0 0', textAlign: 'center' }}>
            Planning de la rentrée de septembre 2026 — susceptible d&rsquo;évoluer.
          </p>
        </section>

        <div style={{ height: 44 }} aria-hidden="true" />
        <WaveDivider colorTop={KSC.cream} colorBottom={KSC.marine} />

        {/* Bande CTA pré-footer (texte existant de la page : le bouton) */}
        <CtaBand>
          <a href="/seance-essai" className="ksc-btn ksc-btn--primary">Réserver une séance d’essai</a>
        </CtaBand>
      </main>
      <SiteFooter />
    </>
  )
}
