import { PRESTATIONS } from './prestations'

// Navigation du site — source unique pour SiteHeader (nav principale) et
// SiteFooter (colonne « Navigation » + barre légale).

export type NavSubItem = {
  label: string
  href: string
  /** Activités détaillées de la tranche d'âge (2e niveau du sous-menu). */
  disciplines?: { label: string; href: string }[]
}

export type NavItem = {
  label: string
  href: string
  sub?: NavSubItem[]
}

// Nav principale (header). Pas d'entrée « Accueil » (le logo y renvoie) ni
// « Contact » (présent au footer, et le CTA « S'inscrire » y mène tant que
// l'inscription en ligne n'est pas branchée) : le header est réservé aux deux
// chemins de conversion — séance d'essai et inscription.
export const NAV: NavItem[] = [
  { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
  {
    label: 'Nos activités',
    href: '/nos-prestations',
    // 2e niveau : les activités des 4 cours par tranche d'âge, chacune avec sa
    // page /nos-prestations/[cours]/[activité]. Le header est un composant
    // client : la liste vient du fichier de données (les fiches servies par
    // Payload portent les mêmes noms, donc les mêmes slugs).
    sub: PRESTATIONS.map((p) => ({
      label: p.titre,
      href: `/nos-prestations/${p.slug}`,
      disciplines: p.disciplines?.map((d) => ({
        label: d.nom,
        href: `/nos-prestations/${p.slug}/${d.slug}`,
      })),
    })),
  },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'Planning', href: '/planning' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
]

// Colonne « Navigation » du footer : nav complète (Accueil en tête,
// Contact et Séance d'essai en fin), sans les sous-menus.
export const FOOTER_NAV: { label: string; href: string }[] = [
  { label: 'Accueil', href: '/' },
  ...NAV.map(({ label, href }) => ({ label, href })),
  { label: 'Contact', href: '/contact' },
  { label: 'Séance d’essai', href: '/seance-essai' },
]

// Barre légale du footer.
export const LEGAL_NAV: { label: string; href: string }[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'CGV', href: '/cgv' },
]
