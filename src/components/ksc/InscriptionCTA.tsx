import React from 'react'

import { Button } from '@/components/ui/button'
import { INSCRIPTION_URL } from '@/data/site'

// CTA « S'inscrire » : Button KSC (pill) pointant vers INSCRIPTION_URL
// (placeholder /contact — la vraie URL d'inscription se branche dans
// src/data/site.ts, seul endroit à modifier en prod).
//
// Réexport transitoire : HomePage.tsx (port Framer, intouchable jusqu'à la
// phase 3) importe INSCRIPTION_URL depuis ce module.
export { INSCRIPTION_URL }

type Props = {
  label?: string
  variant?: React.ComponentProps<typeof Button>['variant']
  size?: React.ComponentProps<typeof Button>['size']
  className?: string
}

export default function InscriptionCTA({ label = 'S’inscrire', variant = 'primary', size = 'default', className }: Props) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={INSCRIPTION_URL} data-inscription="placeholder">
        {label}
      </a>
    </Button>
  )
}
