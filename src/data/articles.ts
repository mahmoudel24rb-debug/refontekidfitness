// Articles blog — cluster éditorial du brief (§6). Corps = PLACEHOLDER rédactionnel
// (à enrichir/valider). Slugs pensés SEO.
// Bloc de contenu d'un article : paragraphe ou intertitre h2. Le corps est
// rendu à partir de `blocs` (fallback sur `paragraphes` si absent).
export type Bloc = { t: 'h2'; texte: string } | { t: 'p'; texte: string }

export type Article = {
  slug: string
  titre: string
  excerpt: string
  date: string
  paragraphes: string[]
  blocs?: Bloc[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'a-quel-age-sport-enfant',
    titre: 'À quel âge inscrire son enfant au sport ?',
    excerpt: "De la motricité dès 10 mois à la multisport dès 6 ans : l'essentiel est d'adapter l'activité à l'âge et au rythme de l'enfant, jamais l'inverse.",
    date: '2026-06-01',
    paragraphes: [
      // Chapo = texte du récap client, recopié tel quel.
      "Le sport peut commencer très tôt : dès 10 mois, les activités de motricité stimulent le développement moteur du tout-petit sans notion de performance. Entre 3 et 5 ans, l'enfant affine sa coordination à travers le jeu. À partir de 6 ans, la multisport permet de découvrir plusieurs disciplines avant, éventuellement, de se spécialiser vers 11-14 ans. L'essentiel : adapter l'activité à l'âge et au rythme de l'enfant, jamais l'inverse.",
      "Entre 3 et 5 ans, l'enfant développe son équilibre et sa coordination à travers l'éveil sportif. De 6 à 10 ans, il découvre de multiples sports et l'esprit d'équipe. Dès 11 ans, place au sport ado pour se dépenser et se dépasser.",
      "L'essentiel : respecter le rythme de l'enfant et privilégier le plaisir. C'est toute la philosophie du Kid Sport Club.",
    ],
  },
  {
    slug: 'bienfaits-motricite-tout-petit',
    titre: 'Pourquoi la motricité est essentielle chez le jeune enfant',
    excerpt: "Ramper, sauter, grimper, lancer : le mouvement construit l'équilibre, la confiance et la base de nombreux apprentissages scolaires.",
    date: '2026-06-08',
    paragraphes: [
      // Chapo = texte du récap client, recopié tel quel.
      "La motricité globale et fine ne se développe pas toute seule : elle se construit à travers le mouvement, le jeu et la répétition. Ramper, sauter, grimper, lancer... chaque activité physique aide l'enfant à mieux connaître son corps, à gagner en équilibre et en confiance. C'est aussi la base de nombreux apprentissages scolaires (écriture, concentration, repérage dans l'espace).",
      "À travers la psychomotricité, l'enfant gagne en équilibre, en coordination et en confiance en lui. Il apprend aussi à connaître son corps et ses limites, dans un cadre sécurisé.",
      "Au Kid Sport Club, chaque séance de baby gym est pensée comme un moment d'éveil, que les parents sont invités à partager lors de certaines séances.",
    ],
  },
  {
    slug: 'idees-anniversaire-sportif-enfant',
    titre: 'Organiser l’anniversaire sportif de son enfant',
    excerpt: "Une fête qui bouge, sans logistique pour les parents : activités encadrées, gâteau et décoration, tout est pensé pour que l'enfant profite à 100%.",
    date: '2026-06-15',
    paragraphes: [
      // Chapo = texte du récap client, recopié tel quel.
      "Envie de changer des anniversaires classiques ? Une formule sportive permet aux enfants de se dépenser, de jouer ensemble et de repartir avec plein de souvenirs, sans que les parents aient à gérer la logistique. Activités encadrées, gâteau, décoration : tout est pensé pour que l'enfant profite à 100% de sa journée.",
      "Un anniversaire sportif, c'est l'assurance d'enfants ravis… et fatigués le soir ! Parcours d'obstacles, jeux d'équipe, ateliers ludiques : les possibilités sont nombreuses.",
      "L'avantage d'une formule clé en main : vous ne vous occupez de rien. Espace privatisé, animation encadrée et goûter compris : il ne reste qu'à profiter.",
      "Au Kid Sport Club de Rochecorbon, nous organisons des anniversaires sportifs adaptés à l'âge des enfants. Contactez-nous pour réserver.",
    ],
  },
  {
    slug: 'enfants-vacances-scolaires',
    titre: 'Bien préparer les vacances de son enfant',
    excerpt: "Une activité sportive encadrée, à la journée ou à la semaine : de quoi rythmer les vacances et faire le plein de rencontres.",
    date: '2026-06-22',
    paragraphes: [
      // Chapo = texte du récap client, recopié tel quel.
      "Les vacances scolaires sont l'occasion idéale pour proposer à son enfant une activité sportive encadrée et stimulante, à la journée ou à la semaine. Cela permet de rythmer les vacances, de maintenir une activité physique régulière, et de favoriser les rencontres avec d'autres enfants, tout en offrant aux parents une solution de garde active et sécurisée.",
      "Les vacances scolaires sont parfois un casse-tête pour les parents qui travaillent. Les stages sportifs sont une solution idéale : les enfants se dépensent, s'amusent et se font des copains.",
      "Encadrés par des animateurs diplômés, ils découvrent une variété d'activités tout au long de la semaine, dans un cadre sécurisé.",
      "Le Kid Sport Club propose des stages pendant toutes les vacances scolaires, ainsi que les Mercredis Sportifs pendant l'année scolaire. Pensez à réserver à l'avance, les places sont limitées.",
    ],
  },
]

