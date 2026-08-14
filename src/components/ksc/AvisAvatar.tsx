import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'

// Avatar d'un avis parent.
// - `photo` fournie (photo de profil Google du parent, dans
//   public/assets/ksc/avis) : elle est affichée en rond, recadrée en
//   `object-cover` pour rester nette quel que soit le format d'origine ;
// - sinon : repli sur l'un des 3 bustes flat de la charte KSC
//   (marine / magenta / royal), attribués par index et donc stables d'un rendu
//   à l'autre.
// Décoratif dans les deux cas : alt vide, l'auteur est écrit juste à côté.
const ILLUSTRATIONS = [
  '/assets/ksc/avis-illu-1.svg',
  '/assets/ksc/avis-illu-2.svg',
  '/assets/ksc/avis-illu-3.svg',
]

export default function AvisAvatar({
  index = 0,
  photo,
  size = 40,
  className,
}: {
  index?: number
  photo?: string
  size?: number
  className?: string
}) {
  const src = photo ?? ILLUSTRATIONS[index % ILLUSTRATIONS.length]
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      // Illustrations SVG : l'optimiseur d'images est court-circuité (pas de
      // `dangerouslyAllowSVG` dans next.config, et rien à optimiser ici). Les
      // photos, elles, passent bien par l'optimiseur.
      unoptimized={!photo}
      className={cn('shrink-0 rounded-full object-cover', className)}
    />
  )
}
