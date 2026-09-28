import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'
import { hooksRevalidation } from '../lib/revalider'

// Coachs et animateurs (« Notre équipe » sur /qui-sommes-nous, /seance-essai et
// les landings). Tant qu'une fiche n'a pas de photo, le monogramme (initiales)
// est affiché. Source de secours : src/data/equipe.ts (EQUIPE).
export const Equipe: CollectionConfig = {
  slug: 'equipe',
  labels: { singular: 'Membre de l’équipe', plural: 'Équipe' },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'photo', 'ordre'],
    pagination: { defaultLimit: 25 },
    group: 'Contenu du site',
    description:
      'Les coachs et animateurs présentés sur les pages Qui sommes-nous et Séance d’essai. Sans photo, leurs initiales s’affichent dans un rond.',
    hideAPIURL: true,
    // Bouton « Aperçu » : ouvre la page du site concernée dans un nouvel onglet.
    preview: () => '/qui-sommes-nous',
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
    {
      type: 'row',
      fields: [
        { name: 'nom', label: 'Nom', type: 'text', required: true, admin: { width: '70%' } },
        {
          name: 'initiales',
          label: 'Initiales',
          type: 'text',
          required: true,
          maxLength: 3,
          admin: {
            width: '30%',
            description: 'Affichées dans un rond tant qu’il n’y a pas de photo. Ex. : « ML ».',
          },
        },
      ],
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
