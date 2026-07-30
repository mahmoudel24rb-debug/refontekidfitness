import configPromise from '@payload-config'
import { getPayload } from 'payload'

// Client Payload (API locale) pour lire le contenu côté serveur.
// NE PAS importer ce module statiquement depuis les pages : src/lib/contenu.ts
// l'importe dynamiquement, et seulement si DATABASE_URL est définie. Sans base,
// Payload n'est donc jamais initialisé (build et rendu restent verts).
export const getPayloadClient = () => getPayload({ config: configPromise })
