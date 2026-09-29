# Suivi : Google Tag Manager, Meta Pixel, API Conversions, GA4

Conteneur GTM `GTM-W2WBD65R` (kidsportclub.fr). Configuration à importer :
`gtm-kidsportclub-import.json`, généré par `generer-gtm.mjs`
(`node gtm/generer-gtm.mjs gtm/gtm-kidsportclub-import.json`).

Import : GTM > Admin > Importer un conteneur > espace de travail > **Fusionner**
> **Renommer les éléments en conflit**, puis Aperçu, puis Publier.

## Consentement

Le site ne pose aucun état de consentement : ni consentement par défaut dans le
`<head>`, ni événement `consent_update`. Son bandeau cookies est une simple
information (`src/components/ksc/BandeauCookies.tsx`, bouton « J'ai compris »),
sans effet sur le suivi. La balise GTM « Consent - tout accordé » (Consent
Initialization) reste dans le conteneur : elle déclare tous les usages
« granted », ce qui ne change rien en l'absence d'état par défaut. Les balises
Meta ne sont pas conditionnées au consentement ; l'API Conversions est envoyée
pour chaque lead.

## Événements du dataLayer

Poussés par le site après un envoi de formulaire réussi
(`src/lib/envoiLead.ts`) :

```js
dataLayer.push({ event, event_id, source, activite })
```

| `event` | Formulaire | Meta | GA4 |
|---|---|---|---|
| `lead` | Landings, fiches prestation, pages des cours | `Lead` | `generate_lead` |
| `schedule` | Séance d'essai (`source` = `seance-essai`) | `Schedule` | `generate_lead` |
| `contact` | Page Contact (`source` = `contact`) | `Contact` | `generate_lead` |

Le choix de l'événement est dans `src/lib/evenementsSuivi.ts`, partagé par le
navigateur et le serveur. En GA4, le paramètre `lead_type` distingue les trois.

Événements prêts dans GTM mais pas encore envoyés par le site (paiement,
abonnement à venir) : `complete_registration`, `start_trial`, `find_location`,
`add_to_cart`, `initiate_checkout`, `add_payment_info`, `purchase`. Pour ceux
qui ont une valeur, pousser aussi `ecommerce: { currency: 'EUR', value, items }`
(format GA4), lu par les balises Meta (`value`, `currency`).

## Dédoublonnage Pixel / API Conversions

Chaque envoi de formulaire génère un `event_id` dans le navigateur :

1. il part à `/api/lead` avec les cookies `_fbp`, `_fbc` et l'identifiant
   visiteur `ksc_vid` (champ `suivi`, non transmis au webhook) ;
2. après une réponse ok, il est poussé dans le dataLayer : la balise Meta
   l'envoie comme `eventID` ;
3. `/api/lead` envoie le même événement à l'API Conversions
   (`src/lib/metaCapi.ts`), après la réponse, avec le même `event_id`.

Données envoyées à l'API Conversions : e-mail, téléphone (format 33…), prénom,
nom, pays (`fr`) et identifiant visiteur hachés en SHA-256 ; IP, user agent,
`fbc` (cookie, ou reconstruit depuis le `fbclid` du cookie `ksc_attribution`)
et `fbp` en clair ; `content_name` = source, `content_category` = activité.

Variables d'environnement : `META_PIXEL_ID`, `META_CAPI_TOKEN`,
`META_TEST_EVENT_CODE` (tests seulement, voir `.env.example`).

## Vérifications

- GTM Aperçu : envoyer un formulaire, vérifier que l'événement (`lead`,
  `schedule` ou `contact`) déclenche la balise Meta correspondante et
  « GA4 - Événements de conversion ».
- Meta, onglet « Tester les évènements » : poser `META_TEST_EVENT_CODE`,
  redéployer, envoyer un formulaire ; l'événement doit apparaître deux fois
  (Navigateur et Serveur) puis être marqué « Dédoublonné ». Retirer ensuite la
  variable.
- GA4 : marquer `generate_lead` comme événement clé ; créer les dimensions
  personnalisées `lead_type`, `form_source`, `activite`.
