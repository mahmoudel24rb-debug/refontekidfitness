'use client'

import React, { useState } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import Underline from './Underline'
import { KSC, display } from './ui'

// Champs premium : 52px de haut, fond légèrement teinté, bordure douce,
// radius 12 (focus ring royal = règle globale overrides.css).
const field: React.CSSProperties = {
  width: '100%', height: 52, padding: '0 16px', borderRadius: 12, border: '1.5px solid #e5dfd0',
  fontSize: 16, fontFamily: KSC.fontBody, background: '#fdfcf7', color: KSC.marine,
}
const area: React.CSSProperties = { ...field, height: 'auto', minHeight: 140, padding: '14px 16px', resize: 'vertical' }
const label: React.CSSProperties = { display: 'block', fontWeight: 600, color: KSC.marine, marginBottom: 6, fontSize: 14 }

// Icônes SVG rondes (pas d'emoji).
function RoundIcon({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: 'rgba(16,96,200,.1)', color: KSC.royal, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </span>
  )
}
const ICONES: Record<string, React.ReactNode> = {
  Téléphone: (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  ),
  Email: (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
  ),
  Adresse: (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
}
const ICON_CLOCK = (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
)

const INFOS = [
  { t: 'Téléphone', v: '02 47 44 41 43', href: 'tel:+33247444143' },
  { t: 'Email', v: 'kidfitnessrochecorbon@gmail.com', href: 'mailto:kidfitnessrochecorbon@gmail.com' },
  { t: 'Adresse', v: '1 Quai de la Loire, 37210 Rochecorbon', href: 'https://maps.google.com/?q=1+Quai+de+la+Loire+37210+Rochecorbon' },
]

export default function ContactKSC() {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER : aucun envoi en preview (outil interne non branché). À brancher en prod.
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        <HeroMarine
          kicker="Contact"
          title="Contactez-nous"
          sub="Une question, une inscription, une visite ? L’équipe du Kid Sport Club vous répond."
          padding="72px 24px"
          maxWidth={640}
        />

        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 90px' }}>
          <div className="ksc-form-grid">
            {/* Carte formulaire */}
            <div className="ksc-reveal" style={{ background: KSC.white, border: `1px solid ${KSC.border}`, borderRadius: 24, boxShadow: KSC.shadowMd, padding: 'clamp(26px,4vw,44px)' }}>
              <h2 style={{ ...display, fontSize: 26, fontWeight: 800, color: KSC.marine, margin: '0 0 24px' }}>Envoyez-nous un <Underline>message</Underline></h2>
              {sent ? (
                <p style={{ margin: 0, lineHeight: 1.6 }}><strong style={{ color: KSC.marine }}>Merci !</strong> Votre message est bien noté, nous revenons vers vous rapidement.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
              ) : (
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18 }}>
                    <div><label style={label} htmlFor="p">Prénom</label><input id="p" required style={field} /></div>
                    <div><label style={label} htmlFor="n">Nom</label><input id="n" required style={field} /></div>
                  </div>
                  <div><label style={label} htmlFor="e">Email</label><input id="e" type="email" required style={field} /></div>
                  <div><label style={label} htmlFor="t">Téléphone</label><input id="t" type="tel" style={field} /></div>
                  <div><label style={label} htmlFor="m">Message</label><textarea id="m" rows={5} required style={area} /></div>
                  <button type="submit" className="ksc-btn ksc-btn--primary" style={{ width: '100%' }}>Envoyer</button>
                </form>
              )}
            </div>

            {/* Colonne réassurance : coordonnées, horaires, plan */}
            <aside className="ksc-reveal">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 26 }}>
                {INFOS.map((i) => (
                  <a key={i.t} href={i.href} style={{ display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none', color: KSC.marine, fontWeight: 600, overflowWrap: 'anywhere' }}>
                    <RoundIcon>{ICONES[i.t]}</RoundIcon>
                    <span>
                      <span style={{ display: 'block', color: KSC.magenta, fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 2 }}>{i.t}</span>
                      {i.v}
                    </span>
                  </a>
                ))}
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <RoundIcon>{ICON_CLOCK}</RoundIcon>
                  <p style={{ margin: 0, color: KSC.marine, fontWeight: 600, lineHeight: 1.6 }}>
                    <strong>Horaires :</strong> Lun–Ven : 9h00–19h30 (sans coupure) · Samedi : 9h30–12h30
                  </p>
                </div>
              </div>

              <h2 style={{ ...display, fontSize: 22, fontWeight: 800, color: KSC.marine, margin: '0 0 16px' }}>Nous <Underline>trouver</Underline></h2>
              <iframe
                title="Plan — Kid Sport Club Rochecorbon"
                src="https://maps.google.com/maps?q=1%20Quai%20de%20la%20Loire%2037210%20Rochecorbon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ width: '100%', height: 320, border: `1px solid ${KSC.border}`, borderRadius: KSC.radiusCard }}
                loading="lazy"
              />
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
