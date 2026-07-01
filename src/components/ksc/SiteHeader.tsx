'use client'

import React, { useState } from 'react'
import InscriptionCTA from './InscriptionCTA'
import { PRESTATIONS } from './prestations'

// Header KSC partagé (nouvelles pages). Charte : fond crème, logo, nav, CTA magenta.
const NAV = [
  { label: 'Accueil', href: '/' },
  { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
  { label: 'Nos prestations', href: '/nos-prestations', sub: PRESTATIONS.map((p) => ({ label: p.titre, href: `/nos-prestations/${p.slug}` })) },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const link: React.CSSProperties = {
  color: '#081646', fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: 16,
  textDecoration: 'none', whiteSpace: 'nowrap',
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [presOpen, setPresOpen] = useState(false)
  return (
    <header style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="/" aria-label="Kid Sport Club — accueil" style={{ display: 'block', flexShrink: 0 }}>
          <img src="/assets/ksc-logo.png" alt="Kid Sport Club" style={{ height: 52, width: 'auto', display: 'block' }} />
        </a>

        {/* Nav desktop */}
        <nav className="ksc-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {NAV.map((item) => (
            <div key={item.href} style={{ position: 'relative' }}
              onMouseEnter={() => item.sub && setPresOpen(true)} onMouseLeave={() => item.sub && setPresOpen(false)}>
              <a href={item.href} style={link}>{item.label}{item.sub ? ' ▾' : ''}</a>
              {item.sub && presOpen && (
                <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 12, zIndex: 100 }}>
                  <div style={{ background: '#fff', borderRadius: 12, padding: 16, minWidth: 230, boxShadow: '0 12px 32px rgba(8,22,70,.12)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {item.sub.map((s) => (
                      <a key={s.href} href={s.href} style={{ ...link, fontSize: 15, fontWeight: 700 }}>{s.label}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ksc-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/seance-essai" style={{ ...link, fontWeight: 700 }}>Séance d’essai</a>
          <InscriptionCTA style={{ padding: '13px 24px', fontSize: 15 }} />
        </div>

        {/* Burger mobile */}
        <button className="ksc-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#081646" strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </div>

      {/* Panneau mobile */}
      {open && (
        <div className="ksc-mobile-panel" style={{ borderTop: '1px solid #e7e3d6', padding: '12px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map((item) => (
            <div key={item.href}>
              <a href={item.href} style={{ ...link, display: 'block', padding: '12px 0', fontSize: 17 }}>{item.label}</a>
              {item.sub && (
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 16, borderLeft: '2px solid #e6007e', marginBottom: 8 }}>
                  {item.sub.map((s) => <a key={s.href} href={s.href} style={{ ...link, padding: '8px 0', fontSize: 15 }}>{s.label}</a>)}
                </div>
              )}
            </div>
          ))}
          <a href="/seance-essai" style={{ ...link, padding: '12px 0', fontWeight: 700 }}>Séance d’essai</a>
          <InscriptionCTA style={{ marginTop: 8, width: '100%' }} />
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .ksc-nav-desktop, .ksc-cta-desktop { display: none !important; }
          .ksc-burger { display: block !important; }
        }
        @media (min-width: 981px) { .ksc-mobile-panel { display: none !important; } }
      `}</style>
    </header>
  )
}
