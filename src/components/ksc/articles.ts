// Articles blog — cluster éditorial du brief (§6). Corps = PLACEHOLDER rédactionnel
// (à enrichir/valider). Slugs pensés SEO.
export type Article = {
  slug: string
  titre: string
  excerpt: string
  date: string
  paragraphes: string[]
}

export const ARTICLES: Article[] = [
  {
    slug: 'a-quel-age-sport-enfant',
    titre: 'À quel âge faire faire du sport à son enfant ?',
    excerpt: "Dès les premiers mois, le mouvement participe au développement de l'enfant. On fait le point, âge par âge.",
    date: '2026-06-01',
    paragraphes: [
      "Beaucoup de parents se demandent à partir de quand initier leur enfant au sport. La bonne nouvelle : il n'est jamais trop tôt pour bouger ! Dès 10 mois, la baby gym, sous forme de jeux et de parcours adaptés, éveille la motricité du tout-petit.",
      "Entre 3 et 5 ans, l'enfant développe son équilibre et sa coordination à travers l'éveil sportif. De 6 à 10 ans, il découvre de multiples sports et l'esprit d'équipe. Dès 11 ans, place au sport ado pour se dépenser et se dépasser.",
      "L'essentiel : respecter le rythme de l'enfant et privilégier le plaisir. C'est toute la philosophie du Kid Sport Club.",
    ],
  },
  {
    slug: 'bienfaits-motricite-tout-petit',
    titre: 'Les bienfaits de la motricité chez le tout-petit',
    excerpt: "Équilibre, confiance, autonomie : pourquoi l'activité motrice est essentielle au développement des plus jeunes.",
    date: '2026-06-08',
    paragraphes: [
      "La motricité ne se résume pas à « faire du sport ». Chez le tout-petit, ramper, grimper, sauter ou manipuler des objets construit le cerveau autant que le corps.",
      "À travers la psychomotricité, l'enfant gagne en équilibre, en coordination et en confiance en lui. Il apprend aussi à connaître son corps et ses limites, dans un cadre sécurisé.",
      "Au Kid Sport Club, chaque séance de baby gym est pensée comme un moment d'éveil partagé entre l'enfant et son parent.",
    ],
  },
  {
    slug: 'idees-anniversaire-sportif-enfant',
    titre: 'Idées d’anniversaire sportif pour enfant',
    excerpt: "Envie d'un anniversaire qui bouge ? Nos idées pour une fête sportive réussie, sans stress pour les parents.",
    date: '2026-06-15',
    paragraphes: [
      "Un anniversaire sportif, c'est l'assurance d'enfants ravis… et fatigués le soir ! Parcours d'obstacles, jeux d'équipe, ateliers ludiques : les possibilités sont nombreuses.",
      "L'avantage d'une formule clé en main : vous ne vous occupez de rien. Espace privatisé, animation encadrée et goûter compris — il ne reste qu'à profiter.",
      "Au Kid Sport Club de Rochecorbon, nous organisons des anniversaires sportifs adaptés à l'âge des enfants. Contactez-nous pour réserver.",
    ],
  },
  {
    slug: 'enfants-vacances-scolaires',
    titre: 'Que faire des enfants pendant les vacances scolaires ?',
    excerpt: "Stages sportifs, journées actives, encadrement : des solutions pour des vacances qui bougent.",
    date: '2026-06-22',
    paragraphes: [
      "Les vacances scolaires sont parfois un casse-tête pour les parents qui travaillent. Les stages sportifs sont une solution idéale : les enfants se dépensent, s'amusent et se font des copains.",
      "Encadrés par des animateurs diplômés, ils découvrent une variété d'activités tout au long de la semaine, dans un cadre sécurisé.",
      "Le Kid Sport Club propose des stages pendant toutes les vacances scolaires, ainsi que les mercredis (8h00 – 17h30). Pensez à réserver à l'avance, les places sont limitées.",
    ],
  },
]

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug)
