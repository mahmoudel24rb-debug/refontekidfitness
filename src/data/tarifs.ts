// Tarifs Kid Sport Club — données du récap client, recopiées telles quelles.
// Abonnements aux cours + prestations. La carte « Illimité » (49,90) est mise
// en avant (FEATURED_TITRE) : badge « La plus choisie » et léger scale desktop.
export type Tarif = { titre: string; prix: string; detail: string }

export const ABONNEMENTS: Tarif[] = [
  { titre: '1 cours / semaine', prix: '29,90 €/mois', detail: 'Engagement 10 mois' },
  { titre: '1 cours / semaine, sans engagement', prix: '39,90 €/mois', detail: '+10 €/mois' },
  { titre: 'Illimité', prix: '49,90 €/mois', detail: 'Engagement 10 mois' },
  { titre: 'Illimité, sans engagement', prix: '59,90 €/mois', detail: '+10 €/mois' },
  { titre: 'Carte 10 séances', prix: '190 €', detail: 'Payable en 1 fois, nominative, valable 6 mois' },
]

export const PRESTATIONS_TARIFS: Tarif[] = [
  { titre: 'Mercredis Sportifs', prix: '95 €/mois', detail: 'Tous les mercredis, sur 10 mois (hors vacances d’été)' },
  { titre: 'Stages vacances', prix: '35 €/jour ou 150 €/semaine', detail: 'Pendant les vacances scolaires' },
  { titre: 'Anniversaire', prix: '250 € / 2h', detail: 'Max 10 enfants, gâteau + déco + boissons inclus' },
]

// Carte mise en avant (bordure magenta, badge « La plus choisie », scale desktop).
export const FEATURED_TITRE = 'Illimité'
