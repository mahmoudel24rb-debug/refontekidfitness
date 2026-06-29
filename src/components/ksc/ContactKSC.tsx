'use client'

import React, { useState } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

const field: React.CSSProperties = { width: '100%', padding: '13px 16px', borderRadius: 10, border: '1px solid #d9d6cc', fontSize: 16, fontFamily: '"Inter", sans-serif', background: '#fff', color: '#081646' }
const label: React.CSSProperties = { display: 'block', fontWeight: 700, color: '#081646', marginBottom: 6, fontSize: 14 }

const INFOS = [
  { t: 'Téléphone', v: '02 47 44 41 43', href: 'tel:0247444143' },
  { t: 'Email', v: 'kidfitnessrochecorbon@gmail.com', href: 'mailto:kidfitnessrochecorbon@gmail.com' },
  { t: 'Adresse', v: '1 Quai de la Loire, 37210 Rochecorbon', href: 'https://maps.google.com/?q=1+Quai+de+la+Loire+37210+Rochecorbon' },
]

export default function ContactKSC() {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER : aucun envoi (pas de CRM en preview). À brancher en prod.
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <>
      <SiteHeader />
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif', color: '#404a63' }}>
        <section style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', padding: '72px 24px', textAlign: 'center' }}>
          <p style={{ color: '#e6007e', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 14px' }}>Contact</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#081646', letterSpacing: '-0.02em', margin: '0 0 12px' }}>Contactez-nous</h1>
          <p style={{ fontSize: 18, maxWidth: 640, margin: '0 auto' }}>Une question, une inscription, une visite ? L’équipe du Kid Sport Club vous répond.</p>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 22 }}>
            {INFOS.map((i) => (
              <a key={i.t} href={i.href} style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', borderRadius: 16, padding: 28, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                <p style={{ color: '#e6007e', fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.04em', margin: '0 0 8px' }}>{i.t}</p>
                <p style={{ color: '#081646', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{i.v}</p>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 22, color: '#081646' }}>
            <strong>Horaires :</strong> Lun–Ven 9h30–12h30 et 16h00–19h30 · Samedi 9h30–17h30
          </div>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 40, alignItems: 'start' }}>
          {/* Formulaire (placeholder) */}
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#081646', margin: '0 0 20px' }}>Envoyez-nous un message</h2>
            {sent ? (
              <div style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', borderRadius: 14, padding: 30 }}>
                <p style={{ margin: 0, lineHeight: 1.6 }}><strong style={{ color: '#081646' }}>Merci !</strong> Votre message est bien noté, nous revenons vers vous rapidement.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
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
                <button type="submit" style={{ background: '#e6007e', color: '#fff', border: 'none', borderRadius: 70, padding: '15px 30px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Envoyer</button>
              </form>
            )}
          </div>
          {/* Carte */}
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#081646', margin: '0 0 20px' }}>Nous trouver</h2>
            <iframe
              title="Plan — Kid Sport Club Rochecorbon"
              src="https://maps.google.com/maps?q=1%20Quai%20de%20la%20Loire%2037210%20Rochecorbon&t=&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ width: '100%', height: 380, border: 0, borderRadius: 16 }}
              loading="lazy"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
