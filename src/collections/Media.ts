import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'
import { hooksRevalidation } from '../lib/revalider'

// Bibliothèque de médias (photos des activités, coachs, articles, avis). Les
// fichiers sont servis par Payload sur /api/media/file/** (chemins locaux,
// autorisés par défaut par next/image). En production, ils sont stockés sur
// Vercel Blob (plugin de src/payload.config.ts, actif avec BLOB_READ_WRITE_TOKEN).
// Tant qu'aucun média n'est chargé, le front garde les visuels statiques de
// /public/assets/ksc.
export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Média', plural: 'Médias' },
  admin: {
    defaultColumns: ['filename', 'alt', 'createdAt'],
    pagination: { defaultLimit: 25 },
    group: 'Médias',
    description:
      'Les photos utilisées sur le site : activités, équipe, articles, avis. Le texte alternatif décrit chaque photo aux personnes malvoyantes et à Google.',
    hideAPIURL: true,
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
      name: 'alt',
      label: 'Texte alternatif',
      type: 'text',
      required: true,
      admin: {
        description:
          'Décrivez la photo en une phrase. Ex. : « Enfants en cours de gym dans la salle Kid ».',
      },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    // Vignette de 400 px de large (hauteur proportionnelle), utilisée pour les
    // aperçus de l'admin.
    imageSizes: [{ name: 'vignette', width: 400 }],
    adminThumbnail: 'vignette',
    // Point d'intérêt de la photo, à placer dans l'admin (recadrages).
    focalPoint: true,
  },
}
