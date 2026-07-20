import React from 'react'

import { cn } from '@/lib/utils'

// Pastille ronde royal/10 pour icônes lucide (listes d'atouts, coordonnées…).
type RoundIconProps = React.ComponentProps<'span'>

export default function RoundIcon({ className, children, ...props }: RoundIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'size-10 rounded-full bg-royal/10 text-royal inline-flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
