import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

// Avatar illustré d'un avis parent : 3 bustes flat de la charte KSC
// (marine / magenta / royal sur fond clair), attribués par index et donc
// stables d'un rendu à l'autre. Illustrations en attendant d'éventuelles
// photos réelles. Décoratif : alt vide, l'auteur est écrit à côté.
const ILLUSTRATIONS = [
  '/assets/ksc/avis-illu-1.svg',
  '/assets/ksc/avis-illu-2.svg',
  '/assets/ksc/avis-illu-3.svg',
]

export default function AvisAvatar({
  index = 0,
  size = 40,
  className,
}: {
  index?: number
  size?: number
  className?: string
}) {
  return (
    <Image
      src={ILLUSTRATIONS[index % ILLUSTRATIONS.length]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      // SVG : l'optimiseur d'images est court-circuité (pas de
      // `dangerouslyAllowSVG` dans next.config, et rien à optimiser ici).
      unoptimized
      className={cn('shrink-0 rounded-full', className)}
    />
  )
}
