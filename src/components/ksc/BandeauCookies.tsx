'use client'

import React, { useEffect, useSyncExternalStore } from 'react'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Bandeau d'information sur les cookies, monté par les deux layouts publics,
// jamais dans l'admin. Carte fixe en bas de l'écran, non modale : une phrase,
// le lien « En savoir plus » (page /cookies), le bouton « J'ai compris » et
// une croix. Simple information, sans effet sur le suivi : le cookie
// ksc_attribution et les balises GTM ne dépendent pas de ce bandeau.
// - « J'ai compris » : fermeture mémorisée dans le stockage local
//   (ksc_bandeau_cookies), jamais dans un cookie ; stockage indisponible :
//   fermé pour la page en cours seulement.
// - Croix : ferme le bandeau pour la page en cours, sans rien mémoriser (il
//   revient au chargement de page suivant) ; libère l'écran sur mobile.
// - Rendu uniquement dans le navigateur : l'état vient de
//   useSyncExternalStore avec un instantané serveur « fermé », donc ni rendu
//   serveur ni écart à l'hydratation.

/** Clé du stockage local qui mémorise la fermeture du bandeau. */
const CLE_FERMETURE = 'ksc_bandeau_cookies'

// Focus clavier visible sur le bouton pilule (le composant Button retire le
// contour du focus global) : même contour que le reste du site.
const FOCUS =
  'cursor-pointer focus-visible:outline-solid focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1060c873]'
const LIEN =
  'cursor-pointer font-bold text-marine underline decoration-2 underline-offset-4 transition-colors duration-150 hover:text-magenta'

const auditeurs = new Set<() => void>()
/** Fermeture en mémoire, pour la page en cours : croix, ou relais du stockage local s'il est indisponible. */
let fermeSansStockage = false

/** Abonnement pour useSyncExternalStore. Une fermeture faite dans un autre onglet est relue (événement storage). */
function abonner(auditeur: () => void): () => void {
  auditeurs.add(auditeur)
  window.addEventListener('storage', auditeur)
  return () => {
    auditeurs.delete(auditeur)
    window.removeEventListener('storage', auditeur)
  }
}

/** Instantané : bandeau déjà fermé (stockage local, ou fermeture en mémoire). */
function lireFerme(): boolean {
  if (fermeSansStockage) return true
  try {
    return localStorage.getItem(CLE_FERMETURE) !== null
  } catch {
    return false
  }
}

/** « J'ai compris » : fermeture mémorisée, aucun cookie écrit. */
function fermer() {
  try {
    localStorage.setItem(CLE_FERMETURE, '1')
  } catch {
    // Stockage indisponible : fermé pour la page en cours seulement.
  }
  fermeSansStockage = true
  for (const auditeur of auditeurs) auditeur()
}

/** Croix : fermé pour la page en cours, rien n'est mémorisé. */
function masquer() {
  fermeSansStockage = true
  for (const auditeur of auditeurs) auditeur()
}

export default function BandeauCookies() {
  const ferme = useSyncExternalStore(abonner, lireFerme, () => true)

  // Le cookie ksc_consentement de l'ancien bandeau de consentement ne sert
  // plus : il est supprimé chez les visiteurs qui l'ont encore.
  useEffect(() => {
    try {
      if (document.cookie.split(';').some((morceau) => morceau.trim().startsWith('ksc_consentement='))) {
        document.cookie =
          'ksc_consentement=; Max-Age=0; Path=/; SameSite=Lax' + (window.location.protocol === 'https:' ? '; Secure' : '')
      }
    } catch {
      // Cookies inaccessibles : rien à supprimer.
    }
  }, [])

  if (ferme) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-45 flex justify-center px-3 pb-[calc(12px+env(safe-area-inset-bottom))] sm:px-5 sm:pb-5">
      <div
        role="region"
        aria-label="Information sur les cookies"
        // Hauteur bornée sous l'en-tête collant du site (96 px) : au-delà, la
        // carte défile en interne.
        className="pointer-events-auto relative max-h-[calc(100dvh-120px)] w-full max-w-[720px] overflow-y-auto rounded-xl border border-border bg-white p-5 text-ink shadow-[0_18px_50px_rgb(8_22_70/0.22)] sm:p-6 sm:pr-14"
      >
        <button
          type="button"
          aria-label="Fermer"
          onClick={masquer}
          className={cn(
            FOCUS,
            'absolute top-1.5 right-1.5 grid size-9 place-items-center rounded-full text-marine transition-colors duration-150 hover:bg-cream-2',
          )}
        >
          <X className="size-5" aria-hidden="true" />
        </button>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="pr-7 text-sm leading-relaxed sm:flex-1 sm:pr-0 sm:text-[15px]">
            Nous utilisons des cookies pour mesurer l’audience du site, suivre nos campagnes publicitaires (Google,
            Meta) et mémoriser la source de votre visite, transmise avec vos demandes de contact.{' '}
            <a href="/cookies" className={cn(LIEN, 'whitespace-nowrap')}>
              En savoir plus
            </a>
          </p>
          <Button type="button" size="sm" className={cn(FOCUS, 'w-full shrink-0 sm:w-auto')} onClick={fermer}>
            J’ai compris
          </Button>
        </div>
      </div>
    </div>
  )
}
