// Équipe du Kid Sport Club — textes du récap client, recopiés tels quels.
// Monogrammes (initiales) en attendant les photos fournies par le client.

export type Coach = { nom: string; bio: string; initiales: string }

export const EQUIPE: Coach[] = [
  {
    nom: 'Magatte Lam',
    initiales: 'ML',
    bio: 'Coach à Kid Sport Club, Magatte apporte une énergie solaire à chaque séance. Toujours professionnelle, elle sait créer un cadre à la fois rassurant et stimulant pour que les enfants prennent plaisir à bouger.',
  },
  {
    nom: 'Emma Villecroze',
    initiales: 'EV',
    bio: 'Diplômée depuis 2 ans, Emma accompagne les enfants avec douceur et professionnalisme. Attentive à chacun, elle veille à ce que chaque séance soit un moment de progrès et de plaisir partagé.',
  },
  {
    nom: 'Matéo Nozal',
    initiales: 'MN',
    bio: 'Également coach à Fitness Beauregard (Hyrox / cours collectifs), Matéo intervient aussi auprès des enfants de Kid Sport Club, avec la même exigence bienveillante qui le caractérise.',
  },
]
