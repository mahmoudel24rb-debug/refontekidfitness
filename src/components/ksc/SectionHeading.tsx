import React from 'react'

import { cn } from '@/lib/utils'
import Underline from './Underline'

// H2 de section KSC. `underline` pose le soulignement « swash » signature
// (composant Underline) sous le dernier mot — uniquement les H2 de section,
// jamais les titres de cartes. `dark` pour les fonds marine.
type SectionHeadingProps = React.ComponentProps<'h2'> & {
  underline?: boolean
  dark?: boolean
}

export default function SectionHeading({
  underline = false,
  dark = false,
  className,
  children,
  ...props
}: SectionHeadingProps) {
  let content: React.ReactNode = children

  if (underline) {
    if (typeof children === 'string') {
      // Sépare le dernier mot pour le passer à <Underline> (cf. usage
      // historique : <h2>Avis de <Underline>parents</Underline></h2>).
      const words = children.trim().split(/\s+/)
      const last = words.pop()
      content = (
        <>
          {words.length > 0 ? `${words.join(' ')} ` : null}
          <Underline>{last}</Underline>
        </>
      )
    } else {
      // Enfants non-string : impossible d'isoler le dernier mot,
      // le soulignement englobe tout le contenu.
      content = <Underline>{children}</Underline>
    }
  }

  return (
    <h2
      className={cn(
        'font-heading font-extrabold text-[clamp(26px,3.5vw,40px)] leading-tight',
        dark ? 'text-cream' : 'text-marine',
        className
      )}
      {...props}
    >
      {content}
    </h2>
  )
}
