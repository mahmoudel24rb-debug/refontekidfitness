// Les 7 prestations Kid Sport Club (brief Victor Lucien-Brun).
// Contenu rédigé FR orienté parents. Prix/photos = à fournir par le client.

// Une activité pratiquée dans une tranche d'âge (4 fiches « cours » only).
// Chaque activité a désormais SA page : /nos-prestations/[slug]/[discipline].
// `slug` est stocké explicitement et vaut exactement slugifie(nom) : c'est
// aussi l'ancre historique du bloc sur la fiche parent, à ne pas casser.
// `accroche` = le résumé court affiché en sous-titre du hero et sur les cartes
// (c'est l'ancien champ `description`).
// Contenus rédigés en interne : À FAIRE VALIDER par le club avant mise en
// ligne (certaines activités peuvent ne plus être proposées).
export type Discipline = {
  nom: string
  /** = slugifie(nom). Segment d'URL et ancre sur la fiche parent. */
  slug: string
  /** Résumé court (hero de la page, carte de la fiche, chips du hub). */
  accroche: string
  /** Corps de la page : 2 paragraphes. */
  intro: string[]
  /** Liste à puces cochées de la page (3 à 5 lignes). */
  benefices: string[]
  /** Paragraphe « Pour qui ? ». */
  pourQui: string
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
        slug: 'gym-maman-bebe',
        accroche:
          'Un temps de sport partagé entre le parent et son bébé. Les exercices permettent de reprendre une activité physique en douceur tout en gardant son enfant tout près de soi, dans une ambiance complice.',
        intro: [
          'La séance se vit à deux : le parent retrouve une activité physique et le bébé reste tout près, à portée de regard. Le travail se concentre sur les zones les plus sollicitées par la grossesse et les premiers mois, périnée, sangle abdominale, dos et posture. Rien de brusque : tout est progressif et adapté au corps de chacune.',
          'Le bébé n’est pas spectateur. Porté, posé sur un tapis ou intégré au mouvement, il découvre des sensations, des rythmes et des visages. Les exercices deviennent des jeux, les temps de récupération des moments de câlin : c’est ce va-et-vient entre effort et complicité qui fait la particularité du cours.',
        ],
        benefices: [
          'Une reprise d’activité en douceur après l’arrivée de bébé',
          'Renforcement du périnée, des abdominaux et du dos',
          'Éveil sensoriel du tout-petit pendant la séance',
          'Un moment privilégié à deux, hors du quotidien',
          'Des variantes proposées pour chaque exercice',
        ],
        pourQui:
          'Ce cours s’adresse aux parents d’un enfant de 10 mois à 3 ans qui souhaitent bouger sans avoir à le faire garder. Aucun niveau sportif n’est demandé : chacun avance à son rythme, et l’encadrant propose une version plus douce ou plus soutenue de chaque exercice.',
      },
      {
        nom: 'Baby éveil',
        slug: 'baby-eveil',
        accroche:
          'Une séance d’éveil sensoriel rythmée par la musique et les comptines. Le tout-petit écoute, manipule et imite : autant d’occasions de découvrir des sons, des mots et les tout premiers échanges.',
        intro: [
          'L’éveil passe d’abord par les sens. La séance alterne comptines, écoute d’instruments, manipulation d’objets sonores et jeux de textures, pour que le tout-petit explore le son, le geste et la matière à sa façon.',
          'Chaque atelier laisse le temps de l’observation avant celui de l’imitation. L’enfant regarde, écoute, essaie, recommence, et un adulte reste toujours à côté pour accompagner la découverte. Les rituels de début et de fin de séance donnent des repères rassurants d’une semaine à l’autre.',
        ],
        benefices: [
          'Découverte des sons, des rythmes et des premiers mots',
          'Stimulation sensorielle par le toucher, l’écoute et le regard',
          'Motricité fine sollicitée par la manipulation',
          'Premiers échanges avec d’autres enfants du même âge',
          'Un cadre calme, ritualisé et sécurisant',
        ],
        pourQui:
          'Baby éveil convient aux enfants de 10 mois à 3 ans, y compris les plus réservés : rien n’est imposé, l’enfant participe quand il se sent prêt. C’est souvent une bonne première expérience de groupe avant l’entrée à l’école.',
      },
      {
        nom: 'Baby Gym & Dance',
        slug: 'baby-gym-et-dance',
        accroche:
          'Le mouvement et le rythme réunis dans une même séance. Parcours de motricité, jeux dansés et petit matériel adapté développent l’équilibre et la coordination dès le plus jeune âge.',
        intro: [
          'Le mouvement et la musique avancent ensemble. Parcours de motricité, tunnels, modules en mousse et jeux dansés se succèdent pour donner envie au tout-petit de marcher, de grimper, de se baisser et de se relever.',
          'La musique sert de fil conducteur : elle donne le tempo, annonce les changements d’atelier et transforme l’exercice en jeu. Les parents accompagnent leur enfant sur les parcours, ce qui rassure les plus hésitants et rend la séance plus douce.',
        ],
        benefices: [
          'Équilibre et coordination travaillés en jouant',
          'Découverte du rythme et de l’expression corporelle',
          'Parcours et matériel pensés pour les tout-petits',
          'Le parent accompagne son enfant sur les ateliers',
        ],
        pourQui:
          'Pour les enfants de 10 mois à 3 ans, qu’ils marchent depuis peu ou déjà bien : chaque parcours propose plusieurs niveaux de difficulté. Les enfants qui bougent beaucoup y trouvent un cadre pour se dépenser, les plus prudents un espace où oser.',
      },
      {
        nom: 'Accueil Assistantes Maternelles',
        slug: 'accueil-assistantes-maternelles',
        accroche:
          'Un créneau réservé aux assistantes maternelles et à leurs groupes d’enfants. La salle est aménagée pour l’éveil moteur des tout-petits, dans un espace calme et sécurisé.',
        intro: [
          'Le club ouvre sa salle aux assistantes maternelles qui souhaitent offrir aux enfants qu’elles gardent un vrai espace de motricité. Tapis, modules et parcours sont installés à l’avance et dimensionnés pour des tout-petits.',
          'Le groupe évolue librement d’un atelier à l’autre, accompagné par les professionnelles qui restent avec leurs enfants. C’est aussi une sortie qui change du domicile : un autre espace, d’autres enfants, d’autres sensations.',
        ],
        benefices: [
          'Une salle aménagée pour l’éveil moteur des tout-petits',
          'Parcours d’équilibre, de coordination et de grimpe',
          'Un temps collectif en dehors du lieu de garde',
          'Espace clos et sécurisé, matériel adapté',
        ],
        pourQui:
          'Ce créneau est destiné aux assistantes maternelles accompagnées de leur groupe d’enfants de 10 mois à 3 ans. Les professionnelles accompagnent leurs enfants sur les ateliers pendant toute la séance ; le club met à disposition l’espace et le matériel. Contactez-nous pour connaître les disponibilités.',
      },
      {
        nom: 'Baby Rugby',
        slug: 'baby-rugby',
        accroche:
          'Une première approche du ballon ovale, sans contact et entièrement sous forme de jeux. L’enfant court, attrape, porte et apprend à partager l’espace avec les autres.',
        intro: [
          'Une première rencontre avec le ballon ovale, entièrement sous forme de jeux et sans le moindre contact. L’enfant apprend à le porter, à le poser, à courir avec, puis à le donner à un camarade.',
          'Les consignes restent très simples : aller d’un point à un autre, franchir un obstacle, déposer le ballon dans la zone. Derrière ces petits défis se cachent la course, l’équilibre et la coordination des bras et des jambes.',
        ],
        benefices: [
          'Manipulation du ballon : porter, poser, donner',
          'Course, équilibre et changements de direction',
          'Premiers repères dans l’espace et avec les autres',
          'Aucune opposition, aucun contact',
        ],
        pourQui:
          'Pour les tout-petits de 10 mois à 3 ans qui se déplacent déjà seuls et aiment attraper tout ce qui passe. Aucune connaissance du rugby n’est nécessaire, ni pour l’enfant ni pour le parent : c’est avant tout un jeu de motricité avec un ballon.',
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
        slug: 'kid-gym-et-dance',
        accroche:
          'La danse et la gymnastique se répondent dans des enchaînements simples que l’enfant explore librement. Il gagne en coordination, en équilibre et en souplesse tout en s’exprimant en musique.',
        intro: [
          'À cet âge, l’enfant explore seul, sans la main du parent. Les séances mêlent gestes de gymnastique simples, déplacements dansés et petites chorégraphies apprises avec le groupe, sur des musiques qui donnent le tempo.',
          'Chaque cours laisse une place à l’invention : trouver sa façon de traverser la salle, proposer un mouvement que les autres reprennent. Cette liberté encadrée fait beaucoup pour la confiance et pour l’envie de revenir la semaine suivante.',
        ],
        benefices: [
          'Coordination, équilibre et souplesse',
          'Mémorisation d’enchaînements courts',
          'Expression corporelle et sens du rythme',
          'Confiance : oser bouger devant les autres',
        ],
        pourQui:
          'Pour les 3-5 ans attirés par la musique et le mouvement, qu’ils soient déjà à l’aise ou plutôt timides. Aucun prérequis : les enchaînements se construisent pas à pas au fil de l’année.',
      },
      {
        nom: 'Kid Training & Boxing',
        slug: 'kid-training-et-boxing',
        accroche:
          'Une initiation ludique aux premiers gestes techniques, toujours sans contact. Les ateliers alternent déplacements, précision et petits circuits, de quoi canaliser l’énergie du groupe.',
        intro: [
          'Une découverte des premiers gestes techniques, présentée comme un jeu et toujours sans contact. Frapper dans un bouclier, se déplacer sur un signal, enchaîner deux mouvements : les ateliers restent courts et lisibles pour des enfants de 3 à 5 ans.',
          'Les petits circuits alternent effort et retour au calme. L’enfant apprend à écouter une consigne, à attendre son tour et à s’arrêter quand on le lui demande, ce qui compte ici autant que le geste lui-même.',
        ],
        benefices: [
          'Premiers gestes techniques abordés en douceur',
          'Coordination et motricité fine',
          'Écoute des consignes et respect du tour de chacun',
          'Une façon de canaliser le trop-plein d’énergie',
          'Aucun contact entre les enfants',
        ],
        pourQui:
          'Pour les 3-5 ans qui ont besoin de bouger et qui aiment les défis courts. Le cours ne prépare pas à la compétition : il s’agit d’un travail de motricité présenté avec le vocabulaire de la boxe.',
      },
      {
        nom: 'Sports de Ballon',
        slug: 'sports-de-ballon',
        accroche:
          'Football, rugby, handball, volley : l’enfant découvre plusieurs ballons et leurs règles simplifiées, et apprend surtout à jouer avec les autres.',
        intro: [
          'Un ballon rond, un ballon ovale, un ballon léger : à 3 ans, tout est nouveau. Les séances font découvrir ces objets à travers des jeux très simples, où l’on court, on attrape, on tape et on relance sans se poser de question.',
          'Les règles se limitent à l’essentiel : rester dans l’espace de jeu, viser la bonne cible, laisser passer le camarade. Le football, le handball, le rugby et le volley servent ici de prétexte au mouvement bien plus qu’à la performance.',
        ],
        benefices: [
          'Découverte de plusieurs ballons et de leurs usages',
          'Course, lancer et réception dans des jeux courts',
          'Premières notions d’espace et de cible',
          'Apprendre à jouer à côté des autres, puis avec eux',
        ],
        pourQui:
          'Pour les 3-5 ans, qu’ils aient déjà un ballon à la maison ou non. Ce cours est souvent un bon révélateur : il permet de voir vers quel sport l’enfant se tourne naturellement, sans avoir à choisir tout de suite.',
      },
      {
        nom: 'Multisports',
        slug: 'multisports',
        accroche:
          'Une séance différente à chaque fois : ballons, raquettes, parcours, jeux d’opposition. De quoi essayer largement avant de savoir ce qui plaît le plus.',
        intro: [
          'Une séance différente à chaque rendez-vous : ballons, raquettes, parcours de motricité, jeux d’opposition sans contact. Le programme change régulièrement pour que l’enfant essaie beaucoup avant de savoir ce qui lui plaît.',
          'Cette variété a un intérêt concret : chaque famille de sport sollicite le corps autrement, la main et le regard pour les raquettes, l’équilibre pour les parcours, la course pour les jeux collectifs. Mis bout à bout, ces ateliers construisent une motricité complète.',
        ],
        benefices: [
          'Un large éventail d’activités sur l’année',
          'Motricité globale et fine sollicitées en alternance',
          'De la nouveauté à chaque séance',
          'Aucun choix de discipline imposé à cet âge',
        ],
        pourQui:
          'Pour les 3-5 ans, en particulier ceux qui hésitent encore ou qui se lassent vite d’une seule activité. C’est aussi le cours le plus simple pour une première année au club.',
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
        slug: 'fun-fit-zumba',
        accroche:
          'Du fitness dansé sur des musiques entraînantes, sans aucune notion de performance. Les chorégraphies s’apprennent pas à pas, dans une ambiance joyeuse.',
        intro: [
          'Du fitness dansé sur des musiques entraînantes, où l’on apprend une chorégraphie pas à pas plutôt que de compter des répétitions. Les enchaînements sont découpés, répétés, puis assemblés jusqu’à tenir sur un morceau entier.',
          'Sans vraiment s’en rendre compte, l’enfant travaille son cardio, son gainage et sa coordination. L’ambiance reste collective et joyeuse : personne n’est mis en avant, personne n’est laissé de côté.',
        ],
        benefices: [
          'Cardio et renforcement sous forme de danse',
          'Coordination et sens du rythme',
          'Mémorisation d’une chorégraphie complète',
          'Aucune notion de performance ni de classement',
        ],
        pourQui:
          'Pour les 6-10 ans qui aiment la musique et préfèrent bouger en groupe plutôt qu’en compétition. Aucune expérience de la danse n’est requise pour rejoindre le cours.',
      },
      {
        nom: 'Pompom Girl',
        slug: 'pompom-girl',
        accroche:
          'Jeux de coordination, portés simples et mini-chorégraphies montées ensemble. Le groupe apprend à se synchroniser puis à présenter son travail.',
        intro: [
          'Les bases d’abord : tenir un pompon, poser un bras net, marquer un temps tous ensemble. Les jeux de coordination occupent une bonne partie de la séance avant que les mouvements ne commencent à s’enchaîner.',
          'Le groupe monte ensuite de courtes chorégraphies, construites collectivement et répétées jusqu’à ce que tout le monde soit synchronisé. Présenter son travail aux autres, même en petit comité, fait partie de l’apprentissage.',
        ],
        benefices: [
          'Bases techniques : postures, bras, appuis',
          'Coordination et synchronisation avec le groupe',
          'Mini-chorégraphies montées en équipe',
          'Confiance : oser se présenter devant les autres',
        ],
        pourQui:
          'Pour les 6-10 ans attirés par la danse rythmée et le travail de groupe. Le cadre est volontairement bienveillant : on avance au rythme du groupe, sans sélection ni niveau requis.',
      },
      {
        nom: 'Cross Training & Boxing',
        slug: 'cross-training-et-boxing',
        accroche:
          'Des circuits variés pour construire les bases physiques : gainage, déplacements, cardio, complétés par des techniques de boxe sans contact.',
        intro: [
          'Des circuits variés qui enchaînent parcours, jeux de rapidité et ateliers de renforcement au poids du corps. Chaque station dure peu de temps, ce qui maintient l’attention et l’intensité sans épuiser les enfants.',
          'La partie boxe se pratique sans contact, sur boucliers et dans le vide : garde, déplacements, précision du geste. Les petits défis lancés en fin de séance donnent un repère de progression d’une semaine à l’autre.',
        ],
        benefices: [
          'Force, endurance et souplesse travaillées ensemble',
          'Vitesse et réactivité par les jeux de parcours',
          'Technique de boxe sans aucun contact',
          'Des défis courts pour mesurer ses progrès',
          'Confiance en soi et maîtrise de son énergie',
        ],
        pourQui:
          'Pour les 6-10 ans qui aiment se dépenser franchement et relever des défis. Les intensités sont calibrées pour l’âge : le travail se fait au poids du corps, jamais dans une logique d’entraînement adulte.',
      },
      {
        nom: 'Gym acrobatique',
        slug: 'gym-acrobatique',
        accroche:
          'Roulades, équilibres, premières figures : les acrobaties s’apprennent progressivement, avec parade et matériel adapté au niveau de chacun.',
        intro: [
          'Roulades, équilibres, premières figures : l’acrobatie s’apprend par étapes, avec le matériel qui convient à chaque niveau. Rien n’est tenté avant que les appuis et le gainage ne soient en place.',
          'L’encadrant reste à côté pour parer chaque passage, ce qui permet à l’enfant d’oser sans se mettre en danger. Les progrès se voient vite, et une figure réussie donne souvent envie de passer à la suivante.',
        ],
        benefices: [
          'Souplesse, gainage et force du haut du corps',
          'Équilibre et conscience du corps dans l’espace',
          'Figures abordées progressivement, avec parade',
          'Le plaisir de réussir un mouvement longtemps travaillé',
        ],
        pourQui:
          'Pour les 6-10 ans qui grimpent partout et aiment se renverser, comme pour ceux qui manquent d’assurance : la progression par étapes convient aux deux profils. Aucune expérience de la gymnastique n’est demandée.',
      },
      {
        nom: 'Sports de Ballon',
        slug: 'sports-de-ballon',
        accroche:
          'Football, handball, rugby et volley en alternance. Le jeu se structure : placement, passes, respect des règles et des coéquipiers.',
        intro: [
          'Le jeu prend forme. Après les années de découverte, les séances s’organisent autour des gestes qui changent tout : la passe, le contrôle, l’appel de balle, le placement sur le terrain.',
          'Football, handball, rugby et volley reviennent en alternance sur l’année, chacun avec ses règles simplifiées mais réellement appliquées. L’arbitrage de l’encadrant sert de repère : on apprend autant en respectant une règle qu’en marquant un point.',
        ],
        benefices: [
          'Passes, contrôles et déplacements travaillés spécifiquement',
          'Placement sur le terrain et lecture du jeu',
          'Les règles de quatre sports collectifs',
          'Esprit d’équipe et respect des coéquipiers',
          'Réflexes et coordination sollicités en situation',
        ],
        pourQui:
          'Pour les 6-10 ans qui ont envie de jouer en équipe sans s’engager dans un club spécialisé. C’est aussi une bonne façon de tester plusieurs sports collectifs avant de choisir, ou de continuer à en pratiquer plusieurs.',
      },
      {
        nom: 'Fit’ Family',
        slug: 'fit-family',
        accroche:
          'Une séance à vivre en duo parent-enfant. Défis sportifs, relais et ateliers en équipe : on s’encourage et on progresse ensemble.',
        intro: [
          'Le principe tient en une phrase : le parent et l’enfant forment une équipe. Relais, ateliers à deux, défis chronométrés, tout est conçu pour que chacun ait un rôle et que la réussite soit commune.',
          'Les exercices mêlent renforcement, cardio et agilité, avec des variantes pour que l’adulte et l’enfant travaillent à leur niveau sur un même atelier. Ce n’est ni un cours pour enfant où le parent regarde, ni un cours d’adulte où l’enfant suit comme il peut.',
        ],
        benefices: [
          'Renforcement, cardio et agilité pour les deux',
          'Un temps sportif partagé en famille',
          'Travail d’équipe et entraide',
          'Des ateliers modulables selon le niveau de chacun',
        ],
        pourQui:
          'Pour un enfant de 6 à 10 ans accompagné d’un parent, quel que soit le niveau sportif de l’adulte. C’est souvent le cours qui redonne envie de bouger à toute la famille.',
      },
      {
        nom: 'Sports de Combat',
        slug: 'sports-de-combat',
        accroche:
          'Initiation au judo, à la boxe et au karaté, centrée sur le respect du partenaire, la maîtrise de soi et la confiance.',
        intro: [
          'Une initiation qui emprunte au judo, à la boxe et au karaté. Chutes, gardes, déplacements et saisies sont abordés sur tapis, dans un cadre strict et avec des règles annoncées à chaque atelier.',
          'Avant la technique vient le respect : saluer, écouter, contrôler son geste, s’arrêter au signal. Cette exigence est la condition d’un cours où l’on peut s’opposer sans jamais se faire mal.',
        ],
        benefices: [
          'Découverte de plusieurs disciplines de combat',
          'Maîtrise de soi et contrôle du geste',
          'Respect du partenaire et des règles',
          'Confiance en soi et gestion des émotions',
          'Coordination, équilibre et gainage',
        ],
        pourQui:
          'Pour les 6-10 ans, aussi bien les enfants très toniques que les plus réservés : le cadre canalise les premiers et rassure les seconds. Aucun niveau n’est requis, et l’opposition reste toujours encadrée.',
      },
      {
        nom: 'Kid coaching',
        slug: 'kid-coaching',
        accroche:
          'Un accompagnement plus individualisé pour l’enfant qui a besoin d’un objectif à lui : reprise d’activité, confiance, progression à son rythme.',
        intro: [
          'Un accompagnement plus individualisé, en séance individuelle ou en tout petit groupe. Le contenu se construit à partir de l’enfant : ce qu’il aime, ce qui le bloque, ce qu’il souhaite améliorer.',
          'Le programme reste ludique, mais il vise un objectif identifié avec la famille : reprendre une activité, gagner en aisance, retrouver confiance après un arrêt. Le coach ajuste au fil des séances plutôt que de dérouler un plan figé.',
        ],
        benefices: [
          'Un programme construit autour de l’enfant',
          'Séance individuelle ou en très petit groupe',
          'Progression à son rythme, sans comparaison',
          'Un objectif clair, revu au fil des séances',
        ],
        pourQui:
          'Pour un enfant de 6 à 10 ans qui a besoin d’un cadre plus personnel : reprise après une interruption, difficulté à trouver sa place dans un groupe, ou simplement envie de travailler un point précis. Parlez-en au club pour définir ensemble le contenu des séances.',
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
        slug: 'fitness',
        accroche:
          'Des séances dynamiques et variées, calibrées pour un corps en pleine croissance : renforcement, cardio et mobilité, avec des intensités adaptées à l’âge.',
        intro: [
          'À l’adolescence, le corps change vite et pas toujours de façon confortable. Les séances associent renforcement au poids du corps, cardio et travail de mobilité, avec des intensités pensées pour un organisme en croissance.',
          'L’objectif n’est pas la performance mais l’aisance : mieux se tenir, mieux respirer, mieux récupérer. Tout le monde suit la même trame et ajuste le nombre de répétitions ou l’amplitude selon sa forme du jour.',
        ],
        benefices: [
          'Renforcement musculaire au poids du corps',
          'Cardio progressif et travail de récupération',
          'Souplesse, mobilité et posture',
          'Aucune pression de performance ni de comparaison',
          'Un encadrement attentif à la croissance',
        ],
        pourQui:
          'Pour les 11-14 ans qui veulent bouger régulièrement sans entrer dans une logique de compétition. Le cours accueille aussi bien les ados déjà sportifs que ceux qui reprennent après une longue pause.',
      },
      {
        nom: 'Cross Training & Boxing',
        slug: 'cross-training-et-boxing',
        accroche:
          'Des circuits plus structurés qu’en primaire, complétés par du travail technique de boxe sans contact. L’ado apprend à doser son effort et à suivre sa progression.',
        intro: [
          'Les circuits deviennent de vraies séances structurées : échauffement, blocs de travail minutés, retour au calme. Les mouvements sont plus techniques et l’enchaînement plus soutenu que dans les cours des plus jeunes.',
          'Le travail de boxe gagne en précision : garde, esquives, enchaînements, toujours sans contact entre les ados. La séance apprend aussi à doser son effort, à tenir la distance et à reconnaître le moment où l’on peut pousser un peu plus.',
        ],
        benefices: [
          'Des séances structurées et une progression suivie',
          'Technique de boxe précise, sans contact',
          'Force physique et endurance',
          'Gestion de l’effort et de la respiration',
          'Dépassement de soi dans un cadre encadré',
        ],
        pourQui:
          'Pour les 11-14 ans qui cherchent une séance exigeante et cadrée. Les ados qui débutent y trouvent leur place : les blocs de travail s’individualisent, chacun règle son intensité.',
      },
      {
        nom: 'Fit’ Family',
        slug: 'fit-family',
        accroche:
          'Le rendez-vous sportif parent-ado : défis à deux, relais et ateliers en équipe, pour bouger ensemble sans esprit de compétition.',
        intro: [
          'À l’adolescence, les moments partagés avec ses parents se raréfient. Ce cours en recrée un, autour d’un effort commun : défis à deux, relais, ateliers où l’un tient la position pendant que l’autre travaille.',
          'Les exercices sont ceux d’une vraie séance de renforcement et de cardio, avec des intensités que chacun règle de son côté. L’ado peut très bien y être plus à l’aise que son parent, et c’est souvent ce qui rend la séance amusante.',
        ],
        benefices: [
          'Un rendez-vous sportif parent-ado régulier',
          'Renforcement et cardio pour les deux générations',
          'Entraide et travail d’équipe, sans compétition',
          'Chacun règle son intensité sur un même atelier',
        ],
        pourQui:
          'Pour un ado de 11 à 14 ans accompagné d’un parent, sportif ou non. C’est aussi une bonne porte d’entrée pour un ado qui n’ose pas rejoindre un groupe tout seul.',
      },
      {
        nom: 'Gym acrobatique',
        slug: 'gym-acrobatique',
        accroche:
          'Perfectionnement des figures et travail des enchaînements complets, avec le gainage et la souplesse nécessaires pour les réaliser en sécurité.',
        intro: [
          'Le travail porte sur la qualité d’exécution et sur les enchaînements complets plutôt que sur les figures isolées. Un mouvement propre demande du gainage, de la souplesse et un placement précis : c’est ce socle qui occupe une bonne partie de la séance.',
          'Les figures se construisent ensuite pièce par pièce, avec parade et progression, jusqu’à pouvoir les relier sans temps mort. Les ados travaillent souvent à plusieurs, ce qui suppose de se faire confiance.',
        ],
        benefices: [
          'Perfectionnement des figures déjà acquises',
          'Construction d’enchaînements complets',
          'Gainage, souplesse et placement',
          'Travail à plusieurs, parade et confiance mutuelle',
        ],
        pourQui:
          'Pour les 11-14 ans, qu’ils aient déjà pratiqué la gymnastique ou qu’ils débutent : les acquis de base sont repris avec eux avant d’aller plus loin. Le cours demande de la régularité, les progrès se construisent semaine après semaine.',
      },
      {
        nom: 'Sports de Ballon',
        slug: 'sports-de-ballon',
        accroche:
          'Pratique confirmée du football, du handball, du rugby et du volley : placement, tactique, arbitrage et matchs à effectif réduit.',
        intro: [
          'À cet âge, les règles sont connues : les séances se concentrent sur le jeu lui-même. Occupation du terrain, choix de la passe, lecture de l’adversaire, prise de décision, tout se travaille en situation réelle.',
          'Les matchs à effectif réduit occupent une bonne partie du temps, et les ados prennent aussi le sifflet à tour de rôle. Arbitrer change le regard sur le jeu : on comprend mieux une décision quand on a eu à la prendre.',
        ],
        benefices: [
          'Football, handball, rugby et volley en alternance',
          'Tactique : placement, appels, choix de jeu',
          'Des matchs à effectif réduit à chaque séance',
          'Initiation à l’arbitrage, à tour de rôle',
          'Esprit d’équipe et gestion de la frustration',
        ],
        pourQui:
          'Pour les 11-14 ans qui aiment le sport collectif, qu’ils jouent déjà en club ou non. Le cours permet d’en pratiquer plusieurs dans l’année, ce qu’un club spécialisé ne propose pas.',
      },
      {
        nom: 'Pompom Girl',
        slug: 'pompom-girl',
        accroche:
          'Des chorégraphies complètes à mémoriser, avec des mouvements plus dynamiques et un vrai travail de groupe jusqu’à la présentation.',
        intro: [
          'Le niveau d’exigence monte : mouvements plus dynamiques, enchaînements plus précis, chorégraphies complètes à mémoriser. La synchronisation devient centrale, car un décalage se voit immédiatement.',
          'Les séances alternent technique, répétition et préparation physique, parce que tenir une chorégraphie entière demande de l’endurance et de la souplesse. Le groupe avance ensemble, jusqu’à la présentation du travail.',
        ],
        benefices: [
          'Chorégraphies complètes, mémorisées et enchaînées',
          'Endurance et souplesse travaillées spécifiquement',
          'Précision du geste et synchronisation du groupe',
          'Un vrai projet collectif mené jusqu’au bout',
        ],
        pourQui:
          'Pour les 11-14 ans qui aiment danser en groupe et acceptent de répéter pour obtenir un résultat propre. Celles et ceux qui débutent sont accueillis : les bases sont reprises en début de cycle.',
      },
      {
        nom: 'Zumba family',
        slug: 'zumba-family',
        accroche:
          'Une séance de danse fitness ouverte aux ados et à leurs parents : rythme soutenu, chorégraphies accessibles et beaucoup de bonne humeur.',
        intro: [
          'Une séance de danse fitness que l’ado et son parent suivent côte à côte. Les chorégraphies restent accessibles, apprises pas à pas, sur des musiques rythmées qui portent l’effort.',
          'Le cardio est bien réel, mais il passe presque inaperçu tant l’attention est prise par la musique et les enchaînements. Personne n’est observé, tout le monde se trompe, et c’est ce qui rend la séance facile à aborder.',
        ],
        benefices: [
          'Danse fitness accessible, sans niveau requis',
          'Cardio et coordination en musique',
          'Un moment partagé entre ado et parent',
          'Des chorégraphies apprises pas à pas',
        ],
        pourQui:
          'Pour les 11-14 ans et leurs parents, danseurs ou pas du tout. C’est une bonne première séance pour un ado qui hésite à venir seul, ou pour un parent qui souhaite reprendre une activité en douceur.',
      },
    ],
  },
]

export const prestationBySlug = (slug: string) => PRESTATIONS.find((p) => p.slug === slug)

/** Résout une activité par son segment d'URL au sein d'une prestation. */
export const disciplineBySlug = (prestation: Prestation, slug: string) =>
  prestation.disciplines?.find((d) => d.slug === slug)
