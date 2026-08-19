'use client'

import React, { useEffect, useRef, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

// Filtre par activité du calendrier de la semaine. Transposition du
// PlanningFiltreActivites de Parc Beauregard : un panneau maison à cases à
// cocher NATIVES (accent magenta) plutôt qu'un menu Radix — rien à installer,
// et le clavier fonctionne sans code supplémentaire.
// Sélection vide = tout est visible.

export type FiltreActivitesProps = {
  activites: { nom: string; total: number }[]
  selection: string[]
  onChange: (selection: string[]) => void
}

export default function FiltreActivites({ activites, selection, onChange }: FiltreActivitesProps) {
  const [ouvert, setOuvert] = useState(false)
  const enveloppe = useRef<HTMLDivElement>(null)
  const declencheur = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!ouvert) return
    const auClic = (e: MouseEvent) => {
      if (enveloppe.current && !enveloppe.current.contains(e.target as Node)) setOuvert(false)
    }
    const auClavier = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOuvert(false)
      declencheur.current?.focus()
    }
    document.addEventListener('mousedown', auClic)
    document.addEventListener('keydown', auClavier)
    return () => {
      document.removeEventListener('mousedown', auClic)
      document.removeEventListener('keydown', auClavier)
    }
  }, [ouvert])

  const basculer = (nom: string, coche: boolean) =>
    onChange(coche ? [...selection, nom] : selection.filter((a) => a !== nom))

  return (
    <div className="relative" ref={enveloppe}>
      <button
        type="button"
        ref={declencheur}
        aria-expanded={ouvert}
        aria-haspopup="true"
        onClick={() => setOuvert((v) => !v)}
        className={cn(
          'inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2.5 text-[14px] font-bold text-marine transition-colors duration-150 hover:bg-cream-2',
          selection.length ? 'border-magenta text-magenta' : 'border-border',
        )}
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Activités
        {selection.length > 0 && (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-magenta px-1.5 text-[13px] font-bold text-white">
            {selection.length}
          </span>
        )}
      </button>

      {ouvert && (
        <div
          role="group"
          aria-label="Filtrer par activité"
          className="absolute left-0 top-[calc(100%+8px)] z-40 max-h-[340px] w-[272px] animate-in fade-in-0 slide-in-from-top-1 overflow-y-auto rounded-lg border border-border bg-white p-3 shadow-md duration-150"
        >
          <p className="mb-2 px-1.5 text-[13px] font-extrabold uppercase tracking-[.04em] text-muted-foreground">
            Filtrer par activité
          </p>
          <ul className="flex flex-col">
            {activites.map((a) => (
              <li key={a.nom}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-2 hover:bg-cream-2">
                  <input
                    type="checkbox"
                    checked={selection.includes(a.nom)}
                    onChange={(e) => basculer(a.nom, e.target.checked)}
                    className="size-4 shrink-0 cursor-pointer accent-magenta"
                  />
                  <span className="flex-1 text-[14px] font-semibold text-marine">{a.nom}</span>
                  <span className="text-[13px] tabular-nums text-muted-foreground">{a.total}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onChange([])}
            disabled={selection.length === 0}
            className="mt-2 w-full border-t border-border px-1.5 pb-1 pt-2.5 text-left text-[14px] font-bold text-magenta disabled:cursor-default disabled:text-muted-foreground/60"
          >
            Tout afficher
          </button>
        </div>
      )}
    </div>
  )
}
