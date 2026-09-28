import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
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
    // Composants KSC (src/components/admin/, chemins relatifs à src/) :
    // logo de connexion, icône du fil d'Ariane, accueil avec raccourcis.
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icone#Icone',
      },
      beforeDashboard: ['/components/admin/Accueil#Accueil'],
    },
    // Avatar générique : pas de requête vers Gravatar.
    avatar: 'default',
    // Dates à la française, ex. « 28 septembre 2026 à 14:05 » (date-fns).
    dateFormat: "d MMMM yyyy 'à' HH:mm",
    meta: {
      // Payload insère lui-même une espace entre le titre et le suffixe.
      titleSuffix: '| Kid Sport Club',
      icons: [
        { rel: 'icon', type: 'image/png', url: '/icon.png' },
        { rel: 'apple-touch-icon', type: 'image/png', url: '/apple-icon.png' },
      ],
      robots: 'noindex, nofollow',
    },
    // Thème KSC (src/app/(payload)/custom.css) : clair uniquement.
    theme: 'light',
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
    // Libellés français ajustés (le reste vient de @payloadcms/translations).
    translations: {
      fr: {
        general: {
          dashboard: 'Accueil',
          globals: 'Réglages',
          backToDashboard: 'Retour à l’accueil',
          createNew: 'Créer',
          createNewLabel: 'Créer : {{label}}',
          creatingNewLabel: 'Création : {{label}}',
        },
        dashboard: {
          editDashboard: 'Modifier l’accueil',
          editingDashboard: 'Modification de l’accueil',
          addWidget: 'Ajouter un widget',
          noItems:
            'Aucun widget sur l’accueil. Vous pouvez en ajouter depuis le menu « Accueil » de la barre supérieure.',
        },
      },
    },
  },
  // Ordre du menu et de l'accueil : « Contenu du site » (planning, activités,
  // tarifs, articles, FAQ, avis, équipe), « Médias », puis « Réglages »
  // (utilisateurs, et le global Paramètres du site).
  collections: [Planning, Prestations, Tarifs, Articles, Faq, Avis, Equipe, Media, Users],
  globals: [Parametres],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-ksc',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({ pool: { connectionString: databaseUrl } }),
  sharp,
  plugins: [
    // ATTENTION (constaté avec Payload 3.85.1) : actif, le plugin ajoute à
    // l'admin le fournisseur VercelBlobClientUploadHandler. Absent de l'import
    // map (cas actuel, généré sans jeton), l'admin ne s'affiche plus ; présent,
    // le build webpack échoue (ce composant client importe du code serveur).
    // Ne pas poser BLOB_READ_WRITE_TOKEN avant d'avoir réglé ce point.
    // Sur Vercel le filesystem est éphémère : les uploads partent sur Blob
    // (actif uniquement si BLOB_READ_WRITE_TOKEN est défini, donc pas en local)
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: { media: true },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
})
