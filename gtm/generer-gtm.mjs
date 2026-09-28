import { writeFileSync } from 'node:fs'

// Génère gtm/gtm-kidsportclub-import.json (conteneur GTM à importer).
// Usage : node gtm/generer-gtm.mjs gtm/gtm-kidsportclub-import.json
// Détail des balises et du dataLayer : gtm/README.md.

const A = '6060080614', C = '265426379'
const PIXEL = '3224748017715610'
const GA4 = 'G-VB7RJBHMRZ'
const base = { accountId: A, containerId: C }
const T = (key, value) => ({ type: 'TEMPLATE', key, value })
const B = (key, value) => ({ type: 'BOOLEAN', key, value: String(value) })
const ALL_PAGES = '2147479553', CONSENT_INIT = '2147479572', INIT_ALL = '2147479573'
const noConsent = { consentStatus: 'NOT_NEEDED' }

// ---------- Variables ----------
let vid = 1
const variables = []
const dlv = (name, path) => variables.push({ ...base, variableId: String(vid++), name, type: 'v',
  parameter: [{ type: 'INTEGER', key: 'dataLayerVersion', value: '2' }, B('setDefaultValue', false), T('name', path)] })
variables.push({ ...base, variableId: String(vid++), name: 'CONST - Meta Pixel ID', type: 'c', parameter: [T('value', PIXEL)] })
variables.push({ ...base, variableId: String(vid++), name: 'CONST - GA4 ID', type: 'c', parameter: [T('value', GA4)] })
dlv('DLV - event_id', 'event_id')
dlv('DLV - source', 'source')
dlv('DLV - activite', 'activite')
dlv('DLV - ecommerce.value', 'ecommerce.value')
dlv('DLV - ecommerce.currency', 'ecommerce.currency')
// Nom GA4 de chaque événement du dataLayer.
const ga4Names = [
  ['lead', 'generate_lead'], ['schedule', 'generate_lead'], ['contact', 'generate_lead'],
  ['complete_registration', 'sign_up'], ['start_trial', 'start_trial'], ['find_location', 'find_location'],
  ['add_to_cart', 'add_to_cart'], ['initiate_checkout', 'begin_checkout'],
  ['add_payment_info', 'add_payment_info'], ['purchase', 'purchase'],
]
variables.push({ ...base, variableId: String(vid++), name: 'LT - GA4 event name', type: 'smm', parameter: [
  B('setDefaultValue', false), T('input', '{{Event}}'),
  { type: 'LIST', key: 'map', list: ga4Names.map(([k, v]) => ({ type: 'MAP', map: [T('key', k), T('value', v)] })) },
] })

// ---------- Triggers ----------
let tid = 1
const triggers = []
const ce = (name, filterType, value) => {
  const id = String(tid++)
  triggers.push({ ...base, triggerId: id, name, type: 'CUSTOM_EVENT', customEventFilter: [{ type: filterType,
    parameter: [T('arg0', '{{_event}}'), T('arg1', value)] }] })
  return id
}
const trHistory = String(tid++)
triggers.push({ ...base, triggerId: trHistory, name: 'Historique - navigation interne', type: 'HISTORY_CHANGE' })
const trGa4Events = ce('CE - événements de conversion (GA4)', 'MATCH_REGEX', '^(' + ga4Names.map(([k]) => k).join('|') + ')$')

// ---------- Tags ----------
let gid = 1
const tags = []
const html = (name, code, firing, consent, extra = {}) => {
  const t = { ...base, tagId: String(gid++), name, type: 'html',
    parameter: [T('html', code), B('supportDocumentWrite', false)],
    firingTriggerId: firing, tagFiringOption: 'ONCE_PER_EVENT', consentSettings: consent, ...extra }
  tags.push(t)
  return t
}

html('Consent - tout accordé (Consent Mode v2)', `<script>
  // Choix de l'éditeur du site : consentement accordé par défaut pour tous
  // les usages (pas de bandeau cookies pour l'instant).
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    functionality_storage: 'granted',
    personalization_storage: 'granted',
    security_storage: 'granted'
  });
</script>`, [CONSENT_INIT], noConsent)

const metaBase = html('Meta - Pixel base + PageView', `<script>
  if (!window.__kscMetaInit) {
    window.__kscMetaInit = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '{{CONST - Meta Pixel ID}}');
    fbq('track', 'PageView');
  }
</script>`, [ALL_PAGES], noConsent)
const setup = { setupTag: [{ tagName: metaBase.name, stopOnSetupFailure: true }] }

