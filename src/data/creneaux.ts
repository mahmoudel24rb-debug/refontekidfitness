import type { CreneauPlat } from '@/lib/contenu'
import { JOURS, heureEnMinutes } from '@/lib/planningLayout'

// Options de créneau proposées dans le formulaire des fiches prestation.
// Mapping slug de prestation -> tranche d'âge du planning (planning.ts) :
//  - cours-10-36-mois -> '10-36 mois'
//  - cours-3-5-ans    -> '3-5 ans'
//  - cours-6-10-ans ET cours-11-14-ans -> '6-14 ans' (bande d'âge unique du
//    planning client : une mention « Créneaux 6-14 ans » est affichée sur ces
//    deux fiches).
// Les 3 autres prestations (mercredis, stages, anniversaire) n'ont pas de
// sélecteur : creneauxPourPrestation renvoie [] (créneau libre en message).
export const AGE_PAR_SLUG: Record<string, string> = {
  'cours-10-36-mois': '10-36 mois',
  'cours-3-5-ans': '3-5 ans',
  'cours-6-10-ans': '6-14 ans',
  'cours-11-14-ans': '6-14 ans',
}

export type CreneauOption = { value: string; label: string }

/** Option de formulaire : « Lundi 17h, Cross Boxe (Salle Kid) ». */
export function optionCreneau(c: CreneauPlat): CreneauOption {
  const label = `${c.jour} ${c.heure}, ${c.activite} (${c.salle})`
  return { value: label, label }
}

// Construit les options de la tranche d'âge de la prestation, à partir du
// planning DÉJÀ CHARGÉ (getPlanningPlat) : les fiches sont des composants
// serveur, les créneaux sont ensuite passés en props au LeadForm.
// Retourne [] si la prestation n'a pas de sélecteur.
export function creneauxPourPrestation(slug: string, planning: CreneauPlat[]): CreneauOption[] {
  const age = AGE_PAR_SLUG[slug]
  if (!age) return []
  // Les créneaux sans tranche d'âge (Pompom et Zumba du mercredi) relèvent du
  // 6-14 ans (même lien de réservation) : proposés sur ces deux fiches.
  return planning
    .filter((c) => c.age === age || (age === '6-14 ans' && !c.age))
    .sort((a, b) => rangCreneau(a) - rangCreneau(b))
    .map(optionCreneau)
}

/** Jour (ordre du planning) puis heure : ordre de lecture d'une liste de créneaux. */
const rangCreneau = (c: CreneauPlat) => {
  const j = JOURS.indexOf(c.jour)
  return (j === -1 ? JOURS.length : j) * 10000 + (heureEnMinutes(c.heure) ?? 9999)
}

/**
 * Créneaux réels d'une activité (page d'un cours), triés par jour puis heure.
 *
 * L'activité porte le ou les noms exacts qu'elle a dans le planning
 * (`activitePlanning`, plusieurs noms séparés par « | » : « Pompom|Pompom
 * Girl »). On ne retient ensuite que la tranche d'âge de la fiche parente.
 * Les créneaux sans tranche d'âge (Pompom et Zumba du mercredi, non typés au
 * planning) sont ajoutés sur les fiches 6-14 ans, et servent de repli aux
 * autres fiches quand l'activité n'a aucun créneau typé.
 */
export function creneauxPourDiscipline(
  slugPrestation: string,
  activitePlanning: string | undefined,
  planning: CreneauPlat[],
): CreneauPlat[] {
  const noms = (activitePlanning ?? '')
    .split('|')
    .map((n) => n.trim())
    .filter(Boolean)
  if (noms.length === 0) return []
  const memeActivite = planning.filter((c) => noms.includes(c.activite))
  const age = AGE_PAR_SLUG[slugPrestation]
  const tranche = memeActivite.filter((c) => c.age === age)
  const sansAge = memeActivite.filter((c) => !c.age)
  // Les créneaux sans tranche renvoient au lien de réservation 6-14 ans
  // (décision client) : les fiches 6-14 les listent donc en plus des leurs.
  const retenus = age === '6-14 ans' ? [...tranche, ...sansAge] : tranche.length > 0 ? tranche : sansAge
  return [...retenus].sort((a, b) => rangCreneau(a) - rangCreneau(b))
}
