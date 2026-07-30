import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Coachs et animateurs (« Notre équipe » sur /qui-sommes-nous, /seance-essai et
// les landings). Tant qu'une fiche n'a pas de photo, le monogramme (initiales)
// est affiché. Source de secours : src/data/equipe.ts (EQUIPE).
export const Equipe: CollectionConfig = {
  slug: 'equipe',
  labels: { singular: 'Membre de l’équipe', plural: 'Équipe' },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'initiales', 'ordre'],
    group: 'Contenu',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'nom', label: 'Nom', type: 'text', required: true },
    {
      name: 'initiales',
      label: 'Initiales',
      type: 'text',
      required: true,
      maxLength: 3,
      admin: { description: 'Monogramme affiché tant qu’il n’y a pas de photo. Ex. : « ML ».' },
    },
    { name: 'bio', label: 'Présentation', type: 'textarea', required: true },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optionnelle : sans photo, les initiales sont affichées dans un rond marine.' },
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
