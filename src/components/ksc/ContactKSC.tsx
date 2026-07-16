'use client'

import React, { useState } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import Underline from './Underline'
import { KSC, display } from './ui'

const field: React.CSSProperties = { width: '100%', padding: '13px 16px', borderRadius: 10, border: `1px solid ${KSC.border}`, fontSize: 16, fontFamily: KSC.fontBody, background: '#fff', color: KSC.marine }
const label: React.CSSProperties = { display: 'block', fontWeight: 700, color: KSC.marine, marginBottom: 6, fontSize: 14 }

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

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 22 }}>
            {INFOS.map((i) => (
              <a key={i.t} href={i.href} className="ksc-card ksc-reveal" style={{ padding: 28, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                <p style={{ color: KSC.magenta, fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 8px' }}>{i.t}</p>
                <p style={{ color: KSC.marine, fontWeight: 600, margin: 0, lineHeight: 1.5, overflowWrap: 'anywhere' }}>{i.v}</p>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 22, color: KSC.marine }}>
            <strong>Horaires :</strong> Lun–Ven : 9h00–19h30 (sans coupure) · Samedi : 9h30–12h30
          </div>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 40, alignItems: 'start' }}>
          {/* Formulaire (placeholder) */}
          <div className="ksc-reveal">
            <h2 style={{ ...display, fontSize: 26, fontWeight: 800, color: KSC.marine, margin: '0 0 20px' }}>Envoyez-nous un <Underline>message</Underline></h2>
            {sent ? (
              <div className="ksc-card" style={{ padding: 30 }}>
                <p style={{ margin: 0, lineHeight: 1.6 }}><strong style={{ color: KSC.marine }}>Merci !</strong> Votre message est bien noté, nous revenons vers vous rapidement.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
              </div>
            ) : (
              <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={label} htmlFor="p">Prénom</label><input id="p" required style={field} /></div>
                  <div><label style={label} htmlFor="n">Nom</label><input id="n" required style={field} /></div>
                </div>
                <div><label style={label} htmlFor="e">Email</label><input id="e" type="email" required style={field} /></div>
                <div><label style={label} htmlFor="t">Téléphone</label><input id="t" type="tel" style={field} /></div>
                <div><label style={label} htmlFor="m">Message</label><textarea id="m" rows={5} required style={{ ...field, resize: 'vertical' }} /></div>
                <button type="submit" className="ksc-btn ksc-btn--primary" style={{ alignSelf: 'flex-start' }}>Envoyer</button>
              </form>
            )}
          </div>
          {/* Carte */}
          <div className="ksc-reveal">
            <h2 style={{ ...display, fontSize: 26, fontWeight: 800, color: KSC.marine, margin: '0 0 20px' }}>Nous <Underline>trouver</Underline></h2>
            <iframe
              title="Plan — Kid Sport Club Rochecorbon"
              src="https://maps.google.com/maps?q=1%20Quai%20de%20la%20Loire%2037210%20Rochecorbon&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ width: '100%', height: 380, border: `1px solid ${KSC.border}`, borderRadius: KSC.radiusCard }}
              loading="lazy"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
