// Gabarit Landing réutilisable (brief §3) — pages hors menu pour campagnes Meta/Google Ads,
// événements, offres. NON indexées (noindex) et hors sitemap pour ne pas cannibaliser le SEO.
// Pour créer une nouvelle landing : ajouter une entrée ici, la route /landing/<slug> se génère seule.
export type Landing = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string // sur-titre (accroche courte)
  h1: string
  sousTitre: string
  image: string
  points: { titre: string; texte: string }[]
  preuve: { texte: string; auteur: string }
  ctaLabel: string // libellé du bouton principal (S'inscrire = Bodylink placeholder)
  reassurance: string[] // bandeau de réassurance (puces courtes)
}

export const LANDINGS: Landing[] = [
  {
    slug: 'anniversaire-sportif',
    metaTitle: 'Anniversaire sportif enfant à Rochecorbon — Kid Sport Club',
    metaDescription:
      "Offrez un anniversaire sportif inoubliable à votre enfant à Rochecorbon : jeux, parcours, espace privatisé et goûter. Formule clé en main encadrée. Réservez votre date.",
    eyebrow: 'Anniversaire clé en main · 3 – 14 ans',
    h1: 'Un anniversaire sportif inoubliable à Rochecorbon',
    sousTitre:
      "Jeux, parcours et défis sportifs encadrés par nos coachs, dans un espace rien que pour vous, suivis du goûter. Vous n'avez qu'à profiter, on s'occupe de tout.",
    image: '/assets/ksc/anniversaire.webp',
    points: [
      { titre: 'Formule clé en main', texte: 'Animation, matériel et espace privatisé : tout est prévu, vous venez les mains dans les poches.' },
      { titre: 'Encadré par des coachs', texte: 'Des animateurs diplômés mènent les jeux en toute sécurité, adaptés à l’âge des enfants.' },
      { titre: 'Espace privatisé + goûter', texte: 'Votre créneau rien que pour votre groupe, avec un espace pour souffler les bougies.' },
    ],
    preuve: { texte: 'Un anniversaire au top, les enfants ont adoré et n’ont pas vu le temps passer !', auteur: 'Un parent — avis à confirmer' },
    ctaLabel: 'Réserver une date',
    reassurance: ['Espace sécurisé', 'Encadrement diplômé', 'De 3 à 14 ans', 'Au bord de la Loire'],
  },
  {
    slug: 'stage-vacances',
    metaTitle: 'Stage sportif enfant pendant les vacances à Rochecorbon — Kid Sport Club',
    metaDescription:
      "Occupez vos enfants pendant les vacances à Rochecorbon : stages sportifs multi-activités, encadrés, par groupes d'âge. Mercredis et vacances scolaires. Places limitées.",
    eyebrow: 'Vacances & mercredis · 3 – 14 ans',
    h1: 'Des vacances qui bougent au Kid Sport Club',
    sousTitre:
      "Une semaine de sport, de jeux et de copains : vos enfants se dépensent et découvrent de nouveaux sports, encadrés par nos coachs, du matin au soir.",
    image: '/assets/ksc/stages-vacances.webp',
    points: [
      { titre: 'Multi-activités', texte: 'Un programme varié chaque jour : motricité, jeux collectifs, parcours et défis.' },
      { titre: 'Toutes les vacances', texte: 'Stages pendant les vacances scolaires et les mercredis (8h00 – 17h30).' },
      { titre: 'Groupes par âge', texte: 'Chaque enfant progresse à son rythme, dans un groupe adapté, en toute sécurité.' },
    ],
    preuve: { texte: 'Mon fils réclame de revenir à chaque vacances, il adore les stages !', auteur: 'Un parent — avis à confirmer' },
    ctaLabel: 'Réserver une place',
    reassurance: ['Encadrement diplômé', 'Groupes par âge', 'Mercredis + vacances', 'Journée complète'],
  },
]

export const landingBySlug = (slug: string) => LANDINGS.find((l) => l.slug === slug)
