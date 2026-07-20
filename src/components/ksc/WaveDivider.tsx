import React from 'react'

// Séparateur organique : une seule courbe douce (vague/colline) entre deux
// sections de fonds différents. Décoratif pur (aria-hidden), pleine largeur,
// hauteur fixe SANS texte (SVG seul) — pas de zigzag.
// `colorTop` = fond de la section au-dessus, `colorBottom` = fond de celle en dessous.
type Props = {
  colorTop: string
  colorBottom: string
  height?: number // 48–64px conseillé
}

export default function WaveDivider({ colorTop, colorBottom, height = 56 }: Props) {
  return (
    <div aria-hidden="true" style={{ background: colorTop, lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        focusable="false"
        style={{ display: 'block', width: '100%', height }}
      >
        <path
          d="M0 44 C 260 66, 560 6, 900 18 C 1120 26, 1310 38, 1440 28 L 1440 64 L 0 64 Z"
          fill={colorBottom}
        />
      </svg>
    </div>
  )
}
