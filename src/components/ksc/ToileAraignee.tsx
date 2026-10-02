import React from 'react'

import { cn } from '@/lib/utils'

// Toile d'araignée d'angle (décor Halloween), accrochée au coin supérieur
// gauche de son conteneur : fils radiaux partant du coin, fils spiralés qui
// s'affaissent entre deux rayons, comme une vraie toile tendue dans un coin.
// Tracé calculé une fois (déterministe), SVG en trait seul, couleur héritée
// (currentColor). `inverse` : coin supérieur droit.

const TAILLE = 240
const RAYONS = [0, 14, 29, 45, 61, 76, 90] // angles des fils radiaux, en degrés
const ANNEAUX = [0.2, 0.34, 0.5, 0.66, 0.82] // fils spiralés, en fraction de la taille
// Légère irrégularité des fils spiralés selon le rayon, pour un rendu naturel.
const DECALAGE = [1, 0.96, 1.03, 0.98, 1.02, 0.97, 1]

const point = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return [r * Math.cos(a), r * Math.sin(a)] as const
}
const f = (n: number) => n.toFixed(1)

const TRACE = (() => {
  const chemins: string[] = []
  for (const deg of RAYONS) {
    const [x, y] = point(TAILLE * 1.02, deg)
    chemins.push(`M0 0L${f(x)} ${f(y)}`)
  }
  for (const anneau of ANNEAUX) {
    for (let i = 0; i < RAYONS.length - 1; i++) {
      const r1 = TAILLE * anneau * DECALAGE[i]
      const r2 = TAILLE * anneau * DECALAGE[i + 1]
      const [x1, y1] = point(r1, RAYONS[i])
      const [x2, y2] = point(r2, RAYONS[i + 1])
      // Point de contrôle tiré vers le coin : le fil s'affaisse entre deux rayons.
      const [cx, cy] = point(((r1 + r2) / 2) * 0.8, (RAYONS[i] + RAYONS[i + 1]) / 2)
      chemins.push(`M${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`)
    }
  }
  return chemins.join('')
})()

export default function ToileAraignee({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${TAILLE} ${TAILLE}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      className={cn('pointer-events-none select-none', inverse && '-scale-x-100', className)}
    >
      <path d={TRACE} />
    </svg>
  )
}
