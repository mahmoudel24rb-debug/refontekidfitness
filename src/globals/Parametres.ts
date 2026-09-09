import type { GlobalConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Source unique des coordonnées et des liens transverses : footer, page Contact,
// séance d'essai, bloc « Où nous trouver » des landings, barre CTA mobile.
// Source de secours : src/data/site.ts (COORDONNEES, HORAIRES, INSCRIPTION_URL,
// CRM_INSCRIPTION_URL).
export const Parametres: GlobalConfig = {
  slug: 'parametres',
  label: 'Paramètres du site',
  admin: { group: 'Réglages' },
  access: {
    read: publicRead,
    update: authenticated,
  },
  fields: [
    {
      name: 'coordonnees',
      label: 'Coordonnées',
      type: 'group',
      fields: [
        { name: 'telephone', label: 'Téléphone (affiché)', type: 'text' },
        {
          name: 'telephoneHref',
          label: 'Téléphone (lien)',
          type: 'text',
          admin: { description: 'Format international. Ex. : tel:+33763251712' },
        },
        { name: 'email', label: 'Email (affiché)', type: 'text' },
        {
          name: 'emailHref',
          label: 'Email (lien)',
          type: 'text',
          admin: { description: 'Ex. : mailto:kidsportclubrochecorbon@gmail.com' },
        },
        { name: 'adresse', label: 'Adresse (affichée)', type: 'text' },
        {
          name: 'adresseHref',
          label: 'Adresse (lien)',
          type: 'text',
          admin: { description: 'Lien Google Maps ouvert au clic sur l’adresse.' },
        },
        {
          name: 'mapsEmbedUrl',
          label: 'URL de la carte intégrée',
          type: 'text',
          admin: { description: 'URL « output=embed » de Google Maps, affichée dans l’iframe du plan.' },
        },
        { name: 'mapTitle', label: 'Titre de la carte', type: 'text' },
      ],
    },
    {
      name: 'horaires',
      label: 'Horaires',
      type: 'text',
      admin: {
        description:
          'Une seule ligne. Le footer coupe l’affichage sur les séparateurs « · ». Ex. : « Lun–Ven : 9h00–19h30 (sans coupure) · Samedi : 9h30–12h30 ».',
      },
    },
    {
      name: 'inscriptionUrl',
      label: 'Lien d’inscription',
      type: 'text',
      admin: {
        description:
          'Destination du bouton « S’inscrire ». Réservé : le bouton est rendu dans l’en-tête (composant interactif) et suit encore la valeur du code (src/data/site.ts) tant que l’inscription en ligne n’est pas branchée.',
      },
    },
    {
      name: 'crmInscriptionUrl',
      label: 'Calendrier d’inscription (landing catalogue)',
      type: 'text',
      admin: {
        description:
          'Lien ouvert par les boutons « S’inscrire » de la landing catalogue. « # » tant que le calendrier n’est pas fourni.',
      },
    },
    {
      name: 'reservation',
      label: 'Réservation en ligne (planning)',
      type: 'group',
      admin: {
        description:
          'Chaque créneau du calendrier de la semaine ouvre le lien de sa tranche d’âge. Un créneau sans tranche d’âge ouvre le lien 6-14 ans.',
      },
      fields: [
        { name: 'url1036', label: 'Réservation 10-36 mois', type: 'text' },
        { name: 'url35', label: 'Réservation 3-5 ans', type: 'text' },
        { name: 'url614', label: 'Réservation 6-14 ans', type: 'text' },
      ],
    },
  ],
}
