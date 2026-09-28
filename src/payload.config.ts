import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
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

// Le plugin Vercel Blob (Payload 3.85.1) ajoute TOUJOURS à l'admin son
// composant de téléversement direct depuis le navigateur, même quand cette
// option (clientUploads) est désactivée. Ce composant n'est pas compilable par
// webpack (il importe du code serveur) et, absent de l'import map, il vide
// l'admin. Le téléversement direct n'est pas utilisé ici (les images passent
// par le serveur, limite de taille suffisante pour des photos) : on le retire.
const CLIENT_BLOB = '@payloadcms/storage-vercel-blob/client'
const sansTeleversementDirect =
  (plugin: Plugin): Plugin =>
  async (config) => {
    const resultat = await plugin(config)
    const admin = resultat.admin
    if (admin?.components?.providers) {
      admin.components.providers = admin.components.providers.filter((p) => {
        const chemin = typeof p === 'string' ? p : p && typeof p === 'object' ? p.path : undefined
        return !(typeof chemin === 'string' && chemin.startsWith(CLIENT_BLOB))
      })
    }
    if (admin?.dependencies) {
      for (const cle of Object.keys(admin.dependencies)) {
        if (cle.startsWith(CLIENT_BLOB)) delete admin.dependencies[cle]
      }
    }
    return resultat
  }

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
      // Pas d'image Open Graph pour l'admin (noindex, jamais partagé) : sa
      // génération échouait au premier appel après le démarrage.
      defaultOGImageType: 'off',
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
          // Libellé du groupe par défaut des globals (seul un global SANS
          // admin.group y serait rangé). Il ne doit PAS valoir « Réglages » :
          // Payload (groupNavItems) crée ce groupe en 2e position, avant tous
          // les groupes nommés, et y aurait placé le groupe « Réglages » en tête
          // du menu et de l'accueil.
          globals: 'Autres réglages',
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
  // (Paramètres du site, Utilisateurs). Les groupes suivent l'ordre de première
  // apparition dans cette liste ; dans « Réglages », Payload place toujours les
  // collections avant les globals : Paramètres du site est remonté en tête par
  // custom.css (propriété order).
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
    // Images de l'admin stockées sur Vercel Blob (le disque du serveur est
    // effacé à chaque redéploiement). Actif uniquement si BLOB_READ_WRITE_TOKEN
    // est défini, donc pas en local.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          sansTeleversementDirect(
            vercelBlobStorage({
              collections: { media: true },
              token: process.env.BLOB_READ_WRITE_TOKEN,
            }),
          ),
        ]
      : []),
  ],
})
