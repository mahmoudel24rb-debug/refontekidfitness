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
