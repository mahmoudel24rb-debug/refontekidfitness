'use client'

import React, { useState } from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import { KSC, display } from './ui'

const field: React.CSSProperties = {
  width: '100%', padding: '13px 16px', borderRadius: 10, border: `1px solid ${KSC.border}`,
  fontSize: 16, fontFamily: KSC.fontBody, background: '#fff', color: KSC.marine,
}
const label: React.CSSProperties = { display: 'block', fontWeight: 700, color: KSC.marine, marginBottom: 6, fontSize: 14 }

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

        <section style={{ maxWidth: 620, margin: '0 auto', padding: '60px 24px 80px' }}>
          <p style={{ margin: '0 0 28px', lineHeight: 1.7, fontSize: 16, textAlign: 'center' }}>
            La séance d’essai est gratuite. Votre demande est traitée directement par notre équipe, qui vous recontacte pour fixer le créneau.
          </p>
          {sent ? (
            <div className="ksc-card" style={{ padding: 40, textAlign: 'center' }}>
              <h2 style={{ ...display, color: KSC.marine, fontSize: 24, fontWeight: 800, margin: '0 0 10px' }}>Merci !</h2>
              <p style={{ margin: 0, lineHeight: 1.6 }}>Votre demande est bien notée. Nous vous recontactons rapidement pour fixer la séance d’essai.<br /><em>(Formulaire de démonstration — la transmission sera activée à la mise en ligne.)</em></p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="ksc-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div><label style={label} htmlFor="prenom">Prénom du parent</label><input id="prenom" name="prenom" required style={field} /></div>
                <div><label style={label} htmlFor="nom">Nom</label><input id="nom" name="nom" required style={field} /></div>
              </div>
              <div><label style={label} htmlFor="email">Email</label><input id="email" name="email" type="email" required style={field} /></div>
              <div><label style={label} htmlFor="tel">Téléphone</label><input id="tel" name="tel" type="tel" required style={field} /></div>
              <div><label style={label} htmlFor="age">Âge de l’enfant</label><input id="age" name="age" placeholder="ex. 4 ans" style={field} /></div>
              <div><label style={label} htmlFor="msg">Votre message (optionnel)</label><textarea id="msg" name="msg" rows={4} style={{ ...field, resize: 'vertical' }} /></div>
              <button type="submit" className="ksc-btn ksc-btn--primary">Demander ma séance d’essai</button>
              <p style={{ fontSize: 13, textAlign: 'center', margin: 0, opacity: 0.7 }}>Ou appelez-nous au 02 47 44 41 43.</p>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
