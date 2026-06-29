'use client'

import React, { useState } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

const field: React.CSSProperties = {
  width: '100%', padding: '13px 16px', borderRadius: 10, border: '1px solid #d9d6cc',
  fontSize: 16, fontFamily: '"Inter", sans-serif', background: '#fff', color: '#081646',
}
const label: React.CSSProperties = { display: 'block', fontWeight: 700, color: '#081646', marginBottom: 6, fontSize: 14 }

export default function SeanceEssai() {
  const [sent, setSent] = useState(false)
  // PLACEHOLDER : aucun envoi (pas de CRM/Bodylink en preview). À brancher en prod.
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <>
      <SiteHeader />
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif', color: '#404a63' }}>
        <section style={{ background: 'linear-gradient(135deg,#1060c8,#e6007e)', color: '#fff', padding: '78px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <p style={{ fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, opacity: 0.9, margin: '0 0 14px' }}>Séance d’essai</p>
            <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, lineHeight: 1.05, margin: '0 0 16px' }}>Venez essayer, c’est la meilleure façon de découvrir</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, opacity: 0.95, margin: 0 }}>
              Réservez une séance d’essai : votre enfant découvre l’activité, vous rencontrez l’équipe, et vous décidez ensuite.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 620, margin: '0 auto', padding: '60px 24px 80px' }}>
          {sent ? (
            <div style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
              <h2 style={{ color: '#081646', fontSize: 24, fontWeight: 800, margin: '0 0 10px' }}>Merci !</h2>
              <p style={{ margin: 0, lineHeight: 1.6 }}>Votre demande est bien notée. Nous vous recontactons rapidement pour fixer la séance d’essai.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div><label style={label} htmlFor="prenom">Prénom du parent</label><input id="prenom" name="prenom" required style={field} /></div>
                <div><label style={label} htmlFor="nom">Nom</label><input id="nom" name="nom" required style={field} /></div>
              </div>
              <div><label style={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required style={field} /></div>
              <div><label style={label} htmlFor="tel">Téléphone</label><input id="tel" name="tel" type="tel" required style={field} /></div>
              <div><label style={label} htmlFor="age">Âge de l’enfant</label><input id="age" name="age" placeholder="ex. 4 ans" style={field} /></div>
              <div><label style={label} htmlFor="msg">Votre message (optionnel)</label><textarea id="msg" name="msg" rows={4} style={{ ...field, resize: 'vertical' }} /></div>
              <button type="submit" style={{ background: '#e6007e', color: '#fff', border: 'none', borderRadius: 70, padding: '15px 30px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Demander ma séance d’essai</button>
              <p style={{ fontSize: 13, textAlign: 'center', margin: 0, opacity: 0.7 }}>Ou appelez-nous au 02 47 44 41 43.</p>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
