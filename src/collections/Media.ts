import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Bibliothèque de médias (photos des activités, coachs, articles). Les fichiers
// sont servis par Payload sur /api/media/file/** (cf. images.localPatterns dans
// next.config.ts). Tant qu'aucun média n'est chargé, le front garde les visuels
// statiques de /public/assets/ksc.
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Média', plural: 'Médias' },
  admin: { group: 'Administration' },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texte alternatif',
      type: 'text',
      required: true,
      admin: { description: 'Décrit l’image pour l’accessibilité et le référencement.' },
    },
  ],
  upload: true,
}
