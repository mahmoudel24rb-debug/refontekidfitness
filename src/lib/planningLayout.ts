// Moteur de placement du calendrier « Semaine type » (/planning).
//
// Module PUR (aucun React, aucun DOM) : il transforme la liste plate des
// créneaux en blocs positionnables, et rien d'autre.
//
// Transposition directe du moteur livré côté Parc Beauregard
// (src/components/sportix/planningLayout.ts) : mêmes algorithmes de clusters,
// de colonnes et de bornes d'axe. Seule la dimension de couleur change — au
// Kid Sport Club, un créneau se lit par TRANCHE D'ÂGE, pas par salle.
//
// Le calendrier ne travaille pas avec des dates : le planning est une semaine
// TYPE (Lundi -> Samedi, pas de 12 mars). Les positions sont donc exprimées en
// minutes depuis minuit, et la conversion en pixels est faite en CSS par
// custom properties posées en style inline sur les blocs.

/** Un créneau prêt à afficher, sérialisable (props d'un composant client). */
export type CreneauCal = {
  id: string
  jour: string
  salle: string
  activite: string
  /** Libellé d'origine (« 18h », « 9h30 ») ; absent = horaire à confirmer. */
  heure?: string
  /** Minutes depuis minuit ; null si le créneau n'a pas d'horaire exploitable. */
  debutMin: number | null
  /** Durée en minutes (60 par défaut côté serveur). */
  duree: number
  /** Tranche d'âge : détermine la couleur et les fiches liées. */
  age?: string
}

/** Un créneau horodaté, placé dans la grille. */
export type BlocPose = {
  creneau: CreneauCal
  /** Minutes depuis minuit. */
  debut: number
  fin: number
  /** Index de colonne dans le cluster de chevauchement (0-based). */
  col: number
  /** Nombre total de colonnes du cluster (1 = bloc pleine largeur). */
  cols: number
}

export const JOURS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

/**
 * Couleurs par TRANCHE D'ÂGE (charte KSC) : `pleine` pour les pastilles et le
 * liseré gauche, `fond` (la même couleur à 10 % sur blanc) pour le corps du
 * bloc, `texte` choisi pour rester au-dessus de 4.5:1 sur ce fond — le magenta
 * plein ne passerait pas sur son propre fond teinté, d'où le magenta foncé.
 */
export type CouleurAge = { cle: string; label: string; pleine: string; fond: string; texte: string }

export const COULEURS_AGE: CouleurAge[] = [
  { cle: '10-36 mois', label: '10-36 mois', pleine: '#1060c8', fond: '#e7effa', texte: '#1060c8' },
  { cle: '3-5 ans', label: '3-5 ans', pleine: '#e6007e', fond: '#fde6f2', texte: '#c4006b' },
  { cle: '6-14 ans', label: '6-14 ans', pleine: '#081646', fond: '#e6e8ed', texte: '#081646' },
  { cle: '', label: 'Tous', pleine: '#64708f', fond: '#f0f1f4', texte: '#404a63' },
]

const SANS_AGE = COULEURS_AGE[COULEURS_AGE.length - 1]

export function couleurAge(age?: string): CouleurAge {
  return COULEURS_AGE.find((c) => c.cle === (age ?? '')) ?? SANS_AGE
}

/** Ordre stable des salles : à heure égale, les blocs se rangent toujours pareil. */
const RANGS_SALLE: Record<string, number> = {
  'Salle Kid': 0,
  'Salle Cross': 1,
  'Salle Fitness': 2,
  Bulle: 3,
}

export function rangSalle(salle?: string): number {
  if (!salle) return 99
  const r = RANGS_SALLE[salle]
  return r === undefined ? 99 : r
}

/**
 * Fiches de cours liées à une tranche d'âge. « 6-14 ans » couvre DEUX fiches
 * (6-10 ans et 11-14 ans) : les deux liens sont proposés. Un créneau sans
 * tranche (Pompom, Zumba) n'a pas de fiche dédiée : aucun lien.
 */
export type LienTranche = { label: string; href: string }

const LIENS_TRANCHE: Record<string, LienTranche[]> = {
  '10-36 mois': [{ label: 'Cours 10 – 36 mois', href: '/nos-prestations/cours-10-36-mois' }],
  '3-5 ans': [{ label: 'Cours 3 – 5 ans', href: '/nos-prestations/cours-3-5-ans' }],
  '6-14 ans': [
    { label: 'Cours 6 – 10 ans', href: '/nos-prestations/cours-6-10-ans' },
    { label: 'Cours 11 – 14 ans', href: '/nos-prestations/cours-11-14-ans' },
  ],
}

export function liensTranche(age?: string): LienTranche[] {
  return (age && LIENS_TRANCHE[age]) || []
}

