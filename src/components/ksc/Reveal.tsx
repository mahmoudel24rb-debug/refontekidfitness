'use client'

import { useEffect } from 'react'

// Apparition au scroll : observe tous les éléments `.ksc-reveal` de la page et
// leur ajoute `.is-visible` une seule fois à l'entrée dans le viewport.
// Le style (opacity/translateY) vit dans overrides.css, sous
// `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)` :
// sans JS ou en reduced-motion, rien n'est masqué ni animé.
// Monté une fois par page (SiteFooter pour les pages standard, Landing à part).
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.ksc-reveal'))
    if (els.length === 0) return
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
