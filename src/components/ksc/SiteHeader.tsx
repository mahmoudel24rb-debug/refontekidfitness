'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import InscriptionCTA from './InscriptionCTA'
import { PRESTATIONS } from './prestations'
import { KSC } from './ui'

// Header KSC partagé (nouvelles pages). Charte : fond crème, logo, nav, CTA magenta.
// Structure/dimensions validées client — ne pas les changer. Ajouts charte :
// sticky + fond crème 97 % / ombre / blur au scroll, soulignement magenta animé,
// lien actif magenta, sous-menu radius 16 + ombre md.
// Pas d'entrée « Accueil » (le logo y renvoie) ni « Contact » (présent au footer, et
// le CTA « S'inscrire » y mène tant que l'inscription en ligne n'est pas branchée) :
// le header est réservé aux deux chemins de conversion — séance d'essai et inscription.
const NAV = [
  { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
  { label: 'Nos prestations', href: '/nos-prestations', sub: PRESTATIONS.map((p) => ({ label: p.titre, href: `/nos-prestations/${p.slug}` })) },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Planning', href: '/planning' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
]

const link: React.CSSProperties = {
  color: KSC.marine, fontFamily: KSC.fontBody, fontWeight: 600, fontSize: 16,
  textDecoration: 'none', whiteSpace: 'nowrap',
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [presOpen, setPresOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => (pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`)))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`ksc-header${scrolled ? ' is-scrolled' : ''}`} style={{ background: KSC.cream, fontFamily: KSC.fontBody }}>
      <div className="ksc-header-inner" style={{ maxWidth: 1480, margin: '0 auto', padding: '18px 44px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 56 }}>
        <a href="/" aria-label="Kid Sport Club — accueil" style={{ display: 'block', flexShrink: 0 }}>
          <img src="/assets/ksc-logo.png" alt="Kid Sport Club" style={{ height: 60, width: 'auto', display: 'block' }} />
        </a>

        {/* Nav desktop */}
        <nav className="ksc-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {NAV.map((item) => (
            <div key={item.href} style={{ position: 'relative' }}
              onMouseEnter={() => item.sub && setPresOpen(true)} onMouseLeave={() => item.sub && setPresOpen(false)}>
              <a href={item.href} className="ksc-nav-link"
                aria-current={isActive(item.href) ? 'page' : undefined}
                style={{ ...link, color: isActive(item.href) ? KSC.magenta : KSC.marine }}>
                {item.label}
                {item.sub && (
                  <svg aria-hidden="true" width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6, verticalAlign: 'middle' }}><path d="M1 1.5l4 4 4-4" /></svg>
                )}
              </a>
              {item.sub && presOpen && (
                <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 12, zIndex: 100 }}>
                  <div style={{ background: KSC.white, borderRadius: KSC.radiusCard, border: `1px solid ${KSC.border}`, padding: 16, minWidth: 230, boxShadow: KSC.shadowMd, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {item.sub.map((s) => (
                      <a key={s.href} href={s.href} className="ksc-nav-link"
                        aria-current={isActive(s.href) ? 'page' : undefined}
                        style={{ ...link, fontSize: 15, fontWeight: 700, alignSelf: 'flex-start', color: isActive(s.href) ? KSC.magenta : KSC.marine }}>{s.label}</a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ksc-cta-desktop" style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <a href="/seance-essai" className="ksc-nav-link" style={{ ...link, fontWeight: 700, color: isActive('/seance-essai') ? KSC.magenta : KSC.marine }}>Séance d’essai</a>
          <InscriptionCTA style={{ padding: '14px 28px', fontSize: 15 }} />
        </div>

        {/* Burger mobile */}
        <button className="ksc-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={KSC.marine} strokeWidth="2.2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
      </div>

      {/* Panneau mobile */}
      {open && (
        <div className="ksc-mobile-panel" style={{ borderTop: `1px solid ${KSC.border}`, background: KSC.cream, padding: '12px 24px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map((item) => (
            <div key={item.href}>
              <a href={item.href} style={{ ...link, display: 'block', padding: '12px 0', fontSize: 17, color: isActive(item.href) ? KSC.magenta : KSC.marine }}>{item.label}</a>
              {item.sub && (
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 16, borderLeft: `2px solid ${KSC.magenta}`, marginBottom: 8 }}>
                  {item.sub.map((s) => <a key={s.href} href={s.href} style={{ ...link, padding: '8px 0', fontSize: 15, color: isActive(s.href) ? KSC.magenta : KSC.marine }}>{s.label}</a>)}
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
          /* les 44px de respiration du desktop mangeraient la largeur sur mobile */
          .ksc-header-inner { padding-left: 20px !important; padding-right: 20px !important; }
        }
        @media (min-width: 981px) { .ksc-mobile-panel { display: none !important; } }
      `}</style>
    </header>
  )
}
