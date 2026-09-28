import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build allégé pour l'hébergement Hostinger (serveur de build limité en RAM
  // et en nombre de processus : le build complet y mourait sans message).
  // - Type-check désactivé AU BUILD : il est fait avant chaque merge
  //   (`npx tsc --noEmit`), inutile de le rejouer sur le serveur.
  // - Génération statique sur un seul worker : chaque worker charge Payload et
  //   ouvre sa propre connexion Postgres.
  // - Compilation webpack (script `build` de package.json) et non Turbopack :
  //   Turbopack ouvre un thread par cœur de la machine hôte, ce qui bute sur le
  //   plafond de processus de l'hébergement mutualisé (build figé en compilation).
  typescript: { ignoreBuildErrors: true },
  experimental: { cpus: 1 },
  // NB : pas de `images.localPatterns` — le définir bloquerait tous les autres
  // chemins locaux (400). Les médias Payload (/api/media/file/**) comme les
  // visuels de /public/assets sont des chemins locaux, autorisés par défaut.
  async redirects() {
    // NB: modification 2026-07-07 — invalide le cache de build Vercel qui avait
    // resservi un routes-manifest périmé (redirection garderie absente en prod).
    return [
      { source: '/nos-prestations/garderie', destination: '/nos-prestations/mercredis-sportifs', permanent: true },
      // Retour client n5 (09/09/2026) : les 24 activités des 4 cours par tranche
      // d'âge sont remplacées par les 16 cours réellement dispensés. Chaque
      // ancienne URL part vers son équivalent, ou vers la fiche du cours quand
      // l'activité n'est plus proposée.
      { source: '/nos-prestations/cours-10-36-mois/gym-maman-bebe', destination: '/nos-prestations/cours-10-36-mois', permanent: true },
      { source: '/nos-prestations/cours-10-36-mois/baby-eveil', destination: '/nos-prestations/cours-10-36-mois', permanent: true },
      { source: '/nos-prestations/cours-10-36-mois/accueil-assistantes-maternelles', destination: '/nos-prestations/cours-10-36-mois', permanent: true },
      { source: '/nos-prestations/cours-10-36-mois/baby-rugby', destination: '/nos-prestations/cours-10-36-mois', permanent: true },
      { source: '/nos-prestations/cours-10-36-mois/baby-gym-et-dance', destination: '/nos-prestations/cours-10-36-mois/baby-gym-dance', permanent: true },
      { source: '/nos-prestations/cours-3-5-ans/kid-gym-et-dance', destination: '/nos-prestations/cours-3-5-ans/gym-et-dance', permanent: true },
      { source: '/nos-prestations/cours-3-5-ans/kid-training-et-boxing', destination: '/nos-prestations/cours-3-5-ans/cross-training-et-boxing', permanent: true },
      { source: '/nos-prestations/cours-3-5-ans/sports-de-ballon', destination: '/nos-prestations/cours-3-5-ans/multisports', permanent: true },
      { source: '/nos-prestations/cours-6-10-ans/fun-fit-zumba', destination: '/nos-prestations/cours-6-10-ans/zumba-mix-dance', permanent: true },
      { source: '/nos-prestations/cours-6-10-ans/gym-acrobatique', destination: '/nos-prestations/cours-6-10-ans/gym-accro-jungle-warrior', permanent: true },
      { source: '/nos-prestations/cours-6-10-ans/sports-de-ballon', destination: '/nos-prestations/cours-6-10-ans/multisports', permanent: true },
      { source: '/nos-prestations/cours-6-10-ans/sports-de-combat', destination: '/nos-prestations/cours-6-10-ans', permanent: true },
      { source: '/nos-prestations/cours-6-10-ans/kid-coaching', destination: '/nos-prestations/cours-6-10-ans', permanent: true },
      { source: '/nos-prestations/cours-11-14-ans/zumba-family', destination: '/nos-prestations/cours-11-14-ans/zumba-mix-dance', permanent: true },
      { source: '/nos-prestations/cours-11-14-ans/gym-acrobatique', destination: '/nos-prestations/cours-11-14-ans/gym-accro-jungle-warrior', permanent: true },
      { source: '/nos-prestations/cours-11-14-ans/sports-de-ballon', destination: '/nos-prestations/cours-11-14-ans/multisports', permanent: true },
      { source: '/nos-prestations/cours-11-14-ans/fitness', destination: '/nos-prestations/cours-11-14-ans', permanent: true },
      { source: '/about-us', destination: '/qui-sommes-nous', permanent: true },
      { source: '/programs', destination: '/nos-prestations', permanent: true },
      { source: '/admission', destination: '/nos-prestations', permanent: true },
      { source: '/parent-resources', destination: '/faq', permanent: true },
      { source: '/fees-breakdown', destination: '/nos-prestations', permanent: true },
      { source: '/gallery', destination: '/nos-prestations', permanent: true },
      { source: '/testimonials', destination: '/', permanent: true },
      { source: '/book-a-tour', destination: '/seance-essai', permanent: true },
      { source: '/privacy-policy', destination: '/confidentialite', permanent: true },
    ]
  },
};

// withPayload : alias @payload-config, packages serveur externes (sharp, pg…)
// et route group (payload). `devBundleServerPackages: false` garde le dev rapide.
export default withPayload(nextConfig, { devBundleServerPackages: false });
