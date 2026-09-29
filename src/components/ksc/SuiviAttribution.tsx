'use client'

import { useEffect } from 'react'

import { mettreAJourAttribution } from '@/lib/attributionNavigateur'

// Suivi de la source des visiteurs (first touch / last touch), monté par les
// deux layouts publics. À chaque chargement de page publique, sans condition,
// le cookie ksc_attribution est mis à jour avec la visite d'arrivée (URL,
// référent), selon les règles de src/lib/attribution.ts.
// Ne rend rien et ne touche à aucun état React. Une navigation interne sans
// rechargement ne relance pas l'effet : elle ne change de toute façon pas
// l'attribution.
export default function SuiviAttribution() {
  useEffect(() => {
    mettreAJourAttribution()
  }, [])
  return null
}