// Intertitres h2 (sobres, descriptifs — à valider par le client), insérés
// AVANT le paragraphe d'index indiqué. Aucun paragraphe n'est modifié : les
// `blocs` ci-dessous sont construits mécaniquement à partir de `paragraphes`.
const INTERTITRES: Record<string, { avant: number; texte: string }[]> = {
  'a-quel-age-sport-enfant': [
    { avant: 1, texte: 'Une activité pour chaque âge' },
    { avant: 2, texte: 'Respecter le rythme de l’enfant' },
  ],
  'bienfaits-motricite-tout-petit': [
    { avant: 1, texte: 'Ce que la motricité développe' },
    { avant: 2, texte: 'La motricité au Kid Sport Club' },
  ],
  'idees-anniversaire-sportif-enfant': [
    { avant: 1, texte: 'Des activités qui plaisent aux enfants' },
    { avant: 2, texte: 'Une formule clé en main' },
    { avant: 3, texte: 'L’anniversaire sportif au Kid Sport Club' },
  ],
  'enfants-vacances-scolaires': [
    { avant: 1, texte: 'Une solution pour les parents' },
    { avant: 2, texte: 'Un encadrement diplômé' },
    { avant: 3, texte: 'Stages et Mercredis Sportifs au Kid Sport Club' },
  ],
}

// Construction des `blocs` : chaque paragraphe devient un bloc p (inchangé),
// et les intertitres h2 sont insérés avant leur index cible.
for (const a of ARTICLES) {
  const inter = INTERTITRES[a.slug] ?? []
  const blocs: Bloc[] = []
  a.paragraphes.forEach((texte, i) => {
    for (const it of inter) if (it.avant === i) blocs.push({ t: 'h2', texte: it.texte })
    blocs.push({ t: 'p', texte })
  })
  a.blocs = blocs
}

// Visuel de chaque article (webp du dossier /assets/ksc) — partagé entre
// BlogKSC (featured + grille), Article (hero + JSON-LD) et ActusHome.
export const ARTICLE_IMG: Record<string, string> = {
  'a-quel-age-sport-enfant': '/assets/ksc/cours-10-36-mois.webp',
  'bienfaits-motricite-tout-petit': '/assets/ksc/cours-3-5-ans.webp',
  'idees-anniversaire-sportif-enfant': '/assets/ksc/anniversaire.webp',
  'enfants-vacances-scolaires': '/assets/ksc/stages-vacances.webp',
}

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug)

// Format français « 22 juin 2026 » (sans dépendre de l'ICU du runtime).
const MOIS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
export const formatDateFr = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MOIS_FR[m - 1]} ${y}`
}
