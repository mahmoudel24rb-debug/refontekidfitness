'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'

import {
  couleurAge,
  formatDuree,
  formatFin,
  formatHeure,
  type CreneauCal,
} from '@/lib/planningLayout'

// Aperçu d'un créneau : une seule surface, purement informative, affichée au
// survol après 250 ms et JAMAIS cliquable (`pointer-events-none`) — le clic
// appartient au bloc lui-même, qui mène à la réservation en ligne. Il n'y a donc
// ni fiche épinglée, ni feuille basse mobile, ni piège de tabulation : l'aperçu
// n'existe qu'au pointeur fin (Échap le referme, côté CalendrierPlanning).
//
// Le positionnement est en `fixed` à partir du rectangle du bloc : la grille
// défile horizontalement sur mobile, une surface en absolu y serait rognée.
// Les z-index restent SOUS le header sticky du site (z-50).

export type PopoverCreneauProps = {
  creneau: CreneauCal
  rect: { top: number; left: number; bottom: number; width: number }
}

const MARGE = 10

export default function PopoverCreneau({ creneau, rect }: PopoverCreneauProps) {
  const boite = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number }>({
    top: rect.bottom + 8,
    left: rect.left,
  })

  // Position mesurée : centré sous le bloc, replié au-dessus s'il n'y a pas la
  // place en bas, et toujours dans la fenêtre à MARGE près.
  useLayoutEffect(() => {
    const el = boite.current
    if (!el) return
    const l = Math.max(
      MARGE,
      Math.min(
        rect.left + rect.width / 2 - el.offsetWidth / 2,
        window.innerWidth - el.offsetWidth - MARGE,
      ),
    )
    const bas = rect.bottom + 8
    const t =
      bas + el.offsetHeight > window.innerHeight - MARGE
        ? Math.max(MARGE, rect.top - el.offsetHeight - 8)
        : bas
    setPos({ top: t, left: l })
  }, [rect, creneau.id])

  const coul = couleurAge(creneau.age)
  const horaire =
    creneau.debutMin === null
      ? 'Horaire à confirmer'
      : `${formatHeure(creneau.debutMin)} – ${formatFin(creneau.debutMin, creneau.duree)} · ${formatDuree(creneau.duree)}`

  return (
    <div
      ref={boite}
      data-popover-creneau="apercu"
      className="pointer-events-none fixed z-40 w-[280px] max-w-[calc(100vw-20px)] animate-in fade-in-0 slide-in-from-bottom-1 rounded-lg border border-border bg-white p-5 shadow-md duration-150"
      style={{ top: pos.top, left: pos.left }}
    >
      <p className="font-heading text-[17px] font-bold leading-snug text-marine">{creneau.activite}</p>
      <p className="mt-1 text-[14px] font-bold" style={{ color: coul.texte }}>
        {horaire}
      </p>
      <p className="mt-2.5 flex items-center gap-2 text-[14px] text-ink">
        <span
          aria-hidden="true"
          className="size-2.5 shrink-0 rounded-full"
          style={{ background: coul.pleine }}
        />
        {creneau.salle}
        <span className="text-muted-foreground">· {coul.label}</span>
      </p>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Tous les {creneau.jour.toLowerCase()}s
      </p>
      {/* Ce que fait le clic : le bloc porte le lien, l'aperçu l'annonce. */}
      <p className="mt-3.5 flex items-center gap-1.5 text-[14px] font-bold text-magenta">
        Réserver en ligne
        <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
      </p>
    </div>
  )
}
