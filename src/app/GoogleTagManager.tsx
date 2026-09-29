'use client'

import React from 'react'

import { GTM_ID } from '@/data/site'

// Google Tag Manager : snippets officiels fournis pour le site, repris tels
// quels (seul l'identifiant vient de GTM_ID). Montés par les deux layouts
// publics (src/app/(frontend)/layout.tsx et src/app/global-not-found.tsx),
// jamais par celui de l'admin.

// Snippet 1, « le plus haut possible dans le <head> ».
const SNIPPET_HEAD = {
  __html: `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');</script>
<!-- End Google Tag Manager -->`,
}

// Snippet 2 : l'iframe de repli (navigateurs sans JavaScript), juste après
// l'ouverture du <body>.
const SNIPPET_NOSCRIPT = {
  __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
}

/**
 * <head> du site, ouvert par le snippet GTM.
 *
 * Pourquoi le contenu HTML du <head> et pas un <script> enfant : React place
 * d'abord dans le <head> les ressources qu'il gère (feuilles de style, scripts
 * async de Next, balises meta), puis seulement les enfants du <head>. Le
 * contenu HTML de la balise, lui, est écrit juste après son ouverture : le
 * snippet est ainsi le tout premier élément du <head> servi.
 *
 * Ce contenu n'est rendu que côté serveur. Côté navigateur, le <head> n'a pas
 * de contenu HTML imposé : React ne réécrit jamais le <head> (un nouveau rendu
 * remplacerait sinon tout son contenu, styles compris) et l'hydratation tolère
 * les éléments présents. Le snippet, exécuté pendant la lecture du HTML, n'a
 * besoin de rien d'autre.
 */
export function GtmHead() {
  const html = typeof window === 'undefined' ? SNIPPET_HEAD : undefined
  return <head suppressHydrationWarning dangerouslySetInnerHTML={html} />
}

/** Premier enfant du <body> : iframe GTM pour les navigateurs sans JavaScript. */
export function GtmNoscript() {
  return <noscript dangerouslySetInnerHTML={SNIPPET_NOSCRIPT} />
}
