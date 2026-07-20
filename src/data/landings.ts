// Landings Meta Ads (hors menu, noindex, hors sitemap — brief §3).
// Deux gabarits :
// - variant 'lead' : capture du lead SUR la page (formulaire hero + sticky mobile,
//   UN objectif par page, message match annonce -> h1). Standard lead-gen Meta.
// - variant 'catalogue' : toutes les prestations en blocs, CTA -> calendrier CRM.
// Créer une variante de campagne = ajouter une entrée ici (h1 = hook de l'annonce).
export type Landing = {
  slug: string
  variant: 'lead' | 'catalogue'
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  sousTitre: string
  image: string
  /** 3 puces bénéfices condensées du hero (variant lead). */
  heroBullets?: string[]
  /** Libellé du bouton du formulaire de lead. */
  formCtaLabel?: string
  points?: { titre: string; texte: string }[]
  ctaLabel: string
  reassurance: string[]
  etapes?: { titre: string; texte: string }[]
  tarif?: { prix: string; details: string[] }
  avis?: boolean
  faq?: string[]
}

export const LANDINGS: Landing[] = [
  {
    // Lead magnet principal des campagnes Meta : l'essai gratuit (validé client).
    slug: 'essai-gratuit',
    variant: 'lead',
    metaTitle: 'Séance d’essai gratuite — Kid Sport Club Rochecorbon',
    metaDescription:
      "Réservez une séance d'essai gratuite au Kid Sport Club de Rochecorbon : votre enfant découvre l'activité, vous rencontrez l'équipe, et vous décidez ensuite.",
    eyebrow: 'Séance d’essai gratuite · 10 mois – 14 ans',
    h1: 'Venez essayer, c’est gratuit',
    sousTitre:
      "Votre enfant découvre l'activité, vous rencontrez l'équipe, et vous décidez ensuite. La séance d'essai est gratuite et sans engagement.",
    image: '/assets/ksc/esprit-equipe.webp',
    heroBullets: ['Gratuite et sans engagement', 'Réponse rapide de l’équipe', 'On vous trouve le bon créneau'],
    formCtaLabel: 'Réserver ma séance gratuite',
    ctaLabel: 'Réserver ma séance gratuite',
    reassurance: ['Encadrement diplômé', 'De 10 mois à 14 ans', 'Groupes par âge', 'Au bord de la Loire'],
    etapes: [
      { titre: 'Dites-nous qui vient', texte: 'Prénom, téléphone, âge de votre enfant : 30 secondes suffisent.' },
      { titre: 'On vous rappelle', texte: 'Votre demande est traitée directement par notre équipe, qui vous recontacte pour fixer le créneau.' },
      { titre: 'Votre enfant essaie', texte: 'Il découvre l’activité, vous rencontrez l’équipe, et vous décidez ensuite.' },
    ],
    avis: true,
    faq: [
      'Puis-je assister à une séance d’essai avant de m’inscrire ?',
      'À partir de quel âge mon enfant peut-il commencer ?',
      'Quels sont vos tarifs ?',
    ],
  },
  {
    slug: 'anniversaire-sportif',
    variant: 'lead',
    metaTitle: 'Anniversaire sportif enfant à Rochecorbon — Kid Sport Club',
    metaDescription:
      "Offrez un anniversaire sportif inoubliable à votre enfant à Rochecorbon : jeux, parcours, espace privatisé et goûter. Formule clé en main encadrée. Réservez votre date.",
    eyebrow: 'Anniversaire clé en main · 3 – 14 ans',
    h1: 'Un anniversaire sportif inoubliable à Rochecorbon',
    sousTitre:
      "Jeux, parcours et défis sportifs encadrés par nos coachs, dans un espace rien que pour vous, suivis du goûter. Vous n'avez qu'à profiter, on s'occupe de tout.",
    image: '/assets/ksc/anniversaire.webp',
    heroBullets: ['Formule clé en main', 'Gâteau + déco + boissons inclus', 'Jusqu’à 10 enfants, espace privatisé'],
    formCtaLabel: 'Réserver une date',
    ctaLabel: 'Réserver une date',
    reassurance: ['Espace sécurisé', 'Encadrement diplômé', 'De 3 à 14 ans', 'Au bord de la Loire'],
    etapes: [
      { titre: 'Réservez votre créneau', texte: 'Choisissez votre date : l’espace est privatisé pour votre groupe.' },
      { titre: 'On prépare tout', texte: 'Gâteau, décoration et boissons sont inclus — vous n’avez rien à préparer.' },
      { titre: 'Deux heures de jeux', texte: 'Jusqu’à 10 enfants profitent d’activités sportives et de jeux encadrés par notre équipe.' },
    ],
    tarif: { prix: '250 € / 2h', details: ['Max 10 enfants', 'Gâteau + déco + boissons inclus'] },
    avis: true,
    faq: [
      'Comment organiser l’anniversaire de mon enfant chez vous ?',
      'À partir de quel âge mon enfant peut-il commencer ?',
    ],
  },
  {
    slug: 'stage-vacances',
    variant: 'lead',
    metaTitle: 'Stage sportif enfant pendant les vacances à Rochecorbon — Kid Sport Club',
    metaDescription:
      "Occupez vos enfants pendant les vacances à Rochecorbon : stages sportifs multi-activités, encadrés, par groupes d'âge. Mercredis et vacances scolaires. Places limitées.",
    eyebrow: 'Vacances & mercredis · 3 – 14 ans',
    h1: 'Des vacances qui bougent au Kid Sport Club',
    sousTitre:
      "Une semaine de sport, de jeux et de copains : vos enfants se dépensent et découvrent de nouveaux sports, encadrés par nos coachs, du matin au soir.",
    image: '/assets/ksc/stages-vacances.webp',
    heroBullets: ['Multisport, jeux d’équipe, ateliers', 'À la journée ou à la semaine', 'Groupes par âge, encadrement diplômé'],
    formCtaLabel: 'Réserver une place',
    ctaLabel: 'Réserver une place',
    reassurance: ['Encadrement diplômé', 'Groupes par âge', 'Mercredis + vacances', 'Journée complète'],
    etapes: [
      { titre: 'Choisissez la formule', texte: 'À la journée ou à la semaine, en journée complète ou à la carte.' },
      { titre: 'Un programme varié', texte: 'Multisport, jeux d’équipe, ateliers thématiques : une manière active et encadrée d’occuper les vacances.' },
      { titre: 'Encadrés par notre équipe', texte: 'Des activités sportives variées encadrées par notre équipe, par groupes d’âge.' },
    ],
    tarif: { prix: '35 €/jour ou 150 €/semaine', details: ['Pendant les vacances scolaires', 'Journée ou semaine complète'] },
    avis: true,
    faq: [
      'Proposez-vous des stages pendant les vacances scolaires ?',
      'Quels sont vos tarifs ?',
    ],
  },
  {
    // Landing « catalogue » (demande client) : toutes les prestations en blocs,
    // chaque bouton ouvrira le calendrier du CRM (CRM_INSCRIPTION_URL, placeholder).
    slug: 'prestations',
    variant: 'catalogue',
    metaTitle: 'Inscriptions — toutes nos prestations | Kid Sport Club Rochecorbon',
    metaDescription:
      "Inscrivez votre enfant au Kid Sport Club de Rochecorbon : cours par âge dès 10 mois, Mercredis Sportifs, stages vacances et anniversaires. Choisissez votre prestation.",
    eyebrow: 'Inscriptions · 10 mois – 14 ans',
    h1: 'Le sport des enfants, sous toutes ses formes',
    sousTitre:
      'De la baby gym dès 10 mois au sport ado, en passant par les mercredis sportifs, les stages et les anniversaires : au Kid Sport Club de Rochecorbon, chaque enfant trouve son activité.',
    image: '/assets/ksc/esprit-equipe.webp',
    ctaLabel: 'S’inscrire',
    reassurance: ['Encadrement diplômé', 'De 10 mois à 14 ans', 'Groupes par âge', 'Au bord de la Loire'],
    avis: true,
    faq: [
      'Puis-je assister à une séance d’essai avant de m’inscrire ?',
      'Comment s’inscrire à un cours à l’année ?',
      'Quels sont vos tarifs ?',
    ],
  },
]

export const landingBySlug = (slug: string) => LANDINGS.find((l) => l.slug === slug)
