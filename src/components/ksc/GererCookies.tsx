'use client'

import React from 'react'

import { ouvrirPanneau } from '@/lib/consentementNavigateur'

// Bouton « Gérer les cookies » : rouvre le panneau du bandeau de consentement
// (src/components/ksc/BandeauConsentement.tsx), pour modifier ou retirer son
// choix aussi simplement qu'on l'a donné. Utilisé dans la barre légale du
// footer et sur la page /cookies ; le style vient de l'appelant.
export default function GererCookies({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={(e) => ouvrirPanneau(e.currentTarget)}>
      Gérer les cookies
    </button>
  )
}
