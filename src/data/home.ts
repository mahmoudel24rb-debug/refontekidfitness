// src/data/home.ts — contenu de la page d'accueil (phase 3a, refonte fondations).
// TEXTES EXTRAITS AU CARACTÈRE PRÈS du rendu prod du port Framer (home-texts.json,
// 2026-07-22) — contenu validé client : NE RIEN REFORMULER. Les apostrophes sont
// typographiques (’) comme dans la source.
// Réf. de contrôle : scratchpad/home-texts.json + extract-home-texts.mjs (diff du gate 3c).

import { INSCRIPTION_URL } from '@/data/site'

export const HOME = {
  hero: {
    titreLigne1: 'Le club sport des enfants',
    titreLigne2: 'Bouger, grandir, s’épanouir',
    sousTitre:
      'À Rochecorbon, le Kid Sport Club initie les enfants de 10 mois à 14 ans au sport, par le jeu et le mouvement.',
    ctaPrimaire: { label: 'S’inscrire', href: INSCRIPTION_URL },
    ctaSecondaire: { label: 'Séance d’essai', href: '/seance-essai' },
    stats: [
      { valeur: '+ de 10', label: 'Activités proposées' },
      { valeur: '+ de 600', label: 'Enfants accueillis par an' },
    ],
    image: { src: '/assets/ksc/mascotte-hero.webp', alt: 'La mascotte écureuil du Kid Sport Club' },
  },

  bienvenue: {
    titreLigne1: 'Bienvenue au',
    titreLigne2: 'Kid Sport Club !',
    texte:
      'Au Kid Sport Club de Rochecorbon, nous éveillons les enfants au sport dès le plus jeune âge, dans un cadre sécurisé, bienveillant et stimulant. De la baby gym aux stages sportifs, chacun grandit en s’amusant.',
    cta: { label: 'En savoir plus', href: '/qui-sommes-nous' },
    image: { src: '/assets/ksc/esprit-equipe.webp', alt: 'Enfants du Kid Sport Club réunis en équipe' },
  },

  tranches: {
    kicker: 'Au club',
    titre: 'Tranches d’âge',
    items: [
      {
        nom: 'Baby Gym',
        age: '(dès 10 mois)',
        texte: 'Dès 10 mois : éveil moteur et sensoriel pour les tout-petits, en douceur et en confiance.',
        href: '/nos-prestations/cours-10-36-mois',
      },
      {
        nom: 'Les P’tits Sportifs',
        age: '(3 – 5 ans)',
        texte: 'De 3 à 5 ans : parcours, motricité et premiers jeux sportifs pour se dépenser et progresser.',
        href: '/nos-prestations/cours-3-5-ans',
      },
      {
        nom: 'Les Sportifs',
        age: '(6 - 10 ans)', // tiret court dans la source — conserver tel quel
        texte: 'De 6 à 10 ans : initiation à de nombreux sports, coordination et esprit d’équipe.',
        href: '/nos-prestations/cours-6-10-ans',
      },
      {
        nom: 'Les Champions',
        age: '(11 – 14 ans)',
        texte: 'De 11 à 14 ans : perfectionnement, dépassement de soi et préparation physique, dans la bonne humeur.',
        href: '/nos-prestations/cours-11-14-ans',
      },
    ],
    cta: { label: 'Voir plus', href: '/nos-prestations' },
  },

  activites: {
    kicker: 'Au club',
    titre: 'Nos activités',
    // Libellés des filtres du template — rendus en pastilles de catégories
    // STATIQUES (décoratives) : mêmes textes, pas de faux filtre interactif.
    categories: ['Tout', 'Sport', 'Anniversaires', 'Éveil', 'Stages'],
    cartes: [
      {
        badge: '3 – 14 ans',
        note: 'Créneaux : nous consulter',
        titre: 'Stages vacances',
        texte: 'Pendant les vacances scolaires : une semaine d’activités sportives variées et encadrées.',
        href: '/nos-prestations/stages-vacances',
        image: '/assets/ksc/stages-vacances.webp',
      },
      {
        badge: '3 – 14 ans',
        note: 'Créneaux : nous consulter',
        titre: 'Anniversaire',
        texte: 'Un anniversaire clé en main : jeux sportifs, gâteau, déco et boissons, jusqu’à 10 enfants.',
        href: '/nos-prestations/anniversaire',
        image: '/assets/ksc/anniversaire.webp',
      },
      {
        badge: 'Tous âges',
        note: 'Tous les mercredis',
        titre: 'Mercredis Sportifs',
        texte: 'Tous les mercredis, votre enfant fait du sport au club.',
        href: '/nos-prestations/mercredis-sportifs',
        image: '/assets/ksc/mercredis-sportifs.webp',
      },
    ],
  },

  faqHome: {
    titreLigne1: 'Questions',
    titreLigne2: 'fréquentes',
    // Les questions renvoient vers /faq (accordéons réels là-bas).
    questions: [
      'Puis-je assister à une séance d’essai avant de m’inscrire ?',
      'À partir de quel âge mon enfant peut-il commencer ?',
      'Comment organiser l’anniversaire de mon enfant chez vous ?',
      'Proposez-vous des stages pendant les vacances scolaires ?',
    ],
    cta: { label: 'Toutes les questions', href: '/faq' },
  },
} as const
