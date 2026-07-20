// Gabarit Landing réutilisable (brief §3) — pages hors menu pour campagnes Meta/Google Ads,
// événements, offres. NON indexées (noindex) et hors sitemap pour ne pas cannibaliser le SEO.
// Pour créer une nouvelle landing : ajouter une entrée ici, la route /landing/<slug> se génère seule.
// Sections optionnelles (rendues seulement si renseignées) : etapes, tarif, avis (les 3 vrais
// avis parents), faq (questions piochées dans data/faq par intitulé exact), catalogue (blocs
// de TOUTES les prestations avec CTA vers le calendrier CRM — cf. CRM_INSCRIPTION_URL).
export type Landing = {
  slug: string
  metaTitle: string
  metaDescription: string
  eyebrow: string // sur-titre (accroche courte)
  h1: string
  sousTitre: string
  image: string
  points: { titre: string; texte: string }[]
  preuve?: { texte: string; auteur: string } // preuve sociale optionnelle — n'ajouter que de VRAIS avis clients
  ctaLabel: string // libellé du bouton principal (S'inscrire = placeholder inscription en ligne)
  reassurance: string[] // bandeau de réassurance (puces courtes)
  /** « Comment ça se passe » — 3 étapes max, dérivées de textes validés uniquement. */
  etapes?: { titre: string; texte: string }[]
  /** Bloc tarif réel (jamais de prix inventé). */
  tarif?: { prix: string; details: string[] }
  /** Affiche les 3 vrais avis parents (data/avis). */
  avis?: boolean
  /** Intitulés EXACTS de questions de data/faq à afficher en accordéons. */
  faq?: string[]
  /** Landing catalogue : blocs de toutes les prestations, CTA -> calendrier CRM. */
  catalogue?: boolean
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
      { titre: 'Toutes les vacances', texte: 'Stages pendant les vacances scolaires, et les Mercredis Sportifs pendant l’année scolaire.' },
      { titre: 'Groupes par âge', texte: 'Chaque enfant progresse à son rythme, dans un groupe adapté, en toute sécurité.' },
    ],
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
    // Landing « catalogue » demandée par le client : toutes les prestations en
    // blocs, chaque bouton d'inscription ouvrira le calendrier du CRM
    // (CRM_INSCRIPTION_URL, placeholder « # » en attendant le lien).
    slug: 'prestations',
    metaTitle: 'Inscriptions — toutes nos prestations | Kid Sport Club Rochecorbon',
    metaDescription:
      "Inscrivez votre enfant au Kid Sport Club de Rochecorbon : cours par âge dès 10 mois, Mercredis Sportifs, stages vacances et anniversaires. Choisissez votre prestation.",
    eyebrow: 'Inscriptions · 10 mois – 14 ans',
    h1: 'Le sport des enfants, sous toutes ses formes',
    sousTitre:
      'De la baby gym dès 10 mois au sport ado, en passant par les mercredis sportifs, les stages et les anniversaires : au Kid Sport Club de Rochecorbon, chaque enfant trouve son activité.',
    image: '/assets/ksc/esprit-equipe.webp',
    points: [],
    ctaLabel: 'S’inscrire',
    reassurance: ['Encadrement diplômé', 'De 10 mois à 14 ans', 'Groupes par âge', 'Au bord de la Loire'],
    catalogue: true,
    avis: true,
    faq: [
      'Puis-je assister à une séance d’essai avant de m’inscrire ?',
      'Comment s’inscrire à un cours à l’année ?',
      'Quels sont vos tarifs ?',
    ],
  },
]

export const landingBySlug = (slug: string) => LANDINGS.find((l) => l.slug === slug)
