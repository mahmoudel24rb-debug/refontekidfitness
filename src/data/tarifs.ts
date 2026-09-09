// Tarifs Kid Sport Club — données du récap client, recopiées telles quelles.
// Abonnements aux cours + prestations. La carte « Illimité » (49,90) est mise
// en avant (FEATURED_TITRE) : badge « La plus choisie » et léger scale desktop.
//
// `avantages` : points listés sous le prix des cartes d'abonnement. Ils ne
// contiennent QUE des faits déjà établis ailleurs dans le site — le contenu du
// champ « détail » de la formule (engagement 10 mois, carte nominative valable
// 6 mois), la gratuité de la séance d'essai (FAQ et page /seance-essai) et le
// fait que les cours se choisissent dans le planning, par tranche d'âge
// (fiches activités). Rien n'y est promis qui ne soit vrai ailleurs.
// `icone` : pastille en tête de carte (lucide Zap / Layers2 / Layers3 /
// CreditCard / CalendarDays / Sun).
// `prioritaire` : formule mise en avant sur /tarifs (carte complète avec
// pastille, avantages et CTA). Les autres formules y sont rendues en ligne
// compacte. Retour client n5 : 4 formules prioritaires.
export type IconeTarif = 'zap' | 'layers2' | 'layers3' | 'carte' | 'calendrier' | 'vacances'

export type Tarif = {
  titre: string
  prix: string
  detail: string
  avantages?: string[]
  icone?: IconeTarif
  prioritaire?: boolean
}

export const ABONNEMENTS: Tarif[] = [
  {
    titre: '1 cours / semaine',
    prix: '29,90 €/mois',
    detail: 'Engagement 10 mois',
    prioritaire: true,
    icone: 'zap',
    avantages: [
      '1 cours par semaine, au choix dans le planning',
      'Dans la tranche d’âge de votre enfant',
      'Engagement 10 mois',
      'Séance d’essai gratuite avant de vous décider',
    ],
  },
  {
    titre: '1 cours / semaine, sans engagement',
    prix: '39,90 €/mois',
    detail: '+10 €/mois',
    icone: 'zap',
    avantages: [
      '1 cours par semaine, au choix dans le planning',
      'Dans la tranche d’âge de votre enfant',
      'Sans engagement, résiliable à tout moment',
      'Séance d’essai gratuite avant de vous décider',
    ],
  },
  {
    titre: 'Illimité',
    prix: '49,90 €/mois',
    detail: 'Engagement 10 mois',
    prioritaire: true,
    icone: 'layers2',
    avantages: [
      'Tous les cours de la tranche d’âge, en illimité',
      'Sans limite de séances dans la semaine',
      'Engagement 10 mois',
      'Séance d’essai gratuite avant de vous décider',
    ],
  },
  {
    titre: 'Illimité, sans engagement',
    prix: '59,90 €/mois',
    detail: '+10 €/mois',
    icone: 'layers3',
    avantages: [
      'Tous les cours de la tranche d’âge, en illimité',
      'Sans limite de séances dans la semaine',
      'Sans engagement, résiliable à tout moment',
      'Séance d’essai gratuite avant de vous décider',
    ],
  },
  {
    titre: 'Carte 10 séances',
    prix: '190 €',
    detail: 'Payable en 1 fois, nominative, valable 6 mois',
    icone: 'carte',
    avantages: [
      '10 séances à utiliser librement dans le planning',
      'Carte nominative',
      'Valable 6 mois',
      'Sans engagement',
    ],
  },
]

// Les avantages des Mercredis Sportifs et des Stages vacances sont rédigés à
// partir du déroulé de journée fourni par le club (accueil échelonné, activités
// encadrées matin et après-midi, départ échelonné) : rien n'y est promis qui ne
// figure pas dans le déroulé publié sur la fiche.
export const PRESTATIONS_TARIFS: Tarif[] = [
  {
    titre: 'Mercredis Sportifs',
    prix: '95 €/mois',
    detail: 'Tous les mercredis, sur 10 mois (hors vacances d’été)',
    prioritaire: true,
    icone: 'calendrier',
    avantages: [
      'Tous les mercredis, hors vacances d’été',
      'Accueil échelonné de 7h30 à 10h00',
      'Activités sportives encadrées matin et après-midi',
      'Départ échelonné jusqu’à 18h00',
    ],
  },
  {
    titre: 'Stages vacances',
    prix: '35 €/jour ou 150 €/semaine',
    detail: 'Pendant les vacances scolaires',
    prioritaire: true,
    icone: 'vacances',
    avantages: [
      'Pendant les vacances scolaires',
      'Accueil dès 8h00',
      'Journée sportive encadrée par nos coachs',
      'À la journée ou à la semaine',
    ],
  },
  { titre: 'Anniversaire', prix: '250 € / 2h', detail: 'Max 10 enfants, gâteau + déco + boissons inclus' },
]

// Carte mise en avant (bordure magenta, badge « La plus choisie », scale desktop).
export const FEATURED_TITRE = 'Illimité'
