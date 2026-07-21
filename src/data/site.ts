// Données transverses du site (hors contenu métier).

// CTA « S'inscrire » — PLACEHOLDER. Pour la preview GitHub/Vercel, le bouton
// renvoie simplement vers /contact (n'envoie rien, pas de vente en ligne).
// EN PROD : remplacer INSCRIPTION_URL par l'URL/le parcours réel de l'outil
// d'inscription (Bodylink) ou brancher un onClick d'ouverture du module.
// C'est le SEUL endroit à modifier ; le nom de l'outil (jargon interne)
// ne doit apparaître qu'ici.
export const INSCRIPTION_URL = '/contact'

// Calendrier d'inscription du CRM — PLACEHOLDER (« # » tant que le client n'a
// pas fourni le lien). Utilisé par la landing « prestations » : chaque bloc
// prestation ouvre ce calendrier. C'est le SEUL endroit à modifier quand le
// lien arrive (possibilité d'un lien par prestation plus tard : ajouter alors
// un champ crmUrl aux prestations et garder cette constante en défaut).
export const CRM_INSCRIPTION_URL = '#'

// Coordonnées & horaires du club — SOURCE UNIQUE. Recopiées caractère pour
// caractère depuis ContactKSC.tsx (labels, valeurs, hrefs, URL d'embed Maps),
// pour être réutilisées par les landings sans dupliquer les chaînes.
export const COORDONNEES = {
  telephone: '02 47 44 41 43',
  telephoneHref: 'tel:+33247444143',
  email: 'kidfitnessrochecorbon@gmail.com',
  emailHref: 'mailto:kidfitnessrochecorbon@gmail.com',
  adresse: '1 Quai de la Loire, 37210 Rochecorbon',
  adresseHref: 'https://maps.google.com/?q=1+Quai+de+la+Loire+37210+Rochecorbon',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=1%20Quai%20de%20la%20Loire%2037210%20Rochecorbon&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapTitle: 'Plan — Kid Sport Club Rochecorbon',
} as const

// Horaires — valeur telle qu'affichée dans ContactKSC (le libellé « Horaires »
// reste porté par l'UI).
export const HORAIRES = 'Lun–Ven : 9h00–19h30 (sans coupure) · Samedi : 9h30–12h30'
