import React from 'react'
import { PRESTATIONS } from './prestations'

// Footer KSC partagé (nouvelles pages). Fond magenta, liens blancs.
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 10 }
const link: React.CSSProperties = { color: '#fff', opacity: 0.92, textDecoration: 'none', fontSize: 15 }
const title: React.CSSProperties = { color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 6, letterSpacing: '.02em' }

export default function SiteFooter() {
  return (
    <footer style={{ background: '#e6007e', color: '#fff', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '64px 24px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        <div style={{ ...col, gap: 16 }}>
          <span style={{ fontSize: 24, fontWeight: 800 }}>Kid Sport Club</span>
          <p style={{ margin: 0, opacity: 0.92, lineHeight: 1.6, maxWidth: 280 }}>
            Le club de sport des enfants de 10 mois à 14 ans, à Rochecorbon — bouger, grandir, s’épanouir.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://www.facebook.com" aria-label="Facebook" style={{ ...link, fontWeight: 700 }}>Facebook</a>
            <a href="https://www.instagram.com" aria-label="Instagram" style={{ ...link, fontWeight: 700 }}>Instagram</a>
          </div>
        </div>

        <div style={col}>
          <span style={title}>Navigation</span>
          <a href="/" style={link}>Accueil</a>
          <a href="/qui-sommes-nous" style={link}>Qui sommes-nous</a>
          <a href="/nos-prestations" style={link}>Nos prestations</a>
          <a href="/faq" style={link}>FAQ</a>
          <a href="/contact" style={link}>Contact</a>
          <a href="/seance-essai" style={link}>Séance d’essai</a>
        </div>

        <div style={col}>
          <span style={title}>Nos prestations</span>
          {PRESTATIONS.map((p) => <a key={p.slug} href={`/nos-prestations/${p.slug}`} style={link}>{p.titre}</a>)}
        </div>

        <div style={col}>
          <span style={title}>Infos</span>
          <a href="/contact" style={link}>1 Quai de la Loire, 37210 Rochecorbon</a>
          <a href="tel:0247444143" style={link}>02 47 44 41 43</a>
          <a href="mailto:kidfitnessrochecorbon@gmail.com" style={link}>kidfitnessrochecorbon@gmail.com</a>
          <span style={{ ...link, opacity: 0.92 }}>Lun–Ven : 9h30–12h30 / 16h–19h30</span>
          <span style={{ ...link, opacity: 0.92 }}>Samedi : 9h30–17h30</span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,.25)', padding: '18px 24px', textAlign: 'center', fontSize: 13, opacity: 0.9 }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
          <a href="/mentions-legales" style={link}>Mentions légales</a>
          <a href="/confidentialite" style={link}>Confidentialité</a>
          <a href="/cookies" style={link}>Cookies</a>
          <a href="/cgv" style={link}>CGV</a>
        </div>
        © 2026 Kid Sport Club Rochecorbon. Tous droits réservés. Réalisé par DGL Agency.
      </div>
    </footer>
  )
}
