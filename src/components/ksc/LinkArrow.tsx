import React from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

// Lien « en savoir plus » : magenta gras + flèche lucide qui glisse de 3px
// au hover — SEULE micro-translation autorisée du système.
type LinkArrowProps = React.ComponentProps<'a'> & {
  href: string
}

export default function LinkArrow({ href, className, children, ...props }: LinkArrowProps) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex items-center gap-1.5 text-magenta font-bold hover:text-magenta-hover',
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-[3px]" />
    </a>
  )
}
