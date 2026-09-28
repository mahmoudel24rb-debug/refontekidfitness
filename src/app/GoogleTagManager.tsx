'use client'

import React from 'react'

import { GTM_ID } from '@/data/site'
import { scriptConsentementParDefaut } from '@/lib/consentement'

// Google Tag Manager : snippets officiels fournis pour le site, repris tels
// quels (seul l'identifiant vient de GTM_ID). Montés par les deux layouts
// publics (src/app/(frontend)/layout.tsx et src/app/global-not-found.tsx),
// jamais par celui de l'admin.
//
// Google Consent Mode v2 : le script de consentement par défaut est placé
// juste AVANT le snippet GTM, dans le même contenu HTML du <head>. GTM trouve
// ainsi l'état du consentement dès son chargement : tout refusé par défaut,
// ou le choix mémorisé dans le cookie ksc_consentement. Le script est
// construit par src/lib/consentement.ts (source unique du nom du cookie, de
// la version et de la durée du choix).

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

// Contenu HTML du <head> : consentement par défaut (Consent Mode v2), puis le
// snippet GTM inchangé.
const CONTENU_HEAD = {
  __html: `<script>${scriptConsentementParDefaut()}</script>\n${SNIPPET_HEAD.__html}`,
}

// Snippet 2 : l'iframe de repli (navigateurs sans JavaScript), juste après
// l'ouverture du <body>.
const SNIPPET_NOSCRIPT = {
  __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
}

/**
 * <head> du site, ouvert par le script de consentement puis le snippet GTM.
 *
 * Pourquoi le contenu HTML du <head> et pas un <script> enfant : React place
 * d'abord dans le <head> les ressources qu'il gère (feuilles de style, scripts
 * async de Next, balises meta), puis seulement les enfants du <head>. Le
 * contenu HTML de la balise, lui, est écrit juste après son ouverture : les
 * deux scripts sont ainsi les tout premiers éléments du <head> servi.
 *
 * Ce contenu n'est rendu que côté serveur. Côté navigateur, le <head> n'a pas
 * de contenu HTML imposé : React ne réécrit jamais le <head> (un nouveau rendu
 * remplacerait sinon tout son contenu, styles compris) et l'hydratation tolère
 * les éléments présents. Les scripts, exécutés pendant la lecture du HTML,
 * n'ont besoin de rien d'autre.
 */
export function GtmHead() {
  const html = typeof window === 'undefined' ? CONTENU_HEAD : undefined
  return <head suppressHydrationWarning dangerouslySetInnerHTML={html} />
}

/** Premier enfant du <body> : iframe GTM pour les navigateurs sans JavaScript. */
export function GtmNoscript() {
  return <noscript dangerouslySetInnerHTML={SNIPPET_NOSCRIPT} />
}
