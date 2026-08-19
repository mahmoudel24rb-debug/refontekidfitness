'use client'

import React from 'react'

import {
  couleurAge,
  formatDuree,
  formatFin,
  formatHeure,
  liensTranche,
  poserJour,
  sansHeure,
  type CreneauCal,
} from '@/lib/planningLayout'

// Vue Liste : les créneaux groupés par jour, du lundi au samedi.
// Transposition du PlanningListe de Parc Beauregard. Les lignes ne sont PAS
// cliquables : seuls les liens de fiche le sont, pour ne pas piéger la
// navigation clavier sur une liste de 25 entrées.

export default function ListePlanning({
  jours,
  creneaux,
}: {
  jours: string[]
  creneaux: CreneauCal[]
}) {
  const groupes = jours
    .map((jour) => {
      const duJour = creneaux.filter((c) => c.jour === jour)
      return { jour, poses: poserJour(duJour), attente: sansHeure(duJour) }
    })
    .filter((g) => g.poses.length > 0 || g.attente.length > 0)

  if (!groupes.length) {
    return (
      <p className="rounded-lg border border-border bg-white px-5 py-9 text-center text-muted-foreground">
        Aucun cours ne correspond à ce filtre.
      </p>
    )
  }

  // Un créneau « 6-14 ans » renvoie vers DEUX fiches : les liens sont donc
  // rendus en ligne, séparés, et non par un unique « Voir le cours ».
  const liens = (c: CreneauCal) => (
    <span className="flex flex-wrap justify-end gap-x-4 gap-y-1">
      {liensTranche(c.age).map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="whitespace-nowrap text-[14px] font-bold text-magenta hover:underline"
        >
          {l.label}
        </a>
      ))}
    </span>
  )

  return (
    <div data-planning-liste>
      {groupes.map(({ jour, poses, attente }) => (
        <section key={jour} className="mb-7">
          <h3 className="mb-2 border-b-2 border-magenta pb-2 font-heading text-[18px] font-extrabold text-marine">
            {jour}
          </h3>
          <ul className="flex flex-col">
            {poses.map((p) => {
              const c = p.creneau
              const coul = couleurAge(c.age)
              return (
                <li
                  key={c.id}
                  data-ligne-creneau
                  className="grid grid-cols-[104px_10px_1fr] items-center gap-x-3 gap-y-1 border-b border-border px-0.5 py-3 sm:grid-cols-[112px_10px_1fr_auto]"
                >
                  <span className="text-[14px] font-bold whitespace-nowrap text-marine">
                    {formatHeure(p.debut)} – {formatFin(p.debut, c.duree)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ background: coul.pleine }}
                  />
                  <span className="text-[15px] font-semibold text-marine">
                    {c.activite}
                    <span className="block text-[13px] font-normal text-muted-foreground">
                      {formatDuree(c.duree)} · {c.salle} · {coul.label}
                    </span>
                  </span>
                  <span className="col-start-3 sm:col-start-4">{liens(c)}</span>
                </li>
              )
            })}
            {attente.map((c) => {
              const coul = couleurAge(c.age)
              return (
                <li
                  key={c.id}
                  data-ligne-creneau
                  className="grid grid-cols-[104px_10px_1fr] items-center gap-x-3 gap-y-1 border-b border-border px-0.5 py-3 sm:grid-cols-[112px_10px_1fr_auto]"
                >
                  <span className="text-[13px] font-semibold text-muted-foreground">À confirmer</span>
                  <span
                    aria-hidden="true"
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ background: coul.pleine }}
                  />
                  <span className="text-[15px] font-semibold text-marine">
                    {c.activite}
                    <span className="block text-[13px] font-normal text-muted-foreground">
                      {c.salle} · {coul.label}
                    </span>
                  </span>
                  <span className="col-start-3 sm:col-start-4">{liens(c)}</span>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
