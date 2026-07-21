import React from 'react'
import { Users, Calendar, Activity, Star, type LucideIcon } from 'lucide-react'

import Container from './Container'
import RoundIcon from './RoundIcon'
import TerrainLines from './TerrainLines'

// Bande marine + TerrainLines : 2-3 tuiles « gros chiffre » (font-heading crème)
// avec pastille d'icône. Chiffres réels issus de HOME.hero.stats (+ tuile
// « Septembre 2026 / Rentrée » du planning). Aucun copy neuf.
export type Stat = { valeur: string; label: string }

function iconFor(label: string): LucideIcon {
  const l = label.toLowerCase()
  if (l.includes('rentrée')) return Calendar
  if (l.includes('enfant')) return Users
  if (l.includes('activ')) return Activity
  return Star
}

export default function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative overflow-hidden bg-marine px-6 py-14 text-cream md:py-16">
      <TerrainLines />
      <Container className="relative">
        <ul className="mx-auto flex max-w-[960px] flex-col items-stretch gap-8 sm:flex-row sm:justify-center sm:gap-10">
          {stats.map((s) => {
            const Icon = iconFor(s.label)
            return (
              <li key={s.label} className="flex flex-1 flex-col items-center gap-3 text-center">
                <RoundIcon className="size-12 bg-white/10 text-magenta-light">
                  <Icon size={22} aria-hidden="true" />
                </RoundIcon>
                <span className="font-heading text-[clamp(30px,4.4vw,44px)] font-extrabold leading-none text-cream">
                  {s.valeur}
                </span>
                <span className="text-sm font-semibold uppercase tracking-[.05em] text-cream/70">
                  {s.label}
                </span>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
