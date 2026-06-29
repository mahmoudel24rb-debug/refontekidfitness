import React from 'react'

// Le CSS SSR exact de Framer (reset + styles globaux) — importé une seule fois ici.
import '@/components/framer.css'
import './overrides.css'
import SvgSprite from '@/components/SvgSprite'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Kid Sport Club — club de sport enfants à Rochecorbon',
    template: '%s',
  },
  description:
    "Le club de sport des enfants de 10 mois à 14 ans à Rochecorbon (près de Tours) : baby gym, cours, stages, garderie et anniversaires sportifs.",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Kid Sport Club',
    url: SITE,
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
  openingHours: ['Mo-Fr 09:30-12:30', 'Mo-Fr 16:00-19:30', 'Sa 09:30-17:30'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        <SvgSprite />
        {children}
      </body>
    </html>
  )
}
