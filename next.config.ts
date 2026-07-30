import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Type-check ACTIF au build : le port Framer vendored (seule raison
  // historique de le désactiver) a été purgé lors de la refonte des fondations.
  typescript: { ignoreBuildErrors: false },
  // NB : pas de `images.localPatterns` — le définir bloquerait tous les autres
  // chemins locaux (400). Les médias Payload (/api/media/file/**) comme les
  // visuels de /public/assets sont des chemins locaux, autorisés par défaut.
  async redirects() {
    // NB: modification 2026-07-07 — invalide le cache de build Vercel qui avait
    // resservi un routes-manifest périmé (redirection garderie absente en prod).
    return [
      { source: '/nos-prestations/garderie', destination: '/nos-prestations/mercredis-sportifs', permanent: true },
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
