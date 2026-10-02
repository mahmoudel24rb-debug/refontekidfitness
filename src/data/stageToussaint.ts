// Stages de la Toussaint 2026 (Halloween) : planning thématique fourni par le
// club, identique pour les deux semaines (19 au 23 et 26 au 30 octobre).
// Affiché par src/components/ksc/PlanningStage.tsx sur la landing
// /stage-toussaint (src/data/landings.ts).

export type ThemeJour = 'monstres' | 'sorciers' | 'fantomes' | 'vampires' | 'citrouilles'

export type JourStage = {
  jour: string
  dates: string
  theme: string
  icone: ThemeJour
  /** Activités 10h à 12h et 14h à 16h : [3 à 7 ans, 8 à 14 ans]. */
  matin?: [string, string]
  apresMidi?: [string, string]
  /** Activité commune à toute la journée (vendredi). */
  journee?: string
}

export type PlanningStage = {
  kicker: string
  titre: string
  intro: string
  groupes: { label: string; couleur: 'violet' | 'orange' }[]
  communs: { horaire: string; libelle: string; precision?: string }[]
  jours: JourStage[]
  note: string
}

export const PLANNING_TOUSSAINT: PlanningStage = {
  kicker: 'Un thème par jour',
  titre: 'Le planning Halloween',
  intro: 'Le même programme pour les deux semaines, du 19 au 23 et du 26 au 30 octobre.',
  groupes: [
    { label: '3 à 7 ans', couleur: 'violet' },
    { label: '8 à 14 ans', couleur: 'orange' },
  ],
  communs: [
    { horaire: '8h à 10h', libelle: 'Accueil des enfants' },
    { horaire: '12h à 14h', libelle: 'Repas et temps calme', precision: 'pique-nique à prévoir' },
    { horaire: '16h à 18h', libelle: 'Goûter, récupération et temps calme' },
  ],
  jours: [
    { jour: 'Lundi', dates: '19 et 26 octobre', theme: 'Monstres', icone: 'monstres', matin: ['Motricité', 'Cross training'], apresMidi: ['Football', 'Handball'] },
    { jour: 'Mardi', dates: '20 et 27 octobre', theme: 'Sorciers', icone: 'sorciers', matin: ['Gym', 'Zumba'], apresMidi: ['Tennis', 'Badminton'] },
    { jour: 'Mercredi', dates: '21 et 28 octobre', theme: 'Fantômes', icone: 'fantomes', matin: ['Danse', 'Athlétisme'], apresMidi: ['Base-ball', 'Rugby'] },
    { jour: 'Jeudi', dates: '22 et 29 octobre', theme: 'Vampires', icone: 'vampires', matin: ['Boxing kids', 'Fitness'], apresMidi: ['Volley-ball', 'Basket-ball'] },
    { jour: 'Vendredi', dates: '23 et 30 octobre', theme: 'Citrouilles', icone: 'citrouilles', journee: 'Olympiades' },
  ],
  note: 'Accueil et départ échelonnés. Repas tiré du sac et goûter à prévoir par les familles, frigo et micro-ondes sur place. Tout au long de la journée, les enfants restent sous la surveillance constante de nos coachs.',
}

/** Fiche d'inscription aux stages vacances (PDF hébergé sur parcbeauregard.com). */
export const FICHE_INSCRIPTION_STAGES =
  'https://www.parcbeauregard.com/wp-content/uploads/2026/09/FICHE-INSCRIPTION-STAGES-VACANCES-KSC.pdf'
