'use client'

import { useEffect } from 'react'

import { construireVisite, ecritureCookie, fusionner, lireCookie } from '@/lib/attribution'

// Suivi de la source des visiteurs (first touch / last touch), monté par les
// deux layouts publics. À chaque chargement de page, lit l'URL d'arrivée et le
// référent, puis met à jour le cookie ksc_attribution selon les règles de
// src/lib/attribution.ts. Ne rend rien et ne touche à aucun état React.
// Une navigation interne sans rechargement ne relance pas l'effet : elle ne
// change de toute façon pas l'attribution.
export default function SuiviAttribution() {
  useEffect(() => {
    try {
      const { type, visite } = construireVisite({
        recherche: window.location.search,
        chemin: window.location.pathname,
        hote: window.location.hostname,
        referent: document.referrer,
        date: new Date(),
      })
      const suivant = fusionner(lireCookie(document.cookie), type, visite)
      if (suivant) document.cookie = ecritureCookie(suivant, window.location.protocol === 'https:')
    } catch {
      // Cookies indisponibles : l'envoi du formulaire reconstruit la visite.
    }
  }, [])
  return null
}
