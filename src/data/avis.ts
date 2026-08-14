// Avis de parents (home, séance d'essai, landings) : 6 avis Google 5 étoiles
// RÉELS de la fiche du club, avec le nom et la photo publics de leur auteur.
//
// Les TROIS PREMIERS textes proviennent du récap client (versions relues par le
// club des avis de Céline, Cécile Poirier et Marion Dreux) : ils sont recopiés
// au caractère près et NE DOIVENT PAS ÊTRE MODIFIÉS : les extraits mis en scène
// par PullQuote (src/data/landings.ts, SeanceEssai) sont des sous-chaînes
// exactes de ces textes et la citation se masque au moindre écart.
//
// Les TROIS SUIVANTS sont les textes Google complets d'Aymeric Amelot, Jérémy
// Folio et Émilie Miloche : verbatim, ponctuation d'origine conservée (seuls
// les sauts de ligne sont rendus par une espace, comme pour les trois premiers,
// et les apostrophes droites sont passées en apostrophes typographiques).
//
// Le mot 'garderie' est banni des textes rédigés par le club, mais conservé
// dans les avis car ce sont des citations de parents (consigne du récap).
//
// Les photos sont les avatars publics des comptes Google, téléchargés dans
// public/assets/ksc/avis/. Un avis sans photo retombe sur l'avatar illustré.
export type AvisFichier = {
  texte: string
  /** Nom affiché, normalisé (prénom en premier, casse propre). */
  auteur: string
  /** Chemin public de la photo de profil, sinon avatar illustré par index. */
  photo?: string
}

export const AVIS: AvisFichier[] = [
  {
    texte:
      'Ma fille y est inscrite depuis début novembre pour la garderie du mercredi et elle ADORE ! Dans sa journée, elle a le droit de faire les cours du mercredi et/ou les activités proposées avec les animateurs. La journée peut être très sportive (pompom girls + zumba + cross training boxing + gym) ce qu’elle adore ou un peu plus tranquille avec aussi des activités et temps calme si elle est fatiguée. Les moniteurs sont à l’écoute et très gentils. Je recommande à 300.',
    auteur: 'Céline',
    photo: '/assets/ksc/avis/celine.webp',
  },
  {
    texte:
      'C’est la deuxième fois que j’ai inscrit mon fils pour les vacances, il est toujours content d’y aller, il ne veut pas repartir le soir. Je suis très satisfaite des services proposés ainsi que les animateurs qui ont su avoir les bons réflexes lors de la première inscription, lorsque mon fils s’est blessé. Les encadrants sont très agréables le matin comme le soir malgré les difficultés qu’ils peuvent rencontrer lors de leur journée avec mon enfant, ils restent tous très professionnels. Continuez ainsi. Cordialement.',
    auteur: 'Cécile Poirier',
    photo: '/assets/ksc/avis/cecile-poirier.webp',
  },
  {
    texte:
      'J’ai inscrit mon fils pour les activités de 3-5 ans, les cours sont adaptés et les encadrants d’une bienveillance qu’on apprécie en tant que parent. Le fait de pouvoir choisir ses créneaux en fonction des activités et de notre emploi du temps est un véritable plus. Si vous cherchez un endroit où votre enfant peut s’amuser, apprendre le sport collectif et s’épanouir, je vous recommande Kid Sport Club à Rochecorbon.',
    auteur: 'Marion Dreux',
    photo: '/assets/ksc/avis/marion-dreux.webp',
  },
  {
    texte:
      'mes 2 trolls de 3 et 5 ans viennent d’y passer 1 semaine, c’était fabuleux!! Les moniteurs sont jeunes, trés sympas, patients, les enfants les adorent, sport ou dessin à gogo et garanties que les trolls sont au lit à 19h30 heureux et usés..:)',
    auteur: 'Aymeric Amelot',
    photo: '/assets/ksc/avis/aymeric-amelot.webp',
  },
  {
    texte:
      'Axel est inscrit pour les cours de garderie le mercredi. Il adore tout simplement. Ils font pleins d’activités différentes, ils s’adaptent à la météo. Mon fils est toujours heureux d’y aller. L’organisation est maintenant rodée pour le mercredi et c’est super. Merci à vous !',
    auteur: 'Jérémy Folio',
    photo: '/assets/ksc/avis/jeremy-folio.webp',
  },
  {
    texte:
      'Kid Fitness offre un choix varié d’activités pour les enfants (pom-pom girl, crossfit boxing, zumba, sports de combat, baby gym....), ce qui permet de travailler entre autres : la coordination, la souplesse, la rigueur, l’esprit d’équipe. Des cours parents/enfants sont proposés (fit family) afin de renforcer les liens et de se lancer des défis. La salle est ouverte du lundi au samedi, ce qui permet de s’adapter au planning de chacun. Les coachs sont bienveillants et s’adaptent à chaque public.',
    auteur: 'Émilie Miloche',
    photo: '/assets/ksc/avis/emilie-miloche.webp',
  },
]
