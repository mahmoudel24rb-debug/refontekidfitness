// Les 7 prestations Kid Sport Club (brief Victor Lucien-Brun).
// Contenu rédigé FR orienté parents. Prix/photos = à fournir par le client.
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
}

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
  },
]

export const prestationBySlug = (slug: string) => PRESTATIONS.find((p) => p.slug === slug)
