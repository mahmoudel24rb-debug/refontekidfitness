import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

// Avatar d'un avis parent.
// - `photo` fournie (vraie photo de profil, chemin dans public/) : affichée en
//   rond, recadrée en `object-cover` ;
// - sinon : MONOGRAMME à la Google — pastille de couleur (palette du site,
//   rotation stable par index) avec les initiales réelles de l'auteur.
//   Les profils Google des parents du club n'ont pas de portraits : le
//   monogramme aux initiales exactes est le rendu le plus authentique.
// Décoratif : aria-hidden, l'auteur est écrit juste à côté.
const COULEURS = ['bg-marine', 'bg-magenta', 'bg-royal']

const initiales = (auteur: string) =>
  auteur
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((m) => m[0]?.toUpperCase() ?? '')
    .join('')

export default function AvisAvatar({
  auteur = '',
  index = 0,
  photo,
  size = 40,
  className,
}: {
  auteur?: string
  index?: number
  photo?: string
  size?: number
  className?: string
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={cn('shrink-0 rounded-full object-cover', className)}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-heading font-bold text-white',
        COULEURS[index % COULEURS.length],
        className,
      )}
    >
      {initiales(auteur)}
    </span>
  )
}
