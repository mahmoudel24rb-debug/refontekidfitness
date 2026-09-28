import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Questions fréquentes : page /faq (accordéons + JSON-LD FAQPage), bloc FAQ de
// l'accueil et mini-FAQ des landings. Source de secours : src/data/faq.ts.
export const Faq: CollectionConfig = {
  slug: 'faq',
  labels: { singular: 'Question fréquente', plural: 'FAQ' },
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'ordre'],
    listSearchableFields: ['question'],
    pagination: { defaultLimit: 25 },
    group: 'Contenu du site',
    description:
      'Les questions fréquentes de la page FAQ, dans l’ordre d’affichage. Quelques-unes sont aussi reprises sur l’accueil.',
    hideAPIURL: true,
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'question', label: 'Question', type: 'text', required: true },
    { name: 'reponse', label: 'Réponse', type: 'textarea', required: true },
    {
      name: 'lienTarifs',
      label: 'Lier « page tarifs »',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'Si la réponse contient les mots « page tarifs », ils deviennent un lien vers la page Tarifs.',
      },
    },
    {
      name: 'ordre',
      label: 'Ordre d’affichage',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
