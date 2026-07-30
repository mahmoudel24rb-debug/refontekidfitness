import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Articles du blog (/blog et /blog/[slug]) + bandeau « Actus & conseils » de
// l'accueil. Le corps est une suite de blocs : paragraphes et intertitres h2,
// dans l'ordre de lecture. Source de secours : src/data/articles.ts.
export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'date', 'publie'],
    group: 'Contenu',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Ex. : a-quel-age-sport-enfant → /blog/a-quel-age-sport-enfant.',
      },
    },
    {
      name: 'excerpt',
      label: 'Chapô / résumé',
      type: 'textarea',
      required: true,
      admin: { description: 'Résumé des cartes du blog, également utilisé en meta description.' },
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
            { label: 'Intertitre (h2)', value: 'h2' },
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
          'Ordre de référence (blocs « À lire aussi », sitemap). Le hub du blog et l’accueil affichent toujours les articles du plus récent au plus ancien.',
      },
    },
  ],
}
