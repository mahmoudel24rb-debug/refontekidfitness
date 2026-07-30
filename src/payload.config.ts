import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Articles } from './collections/Articles'
import { Avis } from './collections/Avis'
import { Equipe } from './collections/Equipe'
import { Faq } from './collections/Faq'
import { Media } from './collections/Media'
import { Planning } from './collections/Planning'
import { Prestations } from './collections/Prestations'
import { Tarifs } from './collections/Tarifs'
import { Users } from './collections/Users'
import { Parametres } from './globals/Parametres'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// MODE FALLBACK : aucune base n'est provisionnée pour l'instant. La config se
// construit quand même (l'adaptateur Postgres n'ouvre aucune connexion à
// l'import), mais Payload n'est jamais initialisé tant que DATABASE_URL est
// absente : la couche src/lib/contenu.ts ne l'appelle pas et sert les fichiers
// src/data/*. Conséquence assumée : /admin ne fonctionne pas sans base.
// On privilégie la connexion NON-poolée (directe) : plus fiable avec
// Payload/drizzle que pgbouncer (prepared statements). Neon expose ces
// variables via son intégration Vercel.
const databaseUrl =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL ||
  ''

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Kid Sport Club',
    },
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
  },
  collections: [Prestations, Planning, Tarifs, Faq, Avis, Equipe, Articles, Media, Users],
  globals: [Parametres],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-ksc',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({ pool: { connectionString: databaseUrl } }),
  sharp,
})
