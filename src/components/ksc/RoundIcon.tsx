import React from 'react'

import { cn } from '@/lib/utils'

// Pastille ronde royal/10 pour icônes lucide (listes d'atouts, coordonnées…).
// Cercle garanti : largeur = hauteur (size + aspect-square), border-radius 50 %,
// shrink-0 pour que les conteneurs flex ne l'écrasent jamais en ovale/carré.
type RoundIconProps = React.ComponentProps<'span'>

export default function RoundIcon({ className, children, ...props }: RoundIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-10 shrink-0 aspect-square rounded-[50%] bg-royal/10 text-royal inline-flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
