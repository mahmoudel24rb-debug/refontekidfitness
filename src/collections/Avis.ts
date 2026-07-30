import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Avis de parents (accueil, séance d'essai, landings) et citations mises en
// scène. Les textes sont des verbatims : ne pas les reformuler.
// Source de secours : src/data/avis.ts.
export const Avis: CollectionConfig = {
  slug: 'avis',
  labels: { singular: 'Avis', plural: 'Avis' },
  admin: {
    useAsTitle: 'auteur',
    defaultColumns: ['auteur', 'ordre'],
    group: 'Contenu',
    description: 'Avis recopiés tels quels (verbatim). L’ordre est celui d’affichage sur le site.',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'texte', label: 'Avis', type: 'textarea', required: true },
    {
      name: 'auteur',
      label: 'Signature',
      type: 'text',
      defaultValue: 'Parent d’un enfant du club',
      admin: { description: 'Attribution affichée sous l’avis. Laisser la mention neutre par défaut si le parent n’a pas donné son nom.' },
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
