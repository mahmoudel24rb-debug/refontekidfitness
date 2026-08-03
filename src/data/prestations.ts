// Les 7 prestations Kid Sport Club (brief Victor Lucien-Brun).
// Contenu rédigé FR orienté parents. Prix/photos = à fournir par le client.

// Une discipline pratiquée dans une tranche d'âge (4 fiches « cours » only).
// Le nom sert d'ancre sur la fiche : /nos-prestations/[slug]#[slugifie(nom)].
// Descriptions rédigées en interne : À FAIRE VALIDER par le club avant mise en
// ligne (certaines disciplines peuvent ne plus être proposées).
export type Discipline = { nom: string; description: string }

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
    disciplines: [
      {
        nom: 'Gym maman bébé',
        description:
          'Un temps de sport partagé entre le parent et son bébé. Les exercices permettent de reprendre une activité physique en douceur tout en gardant son enfant tout près de soi, dans une ambiance complice.',
      },
      {
        nom: 'Baby éveil',
        description:
          'Une séance d’éveil sensoriel rythmée par la musique et les comptines. Le tout-petit écoute, manipule et imite : autant d’occasions de découvrir des sons, des mots et les tout premiers échanges.',
      },
      {
        nom: 'Baby Gym & Dance',
        description:
          'Le mouvement et le rythme réunis dans une même séance. Parcours de motricité, jeux dansés et petit matériel adapté développent l’équilibre et la coordination dès le plus jeune âge.',
      },
      {
        nom: 'Accueil Assistantes Maternelles',
        description:
          'Un créneau réservé aux assistantes maternelles et à leurs groupes d’enfants. La salle est aménagée pour l’éveil moteur des tout-petits, dans un espace calme et sécurisé.',
      },
      {
        nom: 'Baby Rugby',
        description:
          'Une première approche du ballon ovale, sans contact et entièrement sous forme de jeux. L’enfant court, attrape, porte et apprend à partager l’espace avec les autres.',
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
    disciplines: [
      {
        nom: 'Kid Gym & Dance',
        description:
          'La danse et la gymnastique se répondent dans des enchaînements simples que l’enfant explore librement. Il gagne en coordination, en équilibre et en souplesse tout en s’exprimant en musique.',
      },
      {
        nom: 'Kid Training & Boxing',
        description:
          'Une initiation ludique aux premiers gestes techniques, toujours sans contact. Les ateliers alternent déplacements, précision et petits circuits, de quoi canaliser l’énergie du groupe.',
      },
      {
        nom: 'Sports de Ballon',
        description:
          'Football, rugby, handball, volley : l’enfant découvre plusieurs ballons et leurs règles simplifiées, et apprend surtout à jouer avec les autres.',
      },
      {
        nom: 'Multisports',
        description:
          'Une séance différente à chaque fois : ballons, raquettes, parcours, jeux d’opposition. De quoi essayer largement avant de savoir ce qui plaît le plus.',
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
    disciplines: [
      {
        nom: 'Fun Fit Zumba',
        description:
          'Du fitness dansé sur des musiques entraînantes, sans aucune notion de performance. Les chorégraphies s’apprennent pas à pas, dans une ambiance joyeuse.',
      },
      {
        nom: 'Pompom Girl',
        description:
          'Jeux de coordination, portés simples et mini-chorégraphies montées ensemble. Le groupe apprend à se synchroniser puis à présenter son travail.',
      },
      {
        nom: 'Cross Training & Boxing',
        description:
          'Des circuits variés pour construire les bases physiques : gainage, déplacements, cardio, complétés par des techniques de boxe sans contact.',
      },
      {
        nom: 'Gym acrobatique',
        description:
          'Roulades, équilibres, premières figures : les acrobaties s’apprennent progressivement, avec parade et matériel adapté au niveau de chacun.',
      },
      {
        nom: 'Sports de Ballon',
        description:
          'Football, handball, rugby et volley en alternance. Le jeu se structure : placement, passes, respect des règles et des coéquipiers.',
      },
      {
        nom: 'Fit’ Family',
        description:
          'Une séance à vivre en duo parent-enfant. Défis sportifs, relais et ateliers en équipe : on s’encourage et on progresse ensemble.',
      },
      {
        nom: 'Sports de Combat',
        description:
          'Initiation au judo, à la boxe et au karaté, centrée sur le respect du partenaire, la maîtrise de soi et la confiance.',
      },
      {
        nom: 'Kid coaching',
        description:
          'Un accompagnement plus individualisé pour l’enfant qui a besoin d’un objectif à lui : reprise d’activité, confiance, progression à son rythme.',
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
    disciplines: [
      {
        nom: 'Fitness',
        description:
          'Des séances dynamiques et variées, calibrées pour un corps en pleine croissance : renforcement, cardio et mobilité, avec des intensités adaptées à l’âge.',
      },
      {
        nom: 'Cross Training & Boxing',
        description:
          'Des circuits plus structurés qu’en primaire, complétés par du travail technique de boxe sans contact. L’ado apprend à doser son effort et à suivre sa progression.',
      },
      {
        nom: 'Fit’ Family',
        description:
          'Le rendez-vous sportif parent-ado : défis à deux, relais et ateliers en équipe, pour bouger ensemble sans esprit de compétition.',
      },
      {
        nom: 'Gym acrobatique',
        description:
          'Perfectionnement des figures et travail des enchaînements complets, avec le gainage et la souplesse nécessaires pour les réaliser en sécurité.',
      },
      {
        nom: 'Sports de Ballon',
        description:
          'Pratique confirmée du football, du handball, du rugby et du volley : placement, tactique, arbitrage et matchs à effectif réduit.',
      },
      {
        nom: 'Pompom Girl',
        description:
          'Des chorégraphies complètes à mémoriser, avec des mouvements plus dynamiques et un vrai travail de groupe jusqu’à la présentation.',
      },
      {
        nom: 'Zumba family',
        description:
          'Une séance de danse fitness ouverte aux ados et à leurs parents : rythme soutenu, chorégraphies accessibles et beaucoup de bonne humeur.',
      },
    ],
  },
]

export const prestationBySlug = (slug: string) => PRESTATIONS.find((p) => p.slug === slug)
