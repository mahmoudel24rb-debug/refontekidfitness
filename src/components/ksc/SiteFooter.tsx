import React from 'react'
import { PRESTATIONS } from './prestations'
import TerrainLines from './TerrainLines'
import Reveal from './Reveal'
import { KSC, display } from './ui'

// Footer KSC partagé (nouvelles pages). Fond marine secondaire (--ksc-navy2),
// lignes de terrain en filigrane, liens crème 85 % -> magenta clair au hover
// (classe .ksc-footer, overrides.css). Le magenta ne sert plus de fond.
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 10 }
const link: React.CSSProperties = { fontSize: 15, alignSelf: 'flex-start' }
const title: React.CSSProperties = { ...display, color: KSC.cream, fontWeight: 700, fontSize: 17, marginBottom: 6 }

export default function SiteFooter() {
  return (
    <footer className="ksc-footer" style={{ position: 'relative', background: KSC.navy2, color: KSC.cream, fontFamily: KSC.fontBody, overflow: 'hidden' }}>
      <TerrainLines opacity={0.045} />
      {/* Observer global des apparitions au scroll (.ksc-reveal) — voir Reveal.tsx. */}
      <Reveal />
      <div style={{ position: 'relative', maxWidth: 1320, margin: '0 auto', padding: '64px 24px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
        <div style={{ ...col, gap: 16 }}>
          <span style={{ ...display, fontSize: 24, fontWeight: 800, color: KSC.cream }}>Kid Sport Club</span>
          <p style={{ margin: 0, color: 'rgba(251,249,240,.85)', lineHeight: 1.6, maxWidth: 280 }}>
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
          <a href="/tarifs" style={link}>Tarifs</a>
          <a href="/planning" style={link}>Planning</a>
          <a href="/faq" style={link}>FAQ</a>
          <a href="/blog" style={link}>Blog</a>
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
          <a href="tel:+33247444143" style={link}>02 47 44 41 43</a>
          <a href="mailto:kidfitnessrochecorbon@gmail.com" style={link}>kidfitnessrochecorbon@gmail.com</a>
          <span style={{ ...link, color: 'rgba(251,249,240,.85)' }}>Lun–Ven : 9h00–19h30 (sans coupure)</span>
          <span style={{ ...link, color: 'rgba(251,249,240,.85)' }}>Samedi : 9h30–12h30</span>
        </div>
      </div>

      <div style={{ position: 'relative', background: '#0a1a4f', padding: '18px 24px', textAlign: 'center', fontSize: 13, color: 'rgba(251,249,240,.75)' }}>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
          <a href="/mentions-legales" style={{ fontSize: 13 }}>Mentions légales</a>
          <a href="/confidentialite" style={{ fontSize: 13 }}>Confidentialité</a>
          <a href="/cookies" style={{ fontSize: 13 }}>Cookies</a>
          <a href="/cgv" style={{ fontSize: 13 }}>CGV</a>
        </div>
        © 2026 Kid Sport Club Rochecorbon. Tous droits réservés. Réalisé par DGL Agency.
      </div>
    </footer>
  )
}
