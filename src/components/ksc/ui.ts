import type React from 'react'

// Tokens de la charte « club sportif enfants » — miroir TS des custom properties
// définies dans src/app/overrides.css (garder les deux synchronisés).
export const KSC = {
  marine: '#081646',
  navy2: '#122a63',
  magenta: '#e6007e',
  magentaHover: '#c4006b',
  magentaLight: '#ff5aa8', // kickers/liens sur fond marine (contraste AA)
  royal: '#1060c8',
  cream: '#fbf9f0',
  cream2: '#f5f1e3',
  white: '#fff',
  border: '#eae5d6',
  radiusCard: 16,
  radiusPill: 70,
  shadowSm: '0 2px 8px rgba(8,22,70,.06)',
  shadowMd: '0 12px 28px rgba(8,22,70,.12)',
  fontDisplay: "var(--font-display), 'Baloo 2', sans-serif",
  fontBody: 'var(--font-body), Inter, sans-serif',
} as const

// Fragments de style partagés (styles inline des composants ksc).
// Titres display (Baloo 2) — H1/H2/H3.
export const display: React.CSSProperties = {
  fontFamily: KSC.fontDisplay,
  letterSpacing: '-0.01em',
}

// Kicker uppercase (eyebrow) — reste Inter 700 letterspaced.
export const kicker: React.CSSProperties = {
  fontFamily: KSC.fontBody,
  fontWeight: 700,
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  fontSize: 14,
}

// Corps de texte par défaut des pages intérieures.
export const bodyText: React.CSSProperties = {
  fontFamily: KSC.fontBody,
  color: '#404a63',
}
