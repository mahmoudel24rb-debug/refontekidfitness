import React from 'react'

import { cn } from '@/lib/utils'

// Kicker (surtitre de section) : magenta sur fond clair,
// magenta-light sur fond marine (contraste AA).
type KickerProps = React.ComponentProps<'p'> & {
  dark?: boolean
}

export default function Kicker({ dark = false, className, ...props }: KickerProps) {
  return (
    <p
      className={cn(
        'text-sm font-bold uppercase tracking-[.06em]',
        dark ? 'text-magenta-light' : 'text-magenta',
        className
      )}
      {...props}
    />
  )
}
