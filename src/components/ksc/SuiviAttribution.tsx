'use client'

import { useEffect } from 'react'

import { appliquerConsentementAttribution, visiteArrivee } from '@/lib/attributionNavigateur'
import { lireConsentement } from '@/lib/consentement'

// Suivi de la source des visiteurs (first touch / last touch), monté par les
// deux layouts publics. À chaque chargement de page :
// - la visite d'arrivée (URL, référent) est gardée en mémoire, sans stockage ;
// - le cookie ksc_attribution n'est mis à jour (règles de
//   src/lib/attribution.ts) que si la catégorie « Publicité et suivi des
//   campagnes » est acceptée, et il est supprimé si elle est refusée ;
// - sans choix mémorisé, il n'est ni lu ni écrit : si le visiteur accepte
//   plus tard sur la page, le bandeau l'écrit avec la visite d'arrivée.
// Ne rend rien et ne touche à aucun état React. Une navigation interne sans
// rechargement ne relance pas l'effet : elle ne change de toute façon pas
// l'attribution.
export default function SuiviAttribution() {
  useEffect(() => {
    try {
      visiteArrivee()
      const choix = lireConsentement(document.cookie, new Date())
      if (choix) appliquerConsentementAttribution(choix.publicite)
    } catch {
      // Cookies indisponibles : l'envoi du formulaire utilise la visite d'arrivée.
    }
  }, [])
  return null
}
