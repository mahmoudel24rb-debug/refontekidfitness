import React from 'react'

// CTA « S'inscrire » — PLACEHOLDER. Pour la preview GitHub/Vercel, le bouton
// renvoie simplement vers /contact (n'envoie rien, pas de vente en ligne).
// EN PROD : remplacer BODYLINK_URL par l'URL/parcours Bodylink réel (ou brancher
// un onClick d'ouverture du module). C'est le SEUL endroit à modifier.
export const BODYLINK_URL = '/contact'
// Alias neutre pour les autres composants : le nom de l'outil d'inscription
// (jargon interne) ne doit apparaître qu'ici.
export const INSCRIPTION_URL = BODYLINK_URL

type Props = {
  label?: string
  variant?: 'primary' | 'light' | 'outline' | 'cream'
  style?: React.CSSProperties
}

// Système de boutons unique de la charte : classes .ksc-btn définies dans
// overrides.css (pill, transitions et hovers y compris reduced-motion).
const variantClass: Record<string, string> = {
  primary: 'ksc-btn--primary',
  light: 'ksc-btn--light',
  outline: 'ksc-btn--secondary',
  cream: 'ksc-btn--cream',
}

export default function InscriptionCTA({ label = "S’inscrire", variant = 'primary', style }: Props) {
  return (
    <a href={BODYLINK_URL} data-bodylink="placeholder" className={`ksc-btn ${variantClass[variant]}`} style={style}>
      {label}
    </a>
  )
}
