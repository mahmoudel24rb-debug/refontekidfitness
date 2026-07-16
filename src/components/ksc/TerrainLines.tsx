import React from 'react'

// Signature graphique du site : « lignes de terrain » — tracé de terrain de sport
// (cercle central, ligne médiane, arcs de coin) en filigrane blanc sur les
// sections marines (heros intérieurs, blocs CTA, footer).
// Décoratif pur : aria-hidden, aucun événement pointeur, déborde légèrement.
export default function TerrainLines({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        style={{ display: 'block', opacity }}
      >
        {/* Ligne médiane (déborde en haut et en bas) */}
        <line x1="600" y1="-20" x2="600" y2="500" />
        {/* Cercle central + point d'engagement */}
        <circle cx="600" cy="240" r="150" />
        <circle cx="600" cy="240" r="4" />
        {/* Arcs de coin (corner kicks), débordant légèrement du cadre */}
        <path d="M -20 320 A 180 180 0 0 1 160 500" />
        <path d="M 1220 160 A 180 180 0 0 1 1040 -20" />
      </svg>
    </div>
  )
}
