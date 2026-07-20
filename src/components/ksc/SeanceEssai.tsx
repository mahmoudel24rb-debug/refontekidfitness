'use client'

import React, { useState } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import { KSC, display } from './ui'

// Champs premium : 52px de haut, fond légèrement teinté, bordure douce,
// radius 12 (focus ring royal = règle globale overrides.css).
const field: React.CSSProperties = {
  width: '100%', height: 52, padding: '0 16px', borderRadius: 12, border: '1.5px solid #e5dfd0',
  fontSize: 16, fontFamily: KSC.fontBody, background: '#fdfcf7', color: KSC.marine,
}
const area: React.CSSProperties = { ...field, height: 'auto', minHeight: 120, padding: '14px 16px', resize: 'vertical' }
const label: React.CSSProperties = { display: 'block', fontWeight: 600, color: KSC.marine, marginBottom: 6, fontSize: 14 }

// Points de réassurance — reformulés à partir du texte existant de la page
// (« La séance d'essai est gratuite. Votre demande est traitée directement par
// notre équipe, qui vous recontacte pour fixer le créneau. »).
const POINTS = ['Gratuite et sans engagement', 'Réponse rapide de l’équipe', 'On vous trouve le bon créneau']

// Icônes SVG rondes de la colonne réassurance (pas d'emoji).
function RoundIcon({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden style={{ flexShrink: 0, width: 40, height: 40, borderRadius: '50%', background: 'rgba(16,96,200,.1)', color: KSC.royal, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </span>
  )
}
const ICON_PHONE = (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
)
const ICON_MAIL = (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
)
const ICON_PIN = (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
)
const ICON_CLOCK = (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
)

export default function SeanceEssai() {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER : aucun envoi en preview (outil interne non branché). À brancher en prod.
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        <HeroMarine
          kicker="Séance d’essai"
          title="Venez essayer, c’est la meilleure façon de découvrir"
          sub="Réservez une séance d’essai gratuite : votre enfant découvre l’activité, vous rencontrez l’équipe, et vous décidez ensuite."
          padding="78px 24px"
          maxWidth={760}
        />

        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 90px' }}>
          <div className="ksc-form-grid">
            {/* Carte formulaire */}
            <div className="ksc-reveal" style={{ background: KSC.white, border: `1px solid ${KSC.border}`, borderRadius: 24, boxShadow: KSC.shadowMd, padding: 'clamp(26px,4vw,44px)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h2 style={{ ...display, color: KSC.marine, fontSize: 24, fontWeight: 800, margin: '0 0 10px' }}>Merci !</h2>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>Votre demande est bien notée. Nous vous recontactons rapidement pour fixer la séance d’essai.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
                </div>
              ) : (
                <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 18 }}>
                    <div><label style={label} htmlFor="prenom">Prénom du parent</label><input id="prenom" name="prenom" required style={field} /></div>
                    <div><label style={label} htmlFor="nom">Nom</label><input id="nom" name="nom" required style={field} /></div>
                  </div>
                  <div><label style={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required style={field} /></div>
                  <div><label style={label} htmlFor="tel">Téléphone</label><input id="tel" name="tel" type="tel" required style={field} /></div>
                  <div><label style={label} htmlFor="age">Âge de l’enfant</label><input id="age" name="age" placeholder="ex. 4 ans" style={field} /></div>
                  <div><label style={label} htmlFor="msg">Votre message (optionnel)</label><textarea id="msg" name="msg" rows={4} style={area} /></div>
                  <button type="submit" className="ksc-btn ksc-btn--primary" style={{ width: '100%' }}>Demander ma séance d’essai</button>
                  <p style={{ fontSize: 13, textAlign: 'center', margin: 0, opacity: 0.7 }}>Ou appelez-nous au 02 47 44 41 43.</p>
                </form>
              )}
            </div>

            {/* Colonne réassurance */}
            <aside className="ksc-reveal">
              <p style={{ margin: '0 0 24px', lineHeight: 1.7, fontSize: 16 }}>
                La séance d’essai est gratuite. Votre demande est traitée directement par notre équipe, qui vous recontacte pour fixer le créneau.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {POINTS.map((pt) => (
                  <li key={pt} style={{ display: 'flex', gap: 12, alignItems: 'center', color: KSC.marine, fontWeight: 600, fontSize: 16 }}>
                    <span aria-hidden style={{ flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: KSC.magenta, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <a href="tel:+33247444143" style={{ display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none', color: KSC.marine, fontWeight: 600 }}>
                  <RoundIcon>{ICON_PHONE}</RoundIcon>
                  02 47 44 41 43
                </a>
                <a href="mailto:kidfitnessrochecorbon@gmail.com" style={{ display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none', color: KSC.marine, fontWeight: 600, overflowWrap: 'anywhere' }}>
                  <RoundIcon>{ICON_MAIL}</RoundIcon>
                  kidfitnessrochecorbon@gmail.com
                </a>
                <a href="https://maps.google.com/?q=1+Quai+de+la+Loire+37210+Rochecorbon" style={{ display: 'flex', gap: 14, alignItems: 'center', textDecoration: 'none', color: KSC.marine, fontWeight: 600 }}>
                  <RoundIcon>{ICON_PIN}</RoundIcon>
                  1 Quai de la Loire, 37210 Rochecorbon
                </a>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <RoundIcon>{ICON_CLOCK}</RoundIcon>
                  <p style={{ margin: 0, color: KSC.marine, fontWeight: 600, lineHeight: 1.6 }}>
                    Lun–Ven : 9h00–19h30 (sans coupure)<br />Samedi : 9h30–12h30
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
