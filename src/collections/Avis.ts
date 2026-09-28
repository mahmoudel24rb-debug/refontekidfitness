import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'
import { hooksRevalidation } from '../lib/revalider'

// Avis de parents (accueil, séance d'essai, landings) et citations mises en
// scène. Les textes sont des verbatims : ne pas les reformuler.
// Source de secours : src/data/avis.ts.
export const Avis: CollectionConfig = {
  slug: 'avis',
  labels: { singular: 'Avis', plural: 'Avis' },
  admin: {
    useAsTitle: 'auteur',
    defaultColumns: ['auteur', 'texte', 'ordre'],
    listSearchableFields: ['auteur', 'texte'],
    pagination: { defaultLimit: 25 },
    group: 'Contenu du site',
    description:
      'Avis de parents recopiés mot pour mot depuis Google. L’ordre est celui de l’affichage sur le site.',
    hideAPIURL: true,
    // Bouton « Aperçu » : ouvre la page du site concernée dans un nouvel onglet.
    preview: () => '/',
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
    { name: 'texte', label: 'Avis', type: 'textarea', required: true },
    {
      name: 'auteur',
      label: 'Signature',
      type: 'text',
      admin: { description: 'Nom du parent tel qu’il apparaît sur son avis Google (prénom en premier, casse propre).' },
    },
    {
      name: 'photo',
      label: 'Photo (chemin)',
      type: 'text',
      admin: {
        description:
          'Chemin d’une photo déposée dans public/assets/ksc/avis (ex. /assets/ksc/avis/celine.webp). Vide = avatar illustré.',
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
