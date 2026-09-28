import type { GlobalConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Source unique des coordonnées et des liens transverses : footer, page Contact,
// séance d'essai, bloc « Où nous trouver » des landings, barre CTA mobile.
// Source de secours : src/data/site.ts (COORDONNEES, HORAIRES, INSCRIPTION_URL,
// CRM_INSCRIPTION_URL).
// Les liens d'appel et d'email sont recalculés par getParametres()
// (src/lib/contenu.ts) à partir du numéro et de l'email affichés quand ils sont
// vides ou ne correspondent plus : les champs techniques sont donc rangés dans
// un bloc « Avancé » replié. `row` et `collapsible` n'ont aucun effet sur les
// données (mêmes colonnes en base).
export const Parametres: GlobalConfig = {
  slug: 'parametres',
  label: 'Paramètres du site',
  admin: {
    group: 'Réglages',
    description:
      'Coordonnées, horaires et liens utilisés partout sur le site : pied de page, page Contact, séance d’essai, pages de publicité.',
    hideAPIURL: true,
  },
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
        {
          type: 'row',
          fields: [
            {
              name: 'telephone',
              label: 'Téléphone',
              type: 'text',
              admin: {
                width: '50%',
                description:
                  'Numéro affiché sur le site. Le lien pour appeler d’un clic est créé automatiquement à partir de ce numéro.',
              },
            },
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              admin: {
                width: '50%',
                description:
                  'Adresse affichée sur le site. Le lien pour écrire d’un clic est créé automatiquement à partir de cette adresse.',
              },
            },
          ],
        },
        {
          name: 'adresse',
          label: 'Adresse',
          type: 'text',
          admin: { description: 'Adresse postale du club, telle qu’elle s’affiche sur le site.' },
        },
        {
          type: 'collapsible',
          label: 'Avancé',
          admin: {
            initCollapsed: true,
            description:
              'Réglages techniques : les liens d’appel et d’email se remplissent tout seuls, le reste ne change qu’en cas de déménagement.',
          },
          fields: [
            {
              name: 'telephoneHref',
              label: 'Lien d’appel',
              type: 'text',
              admin: {
                description:
                  'Calculé automatiquement à partir du téléphone affiché : laissez ce champ vide.',
              },
            },
            {
              name: 'emailHref',
              label: 'Lien d’email',
              type: 'text',
              admin: {
                description: 'Calculé automatiquement à partir de l’email affiché : laissez ce champ vide.',
              },
            },
            {
              name: 'adresseHref',
              label: 'Lien de l’adresse',
              type: 'text',
              admin: { description: 'Page Google Maps ouverte quand on clique sur l’adresse.' },
            },
            {
              name: 'mapsEmbedUrl',
              label: 'Carte du plan d’accès',
              type: 'text',
              admin: {
                description:
                  'Lien de la carte Google Maps affichée sur la page Contact et les pages de publicité.',
              },
            },
            {
              name: 'mapTitle',
              label: 'Titre de la carte',
              type: 'text',
              admin: {
                description: 'Nom de la carte, lu aux personnes malvoyantes. Ex. : « Plan | Kid Sport Club Rochecorbon ».',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'horaires',
      label: 'Horaires',
      type: 'text',
      admin: {
        description:
          'Une seule ligne. Séparez les jours par un point médian « · » : le pied de page passe à la ligne à cet endroit. Ex. : « Lun–Ven : 9h00–19h30 (sans coupure) · Samedi : 9h30–12h30 ».',
      },
    },
    {
      // Masqué : le bouton « S'inscrire » de l'en-tête suit la valeur du code
      // (src/data/site.ts) tant que l'inscription en ligne n'est pas branchée.
      // Colonne conservée en base.
      name: 'inscriptionUrl',
      label: 'Lien d’inscription',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'crmInscriptionUrl',
      label: 'Calendrier d’inscription (page catalogue)',
      type: 'text',
      admin: {
        description:
          'Lien ouvert par les boutons « S’inscrire » de la page catalogue utilisée pour les publicités. Laissez « # » tant que le calendrier n’est pas fourni.',
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
