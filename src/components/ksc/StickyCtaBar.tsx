'use client'

import React, { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { COORDONNEES } from '@/data/site'

// Barre CTA collante bas d'écran, mobile uniquement (standard landing Meta :
// l'action principale reste à un pouce du pouce). Elle observe UNE OU PLUSIEURS
// cibles (par défaut, la cible du lien) : masquée dès qu'AU MOINS UNE cible est
// visible, affichée seulement quand TOUTES sont hors écran. Les landings lead
// passent les deux formulaires (#lead-form du hero + #lead-form-final de fin de
// page) ; le catalogue passe la section prestations.
// Aucune animation (sobriété + reduced-motion).
export default function StickyCtaBar({
  href,
  label,
  targets,
}: {
  href: string
  label: string
  targets?: string[]
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const selecteurs = (targets && targets.length > 0 ? targets : [href]).filter((s) =>
      s.startsWith('#'),
    )
    if (selecteurs.length === 0) {
      // Aucune ancre observable : repli simple au scroll.
      const onScroll = () => setVisible(window.scrollY > 480)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    // État d'intersection par cible : la barre est visible quand AUCUNE cible
    // n'est à l'écran (toutes hors écran).
    const etats = new Map<string, boolean>(selecteurs.map((s) => [s, false]))
    const recalculer = () => setVisible(![...etats.values()].some(Boolean))

    const observers: IntersectionObserver[] = []
    let fallbackScroll: (() => void) | undefined
    const timers: Array<ReturnType<typeof setTimeout>> = []

    // Une cible peut apparaître après le montage : on réessaie brièvement.
    const attacher = (selecteur: string, essais = 0) => {
      const cible = document.querySelector(selecteur)
      if (cible) {
        const io = new IntersectionObserver(
          ([entry]) => {
            etats.set(selecteur, entry.isIntersecting)
            recalculer()
          },
          { rootMargin: '0px 0px -20% 0px' },
        )
        io.observe(cible)
        observers.push(io)
        return
      }
      if (essais < 20) {
        timers.push(setTimeout(() => attacher(selecteur, essais + 1), 100))
        return
      }
      // Cible introuvable : repli au scroll (une seule fois suffit).
      if (!fallbackScroll) {
        fallbackScroll = () => setVisible(window.scrollY > 480)
        fallbackScroll()
        window.addEventListener('scroll', fallbackScroll, { passive: true })
      }
    }
    selecteurs.forEach((s) => attacher(s))

    return () => {
      observers.forEach((io) => io.disconnect())
      timers.forEach((t) => clearTimeout(t))
      if (fallbackScroll) window.removeEventListener('scroll', fallbackScroll)
    }
  }, [href, targets])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(8,22,70,0.08)] lg:hidden">
      <div className="mx-auto flex max-w-[560px] items-center gap-3">
        <Button asChild size="sm" className="flex-1">
          <a href={href}>{label}</a>
        </Button>
        <Button asChild size="sm" variant="outline" aria-label="Appeler le club">
          <a href={COORDONNEES.telephoneHref}>
            <Phone size={16} aria-hidden="true" />
            Appeler
          </a>
        </Button>
      </div>
    </div>
  )
}
