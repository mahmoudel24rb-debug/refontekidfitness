'use client'

import React, { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'

// Barre CTA collante bas d'écran, mobile uniquement (standard landing Meta :
// l'action principale reste à un pouce du pouce). Visible une fois la cible
// (#lead-form ou section prestations) sortie de l'écran, masquée quand elle
// est visible. Aucune animation (sobriété + reduced-motion).
export default function StickyCtaBar({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const selecteur = href.startsWith('#') ? href : '#lead-form'
    let io: IntersectionObserver | undefined
    let essais = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    let fallbackScroll: (() => void) | undefined

    // La cible peut apparaître APRÈS le montage (LeadForm est derrière une
    // frontière Suspense, le temps que useSearchParams se résolve) : on
    // réessaie brièvement avant de basculer sur le repli au scroll.
    const attacher = () => {
      const cible = document.querySelector(selecteur)
      if (cible) {
        io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
          rootMargin: '0px 0px -20% 0px',
        })
        io.observe(cible)
        return
      }
      if (essais++ < 20) {
        timer = setTimeout(attacher, 100)
        return
      }
      // Cible introuvable (ex. ancre d'une page sans formulaire) : repli.
      fallbackScroll = () => setVisible(window.scrollY > 480)
      fallbackScroll()
      window.addEventListener('scroll', fallbackScroll, { passive: true })
    }
    attacher()

    return () => {
      io?.disconnect()
      if (timer) clearTimeout(timer)
      if (fallbackScroll) window.removeEventListener('scroll', fallbackScroll)
    }
  }, [href])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(8,22,70,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-[560px] items-center gap-3">
        <Button asChild size="sm" className="flex-1">
          <a href={href}>{label}</a>
        </Button>
        <Button asChild size="sm" variant="outline" aria-label="Appeler le club">
          <a href="tel:+33247444143">
            <Phone size={16} aria-hidden="true" />
            Appeler
          </a>
        </Button>
      </div>
    </div>
  )
}
