import React from 'react'
import { Baloo_2, Inter } from 'next/font/google'

// Fondation unique : Tailwind v4 + thème charte KSC (globals.css).
// Le port Framer (framer.css, SvgSprite, HomePage vendored) a été purgé
// à la fin de la refonte des fondations — la home est reconstruite en
// composants propres (src/components/home/).
import './globals.css'


// Typographie de la charte : Baloo 2 (display, titres) + Inter (texte courant).
// Fontes variables Google auto-hébergées par next/font (aucune requête externe au runtime).
const display = Baloo_2({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Kid Sport Club | club de sport enfants à Rochecorbon',
    template: '%s',
  },
  description:
    "Le club de sport des enfants de 10 mois à 14 ans à Rochecorbon (près de Tours) : baby gym, cours, stages, mercredis sportifs et anniversaires sportifs.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Kid Sport Club',
    url: SITE,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Kid Sport Club, le club de sport des enfants à Rochecorbon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kid Sport Club | club de sport enfants à Rochecorbon',
    description: 'Le club de sport des enfants de 10 mois à 14 ans à Rochecorbon, près de Tours.',
    images: ['/og.png'],
  },
}

// Données structurées LocalBusiness (NAP + horaires) — SEO local Rochecorbon.
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  name: 'Kid Sport Club',
  description: 'Club de sport pour enfants de 10 mois à 14 ans à Rochecorbon.',
  address: { '@type': 'PostalAddress', streetAddress: '1 Quai de la Loire', postalCode: '37210', addressLocality: 'Rochecorbon', addressCountry: 'FR' },
  telephone: '+33247444143',
  email: 'kidfitnessrochecorbon@gmail.com',
  url: SITE,
  // Horaires MàJ récap client : Lun–Ven 9h00–19h30 sans coupure · Samedi 9h30–12h30.
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:30', closes: '12:30' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        {children}
      </body>
    </html>
  )
}
