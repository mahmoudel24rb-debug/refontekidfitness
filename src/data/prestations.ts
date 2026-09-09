// Les 7 prestations Kid Sport Club (brief Victor Lucien-Brun).
// Contenu rédigé FR orienté parents. Prix/photos = à fournir par le client.

// Une activité pratiquée dans une tranche d'âge (4 fiches « cours » only).
// Chaque activité a désormais SA page : /nos-prestations/[slug]/[discipline].
// `slug` est stocké explicitement et vaut slugifie(nom), à une exception près :
// Fit'Family garde son slug historique `fit-family`, déjà en ligne. C'est aussi
// l'ancre du bloc sur la fiche parent, à ne pas casser.
// `accroche` = le résumé court affiché en sous-titre du hero et sur les cartes
// (c'est l'ancien champ `description`).
// Retour client n5 : la liste des cours et leurs descriptifs viennent du club
// (16 cours), repris tels quels. `intro`, `benefices` et `pourQui` sont vides :
// les blocs correspondants ne sont pas rendus tant que le club ne fournit rien.
export type Discipline = {
  nom: string
  /** = slugifie(nom), sauf slug historique conservé. Segment d'URL et ancre. */
  slug: string
  /** Résumé court (hero de la page, carte de la fiche, chips du hub). */
  accroche: string
  /** Corps de la page : 2 paragraphes. */
  intro: string[]
  /** Liste à puces cochées de la page (3 à 5 lignes). */
  benefices: string[]
  /** Paragraphe « Pour qui ? ». */
  pourQui: string
  /** Durée d'une séance en minutes (pastille « 45 min », « 1h »). */
  duree?: number
  /** Nom(s) de l'activité dans le planning, séparés par « | ». */
  activitePlanning?: string
}

// Une étape du déroulé de la journée (Mercredis Sportifs, Stages vacances).
export type EtapeDeroule = {
  /** Ex. : « 7h30 – 10h00 ». */
  horaire: string
  titre: string
  description: string
}

export type Prestation = {
  slug: string
  titre: string
  age: string
  accroche: string
  intro: string
  benefices: string[]
  creneaux: string
  prix: string
  image: string
  motCle: string // mot-clé SEO focus
  disciplines?: Discipline[]
  /** Note affichée sous la grille des activités (astérisque Multisports). */
  noteDisciplines?: string
  /** Phrase d'introduction du déroulé de la journée (optionnelle). */
  derouleIntro?: string
  /** Étapes de la journée, dans l'ordre. Absent : pas de section déroulé. */
  deroule?: EtapeDeroule[]
  /** Note affichée sous les étapes du déroulé. */
  derouleNote?: string
}

// Déroulé de la journée des Mercredis Sportifs et des Stages vacances : mêmes
// étapes et mêmes descriptifs de part et d'autre, seul l'horaire d'accueil
// change (7h30 le mercredi, 8h00 pendant les vacances). Textes fournis par le
// club, repris tels quels.
const derouleJournee = (debutAccueil: string): EtapeDeroule[] => [
  {
    horaire: `${debutAccueil} – 10h00`,
    titre: 'Accueil échelonné',
    description:
      'Les enfants sont accueillis progressivement par nos coachs, sous surveillance constante.',
  },
  {
    horaire: '10h00 – 12h00',
    titre: 'Activités physiques encadrées',
    description:
      "Séances sportives animées par nos coachs, avec accès aux cours dispensés dans l'établissement selon les envies de l'enfant et sa tranche d'âge.",
  },
  {
    horaire: '12h00 – 14h00',
    titre: 'Pause déjeuner & temps calme',
    description:
      "Repas tiré du sac (à prévoir par les familles), frigo et micro-ondes à disposition sur place. Les coachs déjeunent avec les enfants et les accompagnent pour faire chauffer leur repas et tout ce dont ils ont besoin. Suivi d'un temps calme, libre ou d'une sieste selon les besoins de l'enfant.",
  },
  {
    horaire: '14h00 – 16h00',
    titre: 'Activités physiques encadrées',
    description:
      'Nouvelle séquence sportive, dans la continuité de la matinée, toujours encadrée par nos coachs.',
  },
  {
    horaire: '16h00 – 18h00',
    titre: 'Goûter & départ échelonné',
    description:
      "Goûter à prévoir par les familles. Les enfants repartent au fur et à mesure, selon l'horaire choisi par les parents.",
  },
]

// Note commune aux deux déroulés.
const DEROULE_NOTE =
  'Tout au long de la journée, les enfants restent sous la surveillance constante de nos coachs.'

