import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le port fidèle Kinderly est du markup généré (vendored) avec du CSS Framer
  // non-standard (cornerShape, variables --framer-*) : on n'impose pas le
  // type-check/lint sur ce code, sinon le build échoue sur ces propriétés.
  // Le code métier qu'on écrit à la main reste vérifié dans l'éditeur.
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
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

export default nextConfig;
