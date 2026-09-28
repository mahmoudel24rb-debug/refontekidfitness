/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
// NB : fichier modifié à la main (thème KSC : custom.css et polices du site).
// Aucune commande Payload ne le réécrit (generate:importmap ne touche qu'à
// admin/importMap.js).
import config from '@payload-config'
import '@payloadcms/next/css'
import './custom.css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import { Baloo_2, Inter } from 'next/font/google'
import React from 'react'

import { importMap } from './admin/importMap.js'

// Polices du site (Baloo 2 titres, Inter texte) sous des variables propres à
// l'admin : custom.css les branche sur --font-body de Payload.
const display = Baloo_2({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700', '800'],
  variable: '--ksc-font-display',
  display: 'swap',
})
const body = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  variable: '--ksc-font-body',
  display: 'swap',
})

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    htmlProps={{ className: `${display.variable} ${body.variable}` }}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
)

export default Layout