html('Meta - PageView (navigation interne)', `<script>
  if (window.fbq) fbq('track', 'PageView');
</script>`, [trHistory], noConsent, setup)

// Événements Meta : événement du dataLayer -> nom standard Meta.
const metaEvents = [
  ['lead', 'Lead', 'Prospect'],
  ['schedule', 'Schedule', 'Programmation - séance d’essai'],
  ['contact', 'Contact', 'Contact - formulaire /contact'],
  ['complete_registration', 'CompleteRegistration', 'Inscription terminée'],
  ['start_trial', 'StartTrial', 'Démarrage d’essai'],
  ['find_location', 'FindLocation', 'Recherche de lieu'],
  ['add_to_cart', 'AddToCart', 'Ajout au panier'],
  ['initiate_checkout', 'InitiateCheckout', 'Paiement initié'],
  ['add_payment_info', 'AddPaymentInfo', 'Ajout d’infos de paiement'],
  ['purchase', 'Purchase', 'Achat'],
]
const avecValeur = ['start_trial', 'add_to_cart', 'initiate_checkout', 'add_payment_info', 'purchase']
for (const [ev, meta, label] of metaEvents) {
  const trig = ce('CE - ' + ev, 'EQUALS', ev)
  const params = avecValeur.includes(ev)
    ? `{
    content_name: {{DLV - source}},
    content_category: {{DLV - activite}},
    value: {{DLV - ecommerce.value}},
    currency: {{DLV - ecommerce.currency}} || 'EUR'
  }`
    : `{
    content_name: {{DLV - source}},
    content_category: {{DLV - activite}}
  }`
  html(`Meta - ${meta} (${label})`, `<script>
  // eventID identique à celui envoyé par le serveur (API Conversions) : dédoublonnage.
  fbq('track', '${meta}', ${params}, { eventID: {{DLV - event_id}} });
</script>`, [trig], noConsent, setup)
}

// ---------- GA4 ----------
tags.push({ ...base, tagId: String(gid++), name: 'GA4 - Balise Google', type: 'googtag',
  parameter: [T('tagId', '{{CONST - GA4 ID}}')],
  firingTriggerId: [INIT_ALL], tagFiringOption: 'ONCE_PER_EVENT', consentSettings: noConsent })
tags.push({ ...base, tagId: String(gid++), name: 'GA4 - Événements de conversion', type: 'gaawe',
  parameter: [
    T('eventName', '{{LT - GA4 event name}}'),
    T('measurementIdOverride', '{{CONST - GA4 ID}}'),
    B('sendEcommerceData', true), T('getEcommerceDataFrom', 'dataLayer'),
    { type: 'LIST', key: 'eventSettingsTable', list: [
      ['lead_type', '{{Event}}'], ['form_source', '{{DLV - source}}'],
      ['activite', '{{DLV - activite}}'], ['event_id', '{{DLV - event_id}}'],
    ].map(([k, v]) => ({ type: 'MAP', map: [T('parameter', k), T('parameterValue', v)] })) },
  ],
  firingTriggerId: [trGa4Events], tagFiringOption: 'ONCE_PER_EVENT', consentSettings: noConsent })

const builtIn = [
  ['PAGE_URL', 'Page URL'], ['PAGE_HOSTNAME', 'Page Hostname'], ['PAGE_PATH', 'Page Path'],
  ['REFERRER', 'Referrer'], ['EVENT', 'Event'], ['HISTORY_SOURCE', 'History Source'],
  ['NEW_HISTORY_URL', 'New History URL'],
].map(([type, name]) => ({ ...base, type, name }))

const out = {
  exportFormatVersion: 2,
  exportTime: '2026-09-28 16:00:00',
  containerVersion: {
    path: `accounts/${A}/containers/${C}/versions/0`, ...base, containerVersionId: '0',
    container: { path: `accounts/${A}/containers/${C}`, ...base, name: 'kidsportclub.fr', publicId: 'GTM-W2WBD65R', usageContext: ['WEB'] },
    tag: tags, trigger: triggers, variable: variables, builtInVariable: builtIn,
  },
}
writeFileSync(process.argv[2], JSON.stringify(out, null, 2) + '\n')
console.log(`tags ${tags.length}, triggers ${triggers.length}, variables ${variables.length}`)