export const PRESTATIONS: Prestation[] = [
  {
    slug: 'mercredis-sportifs',
    titre: 'Mercredis Sportifs',
    age: 'Tous âges',
    accroche: 'Tous les mercredis, votre enfant fait du sport au club.',
    intro: "Une journée sportive et encadrée pour les enfants, tous les mercredis pendant l’année scolaire (hors vacances d’été). Entre activités physiques variées, jeux collectifs et moments de détente, vos enfants bougent, apprennent et s’amusent en toute sécurité, encadrés par notre équipe.",
    benefices: ['Tous les mercredis de l’année scolaire', 'Encadrement diplômé et bienveillant', 'Sport, jeux et activités variées', 'Cadre sécurisé au bord de la Loire'],
    creneaux: 'Tous les mercredis (hors vacances d’été).',
    prix: '95 €/mois',
    image: '/assets/ksc/mercredis-sportifs.webp',
    motCle: 'mercredis sportifs enfant Rochecorbon',
    deroule: derouleJournee('7h30'),
    derouleNote: DEROULE_NOTE,
  },
  {
    slug: 'stages-vacances',
    titre: 'Stages vacances',
    age: '3 – 14 ans',
    accroche: 'Une semaine de sport, de jeux et de bonne humeur pendant les vacances.',
    intro: "Pendant les vacances scolaires, Kid Sport Club propose des stages sportifs à la journée ou à la semaine. Multisport, jeux d’équipe, ateliers thématiques : une manière active et encadrée d’occuper les vacances de vos enfants, en journée complète ou à la carte.",
    benefices: ['Stages pendant toutes les vacances scolaires', 'Multi-activités sportives variées', 'Groupes par âge, encadrement diplômé', 'Journée ou semaine complète'],
    creneaux: 'Pendant les vacances scolaires.',
    prix: '35 €/jour · 150 €/semaine',
    image: '/assets/ksc/stages-vacances.webp',
    motCle: 'stage sportif enfant vacances Tours',
    derouleIntro: 'Même principe que les Mercredis Sportifs, avec un accueil dès 8h00.',
    deroule: derouleJournee('8h00'),
    derouleNote: DEROULE_NOTE,
  },
  {
    slug: 'anniversaire',
    titre: 'Anniversaire',
    age: '3 – 14 ans',
    accroche: 'Fêtez l’anniversaire de votre enfant en plein sport, on s’occupe de tout.',
    intro: "Fêtez l’anniversaire de votre enfant autrement ! Pendant 2 heures, jusqu’à 10 enfants profitent d’activités sportives et de jeux encadrés par notre équipe. Gâteau, décoration et boissons sont inclus : vous n’avez rien à préparer, on s’occupe de tout.",
    benefices: ['Formule clé en main', 'Jeux et parcours sportifs encadrés', 'Gâteau, déco et boissons inclus', 'Jusqu’à 10 enfants, espace privatisé'],
    creneaux: 'Sur réservation, nous contacter.',
    prix: '250 € / 2h (max 10 enfants)',
    image: '/assets/ksc/anniversaire.webp',
    motCle: 'anniversaire enfant Tours',
  },
  {
    slug: 'cours-10-36-mois',
    titre: 'Cours 10 – 36 mois',
    age: '10 mois – 3 ans',
    accroche: 'Éveil moteur et baby gym pour les tout-petits.',
    intro: "Une découverte tout en douceur du mouvement, pensée pour les tout-petits. À cet âge, chaque séance stimule la motricité globale, l’équilibre et la coordination à travers le jeu et la manipulation de petit matériel adapté. Les parents sont invités à participer activement à certaines séances pour partager ce moment avec leur enfant.",
    benefices: ['Éveil moteur et sensoriel', 'Parents invités à participer à certaines séances', 'Matériel adapté aux tout-petits', 'En douceur, au rythme de l’enfant'],
    creneaux: 'Plusieurs créneaux par semaine : voir le planning.',
    prix: 'À partir de 29,90 €/mois',
    image: '/assets/ksc/cours-10-36-mois.webp',
    motCle: 'baby gym Tours',
    disciplines: [
      {
        nom: 'Baby Gym Dance',
        slug: 'baby-gym-dance',
        duree: 45,
        activitePlanning: 'Baby Gym',
        accroche:
          'Un cours mêlant motricité, souplesse et expression corporelle. Les tout-petits découvrent les bases de la gymnastique (roulades, équilibres) et de la danse à travers des jeux rythmés adaptés à leur âge, accompagnés par leurs parents.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
    ],
  },
  {
    slug: 'cours-3-5-ans',
    titre: 'Cours 3 – 5 ans',
    age: '3 – 5 ans',
    accroche: 'L’éveil sportif : parcours, jeux et premières activités pour se dépenser.',
    intro: "Les enfants développent leur motricité fine et globale à travers des parcours ludiques, des jeux collectifs et des ateliers sensoriels. L’objectif : apprendre à bouger, à se repérer dans l’espace et à gagner en confiance, toujours dans un cadre bienveillant et sécurisé.",
    benefices: ['Parcours et jeux de motricité', 'Coordination et équilibre', 'Premiers jeux collectifs', 'Confiance et autonomie'],
    creneaux: 'Plusieurs créneaux par semaine : voir le planning.',
    prix: 'À partir de 29,90 €/mois',
    image: '/assets/ksc/cours-3-5-ans.webp',
    motCle: 'éveil sportif 3-5 ans',
    noteDisciplines: '*Multisports : football, rugby, basket, volley, hand-ball, judo, karaté…',
    disciplines: [
      {
        nom: 'Gym & Dance',
        slug: 'gym-et-dance',
        duree: 45,
        activitePlanning: 'Gym Dance',
        accroche:
          'Un cours pour découvrir les premiers pas du sport, le tout en musique. Les enfants progressent sur des parcours de motricité plus élaborés que chez les tout-petits (équilibres, sauts, roulades, franchissements), pour gagner en agilité, en repères corporels et en confiance dans le mouvement.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Cross Training & Boxing',
        slug: 'cross-training-et-boxing',
        duree: 45,
        activitePlanning: 'Cross Boxe',
        accroche:
          'Un cours qui pose les vraies bases du sport : placement du dos, gainage et premiers mouvements de fitness, associés à de la boxe éducative (sans contact). Un vrai travail sportif, mené de façon progressive et adaptée aux 3-5 ans.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Multisports',
        slug: 'multisports',
        duree: 60,
        activitePlanning: 'Multisports',
        accroche:
          'Cours de découverte multi-activités (football, rugby, basket, volley, hand-ball, judo, karaté…), abordées de façon ludique et progressive, sans esprit de compétition, afin que chaque enfant trouve le ou les sports qui lui plaisent.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
    ],
  },
  {
    slug: 'cours-6-10-ans',
    titre: 'Cours 6 – 10 ans',
    age: '6 – 10 ans',
    accroche: 'Le multisports : découvrir de nombreux sports et l’esprit d’équipe.',
    intro: "Place à la multisport ! Les enfants explorent différentes disciplines (motricité, sports collectifs, agrès, jeux d’adresse) pour développer leurs capacités physiques tout en s’amusant. Cette diversité permet à chacun de trouver ce qui lui plaît, sans spécialisation précoce.",
    benefices: ['Initiation à de multiples sports', 'Esprit d’équipe et collectif', 'Habileté et condition physique', 'Encadrement diplômé'],
    creneaux: 'Plusieurs créneaux par semaine : voir le planning.',
    prix: 'À partir de 29,90 €/mois',
    image: '/assets/ksc/cours-6-10-ans.webp',
    motCle: 'multisports enfant Tours',
    noteDisciplines: '*Multisports : football, rugby, basket, volley, hand-ball, judo, karaté…',
    disciplines: [
      {
        nom: 'Pompom Girl',
        slug: 'pompom-girl',
        duree: 45,
        activitePlanning: 'Pompom|Pompom Girl',
        accroche:
          "Un cours de danse sportive et énergique, mêlant chorégraphies rythmées, maniement des pompons, sauts et petites acrobaties. Les enfants travaillent la coordination, la synchronisation et l'esprit d'équipe, dans une ambiance dynamique et festive.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Cross Training & Boxing',
        slug: 'cross-training-et-boxing',
        duree: 45,
        activitePlanning: 'Cross Boxe',
        accroche:
          "Un cours dynamique qui pose les vraies bases du sport : placement du dos, gainage, renforcement musculaire et premiers mouvements de fitness, associés à de la boxe éducative (sans contact). Les enfants découvrent aussi les premiers exercices avec charges légères, adaptées à leurs capacités physiques : un travail naturel puisque leur corps est déjà sollicité au quotidien (cartable, jeux, etc.). Un travail sportif complet, progressif et adapté à la tranche d'âge.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Multisports',
        slug: 'multisports',
        duree: 60,
        activitePlanning: 'Multisports',
        accroche:
          'Cours de découverte multi-activités (football, rugby, basket, volley, hand-ball, judo, karaté…), abordées de façon ludique et progressive, sans esprit de compétition, afin que chaque enfant trouve le ou les sports qui lui plaisent.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: "Fit'Family (Parent/Enfant)",
        slug: 'fit-family',
        duree: 60,
        activitePlanning: 'Fit Family',
        accroche:
          "Un vrai cours de fitness à partager en duo parent-enfant, mêlant exercices ludiques, renforcement et jeux coopératifs. Un moment de sport et de complicité, où l'on se dépense ensemble dans la bonne humeur.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Zumba Mix Dance',
        slug: 'zumba-mix-dance',
        duree: 45,
        activitePlanning: 'Zumba',
        accroche:
          'Un cours de Zumba Mix Dance, sur des rythmes latinos et internationaux. Une séance rythmée et festive qui allie cardio, coordination et bonne humeur.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Gym Accro / Jungle Warrior',
        slug: 'gym-accro-jungle-warrior',
        duree: 60,
        activitePlanning: 'Gym Accro',
        accroche:
          "Un cours d'acrosport qui combine gymnastique et figures acrobatiques réalisées à plusieurs. Les enfants développent leur équilibre, la confiance en l'autre et le travail collectif, à travers portés et figures progressives.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
    ],
  },
  {
    slug: 'cours-11-14-ans',
    titre: 'Cours 11 – 14 ans',
    age: '11 – 14 ans',
    accroche: 'Le sport ado : cross training, cardio, boxe… pour se dépasser.',
    intro: "Une approche plus sportive et exigeante, pensée pour accompagner les préados dans leur développement physique : renforcement, coordination, esprit d’équipe. Les séances préparent aussi en douceur à une pratique sportive plus intensive si l’enfant souhaite se spécialiser plus tard.",
    benefices: ['Cross training, cardio, boxe', 'Préparation physique', 'Dépassement de soi', 'Ambiance motivante et encadrée'],
    creneaux: 'Plusieurs créneaux par semaine : voir le planning.',
    prix: 'À partir de 29,90 €/mois',
    image: '/assets/ksc/cours-11-14-ans.webp',
    motCle: 'sport ado Tours',
    noteDisciplines: '*Multisports : football, rugby, basket, volley, hand-ball, judo, karaté…',
    disciplines: [
      {
        nom: 'Pompom Girl',
        slug: 'pompom-girl',
        duree: 45,
        activitePlanning: 'Pompom|Pompom Girl',
        accroche:
          "Un cours de danse sportive et énergique, mêlant chorégraphies rythmées, maniement des pompons, sauts et petites acrobaties. Les enfants travaillent la coordination, la synchronisation et l'esprit d'équipe, dans une ambiance dynamique et festive.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Cross Training & Boxing',
        slug: 'cross-training-et-boxing',
        duree: 45,
        activitePlanning: 'Cross Boxe',
        accroche:
          "Un cours dynamique qui pose les vraies bases du sport : placement du dos, gainage, renforcement musculaire et premiers mouvements de fitness, associés à de la boxe éducative (sans contact). Les enfants découvrent aussi les premiers exercices avec charges légères, adaptées à leurs capacités physiques : un travail naturel puisque leur corps est déjà sollicité au quotidien (cartable, jeux, etc.). Un travail sportif complet, progressif et adapté à la tranche d'âge.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Multisports',
        slug: 'multisports',
        duree: 60,
        activitePlanning: 'Multisports',
        accroche:
          'Cours de découverte multi-activités (football, rugby, basket, volley, hand-ball, judo, karaté…), abordées de façon ludique et progressive, sans esprit de compétition, afin que chaque enfant trouve le ou les sports qui lui plaisent.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: "Fit'Family (Parent/Enfant)",
        slug: 'fit-family',
        duree: 60,
        activitePlanning: 'Fit Family',
        accroche:
          "Un vrai cours de fitness à partager en duo parent-enfant, mêlant exercices ludiques, renforcement et jeux coopératifs. Un moment de sport et de complicité, où l'on se dépense ensemble dans la bonne humeur.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Zumba Mix Dance',
        slug: 'zumba-mix-dance',
        duree: 45,
        activitePlanning: 'Zumba',
        accroche:
          'Un cours de Zumba Mix Dance, sur des rythmes latinos et internationaux. Une séance rythmée et festive qui allie cardio, coordination et bonne humeur.',
        intro: [],
        benefices: [],
        pourQui: '',
      },
      {
        nom: 'Gym Accro / Jungle Warrior',
        slug: 'gym-accro-jungle-warrior',
        duree: 60,
        activitePlanning: 'Gym Accro',
        accroche:
          "Un cours d'acrosport qui combine gymnastique et figures acrobatiques réalisées à plusieurs. Les enfants développent leur équilibre, la confiance en l'autre et le travail collectif, à travers portés et figures progressives.",
        intro: [],
        benefices: [],
        pourQui: '',
      },
    ],
  },
]

export const prestationBySlug = (slug: string) => PRESTATIONS.find((p) => p.slug === slug)

/** Résout une activité par son segment d'URL au sein d'une prestation. */
export const disciplineBySlug = (prestation: Prestation, slug: string) =>
  prestation.disciplines?.find((d) => d.slug === slug)
