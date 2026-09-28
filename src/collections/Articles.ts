import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'
import { hooksRevalidation } from '../lib/revalider'

// Articles du blog (/blog et /blog/[slug]) + bandeau « Actus & conseils » de
// l'accueil. Le corps est une suite de blocs : paragraphes et intertitres h2,
// dans l'ordre de lecture. Source de secours : src/data/articles.ts.
export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'date', 'publie'],
    listSearchableFields: ['titre'],
    pagination: { defaultLimit: 25 },
    group: 'Contenu du site',
    description:
      'Les articles du blog, aussi mis en avant sur l’accueil (« Actus & conseils »). Décochez « Publié » pour retirer un article du site sans le supprimer.',
    hideAPIURL: true,
    // Bouton « Aperçu » : ouvre la page du site concernée dans un nouvel onglet.
    preview: ({ slug }) => (typeof slug === 'string' && slug ? `/blog/${slug}` : null),
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Site remis à jour dès l'enregistrement ou la suppression.
  hooks: hooksRevalidation(),
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Adresse de la page',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description:
          'Fin de l’adresse de l’article sur le site. Ex. : a-quel-age-sport-enfant donne kidsportclub.fr/blog/a-quel-age-sport-enfant. En minuscules, sans accents ni espaces (mots séparés par des tirets). Ne plus la modifier une fois l’article publié.',
      },
    },
    {
      name: 'excerpt',
      label: 'Chapô / résumé',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Résumé affiché sur les cartes du blog et repris par Google sous le titre de la page.',
      },
    },
    {
      name: 'date',
      label: 'Date de publication',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' },
      },
    },
    {
      name: 'blocs',
      label: 'Contenu',
      type: 'array',
      labels: { singular: 'Bloc', plural: 'Blocs' },
      minRows: 1,
      admin: {
        description: 'Le corps de l’article, bloc par bloc, dans l’ordre de lecture.',
        initCollapsed: false,
      },
      fields: [
        {
          name: 't',
          label: 'Type',
          type: 'select',
          required: true,
          defaultValue: 'p',
          options: [
            { label: 'Paragraphe', value: 'p' },
            { label: 'Intertitre', value: 'h2' },
          ],
        },
        { name: 'texte', label: 'Texte', type: 'textarea', required: true },
      ],
    },
    {
      name: 'image',
      label: 'Image de couverture',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optionnelle : sans image, le visuel actuel de l’article est conservé.' },
    },
    {
      name: 'publie',
      label: 'Publié',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Décoché : l’article n’apparaît plus sur le site.' },
    },
    {
      name: 'ordre',
      label: 'Ordre d’affichage',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description:
          'Ordre des suggestions « À lire aussi ». Le blog et l’accueil affichent toujours les articles du plus récent au plus ancien.',
      },
    },
  ],
}
