import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Baloo_2, Inter } from 'next/font/google'

// Page 404 globale : l'application a deux layouts racine (site et admin), il
// n'existe donc plus de layout commun pour composer la 404 des URL inconnues.
// Ce fichier contourne le rendu normal : il importe lui-même les styles et les
// polices du site (mêmes réglages que src/app/(frontend)/layout.tsx).
import './(frontend)/globals.css'

import { Button } from '@/components/ui/button'
import HeroMarine from '@/components/ksc/HeroMarine'
import SiteFooter from '@/components/ksc/SiteFooter'
import SiteHeader from '@/components/ksc/SiteHeader'

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

// Le pied de page lit les Paramètres du site et les activités : même
// régénération que les autres pages (60 s).
export const revalidate = 60

export const metadata: Metadata = {
  title: 'Page introuvable | Kid Sport Club',
  description: 'Cette page n’existe pas ou a été déplacée.',
}

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body>
        <SiteHeader />
        <main className="bg-cream text-ink">
          <HeroMarine
            kicker="Erreur 404"
            title="Cette page est introuvable"
            sub="La page demandée n’existe pas ou a été déplacée. Retrouvez nos activités, le planning et les tarifs depuis l’accueil."
            padding="72px 24px 84px"
            maxWidth={760}
          >
            <Button asChild>
              <Link href="/">Retour à l’accueil</Link>
            </Button>
          </HeroMarine>
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
