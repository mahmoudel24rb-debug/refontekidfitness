import React from 'react'

import { cn } from '@/lib/utils'

// Section de page KSC : fond de marque + rythme vertical unifié.
// tone="marine" passe le texte en crème (fonds sombres : TerrainLines ok).
type SectionTone = 'cream' | 'cream2' | 'marine' | 'white'

const toneClasses: Record<SectionTone, string> = {
  cream: 'bg-cream',
  cream2: 'bg-cream-2',
  marine: 'bg-marine text-cream',
  white: 'bg-white',
}

type SectionProps = React.ComponentProps<'section'> & {
  tone?: SectionTone
}

export default function Section({ tone = 'cream', className, ...props }: SectionProps) {
  return (
    <section
      className={cn('relative overflow-hidden px-6 py-14 md:py-20', toneClasses[tone], className)}
      {...props}
    />
  )
}
