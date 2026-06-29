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
  image: string
  motCle: string // mot-clé SEO focus
}

export const PRESTATIONS: Prestation[] = [
  {
    slug: 'garderie',
    titre: 'Garderie',
    age: 'Tous âges',
    accroche: 'Un accueil ponctuel et sécurisé, où votre enfant bouge et s’amuse.',
    intro: "Besoin de faire garder votre enfant quelques heures ? Notre garderie l’accueille dans un cadre sportif et bienveillant, encadré par notre équipe. Plus qu’une simple garde : un moment d’activité et de jeu.",
    benefices: ['Accueil ponctuel et flexible', 'Encadrement diplômé et bienveillant', 'Activités motrices et jeux adaptés', 'Cadre sécurisé au bord de la Loire'],
    creneaux: 'Selon les horaires du club — nous consulter.',
    image: '/assets/beauregard/community.webp',
    motCle: 'garderie Rochecorbon',
  },
  {
    slug: 'stages-vacances',
    titre: 'Stages vacances',
    age: '3 – 14 ans',
    accroche: 'Une semaine de sport, de jeux et de bonne humeur pendant les vacances.',
    intro: "Pendant les vacances scolaires et les mercredis, le Kid Sport Club propose des stages sportifs multi-activités. Vos enfants se dépensent, découvrent de nouveaux sports et se font des copains, encadrés par nos coachs.",
    benefices: ['Stages pendant toutes les vacances scolaires', 'Stages les mercredis (8h00 – 17h30)', 'Multi-activités sportives variées', 'Groupes par âge, encadrement diplômé'],
    creneaux: 'Vacances scolaires + mercredis 8h00 – 17h30.',
    image: '/assets/beauregard/cardio.webp',
    motCle: 'stage sportif enfant vacances Tours',
  },
  {
    slug: 'anniversaire',
    titre: 'Anniversaire',
    age: '3 – 14 ans',
    accroche: 'Fêtez l’anniversaire de votre enfant en plein sport, on s’occupe de tout.',
    intro: "Offrez à votre enfant un anniversaire inoubliable ! Jeux sportifs, parcours et activités encadrées dans notre espace dédié, suivis du goûter. Une formule clé en main, vous n’avez plus qu’à profiter.",
    benefices: ['Formule clé en main', 'Jeux et parcours sportifs encadrés', 'Espace privatisé + goûter', 'Souvenirs garantis pour les enfants'],
    creneaux: 'Sur réservation — nous contacter.',
    image: '/assets/beauregard/nature.webp',
    motCle: 'anniversaire enfant Tours',
  },
  {
    slug: 'cours-10-36-mois',
    titre: 'Cours 10 – 36 mois',
    age: '10 mois – 3 ans',
    accroche: 'Éveil moteur et baby gym pour les tout-petits, accompagnés d’un parent.',
    intro: "Dès 10 mois, la baby gym éveille bébé au mouvement : parcours adaptés, manipulation, jeux sensoriels. Une séance à partager avec un parent, pour développer la motricité en douceur et en confiance.",
    benefices: ['Éveil moteur et sensoriel', 'Séances parent-enfant', 'Matériel adapté aux tout-petits', 'En douceur, au rythme de l’enfant'],
    creneaux: 'Plusieurs créneaux par semaine — nous consulter.',
    image: '/assets/beauregard/stretch.webp',
    motCle: 'baby gym Tours',
  },
  {
    slug: 'cours-3-5-ans',
    titre: 'Cours 3 – 5 ans',
    age: '3 – 5 ans',
    accroche: 'L’éveil sportif : parcours, jeux et premières activités pour se dépenser.',
    intro: "De 3 à 5 ans, place à l’éveil sportif : parcours de motricité, jeux collectifs et activités variées. Les enfants développent coordination, équilibre et confiance en eux, tout en s’amusant.",
    benefices: ['Parcours et jeux de motricité', 'Coordination et équilibre', 'Premiers jeux collectifs', 'Confiance et autonomie'],
    creneaux: 'Plusieurs créneaux par semaine — nous consulter.',
    image: '/assets/beauregard/fonctionnel.webp',
    motCle: 'éveil sportif 3-5 ans',
  },
  {
    slug: 'cours-6-10-ans',
    titre: 'Cours 6 – 10 ans',
    age: '6 – 10 ans',
    accroche: 'Le multisports : découvrir de nombreux sports et l’esprit d’équipe.',
    intro: "De 6 à 10 ans, les enfants s’initient à de multiples sports : ils gagnent en habileté, en autonomie et en esprit d’équipe. Une approche ludique qui donne le goût de l’effort et du collectif.",
    benefices: ['Initiation à de multiples sports', 'Esprit d’équipe et collectif', 'Habileté et condition physique', 'Encadrement diplômé'],
    creneaux: 'Plusieurs créneaux par semaine — nous consulter.',
    image: '/assets/beauregard/cross.webp',
    motCle: 'multisports enfant Tours',
  },
  {
    slug: 'cours-11-14-ans',
    titre: 'Cours 11 – 14 ans',
    age: '11 – 14 ans',
    accroche: 'Le sport ado : cross training, cardio, boxe… pour se dépasser.',
    intro: "De 11 à 14 ans, les ados se dépensent et se dépassent : cross training, cardio, renforcement, boxe. Un cadre motivant pour garder la forme, canaliser son énergie et progresser, dans la bonne humeur.",
    benefices: ['Cross training, cardio, boxe', 'Préparation physique', 'Dépassement de soi', 'Ambiance motivante et encadrée'],
    creneaux: 'Plusieurs créneaux par semaine — nous consulter.',
    image: '/assets/beauregard/boxe.webp',
    motCle: 'sport ado Tours',
  },
]

export const prestationBySlug = (slug: string) => PRESTATIONS.find((p) => p.slug === slug)
