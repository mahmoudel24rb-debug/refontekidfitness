import type { CreneauPlat } from '@/lib/contenu'

// Options de créneau proposées dans le formulaire des fiches prestation.
// Mapping slug de prestation -> tranche d'âge du planning (planning.ts) :
//  - cours-10-36-mois -> '10-36 mois'
//  - cours-3-5-ans    -> '3-5 ans'
//  - cours-6-10-ans ET cours-11-14-ans -> '6-14 ans' (bande d'âge unique du
//    planning client : une mention « Créneaux 6-14 ans » est affichée sur ces
//    deux fiches).
// Les 3 autres prestations (mercredis, stages, anniversaire) n'ont pas de
// sélecteur : creneauxPourPrestation renvoie [] (créneau libre en message).
const AGE_PAR_SLUG: Record<string, string> = {
  'cours-10-36-mois': '10-36 mois',
  'cours-3-5-ans': '3-5 ans',
  'cours-6-10-ans': '6-14 ans',
  'cours-11-14-ans': '6-14 ans',
}

export type CreneauOption = { value: string; label: string }

// Construit les options « {Jour} {heure}, {activite} ({salle}) »
// (ex. « Lundi 17h, Cross Boxe (Salle Kid) ») pour la tranche d'âge de la
// prestation, à partir du planning DÉJÀ CHARGÉ (getPlanningPlat) : les fiches
// sont des composants serveur, les créneaux sont ensuite passés en props au
// LeadForm. Retourne [] si la prestation n'a pas de sélecteur.
export function creneauxPourPrestation(slug: string, planning: CreneauPlat[]): CreneauOption[] {
  const age = AGE_PAR_SLUG[slug]
  if (!age) return []
  return planning
    .filter((c) => c.age === age)
    .map((c) => {
      const label = `${c.jour} ${c.heure}, ${c.activite} (${c.salle})`
      return { value: label, label }
    })
}
