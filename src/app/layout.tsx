import React from 'react'

// Le CSS SSR exact de Framer (reset + styles globaux) — importé une seule fois ici.
import '@/components/framer.css'
import './overrides.css'
import SvgSprite from '@/components/SvgSprite'

export const metadata = {
  title: 'Kid Sport Club — Rochecorbon',
  description:
    "La salle de sport pour les enfants de 3 mois à 14 ans, à Rochecorbon : activités sportives, baby spa, stages, anniversaires.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SvgSprite />
        {children}
      </body>
    </html>
  )
}
