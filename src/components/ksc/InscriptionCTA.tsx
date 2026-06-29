import React from 'react'

// CTA « S'inscrire » — PLACEHOLDER. Pour la preview GitHub/Vercel, le bouton
// renvoie simplement vers /contact (n'envoie rien, pas de vente en ligne).
// EN PROD : remplacer BODYLINK_URL par l'URL/parcours Bodylink réel (ou brancher
// un onClick d'ouverture du module). C'est le SEUL endroit à modifier.
export const BODYLINK_URL = '/contact'

type Props = {
  label?: string
  variant?: 'primary' | 'light' | 'outline'
  style?: React.CSSProperties
}

const base: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontFamily: '"Inter", sans-serif',
  fontWeight: 700,
  fontSize: 16,
  lineHeight: 1,
  padding: '15px 30px',
  borderRadius: 70,
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'opacity .15s ease',
}

const variants: Record<string, React.CSSProperties> = {
  primary: { background: '#e6007e', color: '#fff', border: '2px solid #e6007e' },
  light: { background: '#fff', color: '#081646', border: '2px solid #fff' },
  outline: { background: 'transparent', color: '#081646', border: '2px solid #081646' },
}

export default function InscriptionCTA({ label = "S’inscrire", variant = 'primary', style }: Props) {
  return (
    <a href={BODYLINK_URL} data-bodylink="placeholder" style={{ ...base, ...variants[variant], ...style }}>
      {label}
    </a>
  )
}