/** « 10h », « 9h30 » -> minutes depuis minuit ; null si le format est autre. */
export function heureEnMinutes(heure?: string | null): number | null {
  if (!heure) return null
  const m = heure.trim().match(/^(\d{1,2})h(\d{2})?$/)
  if (!m) return null
  const h = Number(m[1])
  const min = Number(m[2] || 0)
  if (h > 23 || min > 59) return null
  return h * 60 + min
}

/** 1080 -> « 18h », 1095 -> « 18h15 ». */
export function formatHeure(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}

/** Heure de fin lisible à partir du début et de la durée. */
export function formatFin(debutMin: number, duree: number): string {
  return formatHeure(debutMin + duree)
}

/** 60 -> « 1h », 90 -> « 1h30 », 45 -> « 45 min ». */
export function formatDuree(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2, '0')}`
}

/**
 * Bornes de l'axe horaire, dérivées des données (heure pleine inférieure du
 * premier début, heure pleine supérieure de la dernière fin).
 * Repli 9h -> 20h si aucun créneau n'est horodaté.
 */
export function bornesAxe(creneaux: CreneauCal[]): { debut: number; fin: number } {
  const horodates = creneaux.filter((c) => c.debutMin !== null)
  if (!horodates.length) return { debut: 9 * 60, fin: 20 * 60 }
  let min = Infinity
  let max = -Infinity
  for (const c of horodates) {
    const d = c.debutMin as number
    if (d < min) min = d
    const f = d + Math.max(0, c.duree)
    if (f > max) max = f
  }
  return { debut: Math.floor(min / 60) * 60, fin: Math.ceil(max / 60) * 60 }
}

/**
 * Place les créneaux horodatés d'UN jour.
 *
 * 1. tri (début croissant, fin décroissante, puis rang de salle) ;
 * 2. clusters par balayage : deux créneaux se chevauchent si a.debut < b.fin ET
 *    b.debut < a.fin (comparaison STRICTE : 17h-18h puis 18h-19h ne se
 *    chevauchent pas) ; le chevauchement est transitif dans un cluster ;
 * 3. interval partitioning glouton : première colonne libre, sinon nouvelle ;
 * 4. tous les membres d'un cluster reçoivent le même `cols`, pour que les
 *    largeurs restent alignées.
 *
 * Les créneaux sans horaire sont ignorés (ils vont dans la rangée
 * « Horaire à confirmer »).
 */
export function poserJour(creneaux: CreneauCal[]): BlocPose[] {
  const blocs = creneaux
    .filter((c) => c.debutMin !== null)
    .map((c) => {
      const debut = c.debutMin as number
      return { creneau: c, debut, fin: debut + Math.max(1, c.duree), col: 0, cols: 1 }
    })
    .sort((a, b) => {
      if (a.debut !== b.debut) return a.debut - b.debut
      if (a.fin !== b.fin) return b.fin - a.fin
      const ra = rangSalle(a.creneau.salle)
      const rb = rangSalle(b.creneau.salle)
      if (ra !== rb) return ra - rb
      return a.creneau.activite.localeCompare(b.creneau.activite, 'fr')
    })

  let cluster: BlocPose[] = []
  let clusterFin = -Infinity

  const cloreCluster = () => {
    if (!cluster.length) return
    // interval partitioning glouton : fins de la dernière pose de chaque colonne
    const finsColonnes: number[] = []
    for (const bloc of cluster) {
      let cible = finsColonnes.findIndex((fin) => fin <= bloc.debut)
      if (cible === -1) {
        finsColonnes.push(bloc.fin)
        cible = finsColonnes.length - 1
      } else {
        finsColonnes[cible] = bloc.fin
      }
      bloc.col = cible
    }
    for (const bloc of cluster) bloc.cols = finsColonnes.length
    cluster = []
    clusterFin = -Infinity
  }

  for (const bloc of blocs) {
    if (cluster.length && bloc.debut < clusterFin) {
      cluster.push(bloc)
      clusterFin = Math.max(clusterFin, bloc.fin)
    } else {
      cloreCluster()
      cluster = [bloc]
      clusterFin = bloc.fin
    }
  }
  cloreCluster()

  return blocs
}

/** Créneaux d'un jour sans horaire exploitable, dans l'ordre de saisie. */
export function sansHeure(creneaux: CreneauCal[]): CreneauCal[] {
  return creneaux.filter((c) => c.debutMin === null)
}

/** Activités présentes, triées alphabétiquement, avec leur nombre de créneaux. */
export function activitesDisponibles(creneaux: CreneauCal[]): { nom: string; total: number }[] {
  const compte = new Map<string, number>()
  for (const c of creneaux) compte.set(c.activite, (compte.get(c.activite) || 0) + 1)
  return [...compte.entries()]
    .map(([nom, total]) => ({ nom, total }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))
}

/** Tranches d'âge présentes, dans l'ordre de la légende. */
export function agesPresents(creneaux: CreneauCal[]): CouleurAge[] {
  const cles = new Set(creneaux.map((c) => c.age ?? ''))
  return COULEURS_AGE.filter((c) => cles.has(c.cle))
}
