import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Tarifs affichés sur /tarifs et sur la landing catalogue : les abonnements aux
// cours d'un côté, les prestations de l'autre. Source de secours :
// src/data/tarifs.ts.
export const Tarifs: CollectionConfig = {
  slug: 'tarifs',
  labels: { singular: 'Tarif', plural: 'Tarifs' },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'type', 'prix', 'enAvant', 'ordre'],
    group: 'Contenu',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      defaultValue: 'abonnement',
      options: [
        { label: 'Abonnement', value: 'abonnement' },
        { label: 'Prestation', value: 'prestation' },
      ],
      admin: { description: 'Détermine le groupe dans lequel la carte apparaît sur la page Tarifs.' },
    },
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    {
      name: 'prix',
      label: 'Prix',
      type: 'text',
      required: true,
      admin: { description: 'Ex. : « 29,90 €/mois », « 190 € », « 35 €/jour ou 150 €/semaine ».' },
    },
    {
      name: 'detail',
      label: 'Détail',
      type: 'text',
      required: true,
      admin: { description: 'Mention sous le prix. Ex. : « Engagement 10 mois ».' },
    },
    {
      name: 'enAvant',
      label: 'Mettre en avant',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Badge « La plus choisie » et bordure magenta. Une seule carte à la fois.',
      },
    },
    {
      name: 'ordre',
      label: 'Ordre d’affichage',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Ordre dans son groupe (abonnements ou prestations).' },
    },
  ],
}
