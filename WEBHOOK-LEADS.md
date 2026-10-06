# Webhook des leads : champs transmis au CRM

Référence pour le mapping CRM des demandes envoyées par les formulaires du site
kidsportclub.fr (état au 29/09/2026).

## Circuit

1. Le visiteur envoie un formulaire du site.
2. Le navigateur poste la demande sur `/api/lead` (même domaine).
3. `/api/lead` vérifie et borne les champs, calcule `sourceCrm`, puis transmet
   un JSON (`POST`, `Content-Type: application/json`) à l'URL de la variable
   d'environnement `LEAD_WEBHOOK_URL` (webhook Make), qui alimente le CRM.

Une demande = un appel au webhook. Ne sont jamais transmis : les envois de
robots (champ-piège `website` rempli) et les demandes sans prénom ou sans moyen
de recontact (téléphone ou email). Le serveur ne journalise aucune donnée
personnelle.

## Champs transmis

| Champ | Présence | Sens |
|---|---|---|
| `source` | toujours | Formulaire d'origine (valeurs plus bas). Vide s'il manque. |
| `landing` | toujours | Slug de la landing (landings), de la prestation (fiche prestation) ou de la tranche d'âge (page d'un cours). Vide pour Contact et Séance d'essai. |
| `page` | toujours | Chemin de la page du formulaire, ex. `/contact`. |
| `prenom` | toujours | Prénom (du parent). Obligatoire. |
| `nom` | toujours | Nom du parent, demandé et obligatoire dans tous les formulaires (Contact, Séance d'essai, fiches prestation, pages des cours, landings). Vide seulement pour un envoi depuis une page restée en cache avant l'ajout du champ (la validation du serveur ne l'exige pas). |
| `telephone` | toujours | Téléphone. Téléphone ou email obligatoire ; vide si non saisi. |
| `email` | toujours | Email. Obligatoire dans le formulaire du haut des landings (depuis le 06/10/2026), facultatif ailleurs ; vide si non saisi. |
| `ageEnfant` | toujours | Âge de l'enfant, texte libre (ex. « 6 ans »). Vide si non saisi. |
| `activite` | toujours | Activité qui intéresse le prospect (valeurs plus bas). |
| `creneau` | toujours | Créneau souhaité (fiches prestation et pages des cours). Vide si non choisi. |
| `message` | toujours | Message libre. Vide si non saisi. |
| `utm` | toujours | UTM de la dernière visite : `source`, `medium`, `campaign`, `content`, `term`, les 5 clés toujours présentes (vides si non renseignées). Champ historique, conservé pour le mapping existant : mêmes valeurs que `attribution.last.utm_*`. |
| `attribution.first` | toujours | Première source connue du visiteur (first touch) : 10 clés, détail ci-dessous. Provenance : voir « Provenance d'`attribution` ». |
| `attribution.last` | toujours | Dernière source connue du visiteur (last touch) : mêmes 10 clés. |
| `sourceCrm` | toujours | Valeur du champ `source` du CRM, calculée par le site sur la dernière visite (`attribution.last`) : toujours l'une des 44 valeurs acceptées par le CRM. Règles : voir « Calcul de `sourceCrm` ». |
| `recuLe` | toujours | Date et heure de réception par le site (ISO 8601, UTC). |

Structure stable : toutes les clés sont toujours présentes, dans cet ordre,
quel que soit le formulaire ; une valeur manquante vaut une chaîne vide (y
compris les 5 clés d'`utm` et les 10 clés de chaque visite d'`attribution`).
`sourceCrm` n'est jamais vide : `WEBSITE_FORM` quand rien n'est connu.
Make ne détecte que les clés reçues : chaque champ, même `landing`,
`ageEnfant` ou `creneau`, est ainsi mappable dès la première demande de test.
Longueurs maximales : 120 caractères pour les champs courts, 2 000 pour
`message`, 300 pour `page` et pour chaque valeur d'`attribution`.

### Clés de `attribution.first` et `attribution.last`

| Clé | Sens |
|---|---|
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | Paramètres UTM de l'URL d'arrivée. |
| `gclid` | Identifiant de clic Google Ads (marquage automatique). |
| `fbclid` | Identifiant de clic Facebook / Instagram. |
| `referrer` | Page d'où venait le visiteur (`document.referrer`), seulement si elle est sur un autre domaine ; souvent réduite au domaine par le navigateur, ex. `https://www.google.com/`. Vide pour une visite directe, une navigation interne, ou quand le navigateur ne la transmet pas. |
| `landing_page` | Page d'entrée : chemin et paramètres, ex. `/essai-gratuit?utm_source=facebook&utm_medium=cpc`. |
| `date` | Date et heure de la visite (ISO 8601, UTC). |

## Calcul de `sourceCrm`

Le champ `source` du CRM n'accepte que sa liste de 44 valeurs (constante
`SOURCES_CRM` de `src/lib/sourceCrm.ts`, dans l'ordre du CRM). `/api/lead`
calcule `sourceCrm` côté serveur, sur la dernière visite (`attribution.last`,
après bornage des valeurs) ; la valeur transmise appartient toujours à cette
liste.

Comparaisons : `utm_source`, `utm_medium` et `utm_campaign` sans espaces de
bord et sans tenir compte de la casse, sauf à la règle 1a (casse respectée) ;
domaine du référent sans `www.`. Les règles sont examinées dans l'ordre, la
première qui s'applique donne la valeur.

| Ordre | Condition sur la dernière visite | `sourceCrm` | Exemple (URL d'arrivée, référent) |
|---|---|---|---|
| 1a | `utm_source` égal à l'une des 44 valeurs du CRM écrite telle quelle (casse respectée) : code du CRM écrit exprès | Cette valeur | `/?utm_source=META_ADS` : `META_ADS` ; `/?utm_source=FACEBOOK&utm_medium=cpc` : `FACEBOOK` |
| 1b | Sinon, `utm_source` égal à l'une des 44 valeurs, casse ignorée, sauf `google`, `facebook` et `instagram` (classés par les règles 2 à 10) | La valeur correspondante | `/?utm_source=meta_ads` : `META_ADS` ; `/?utm_source=whatsapp` : `WHATSAPP` |
| 2 | `gclid` renseigné | `GOOGLE_ADS` | `/?gclid=Cj0KCQjw...` ; `/?utm_source=google&utm_medium=cpc&gclid=...` |
| 3 | `utm_source` parmi `google_ads`, `googleads`, `adwords`, `gads` ; ou `utm_source=google` avec un `utm_medium` payant : `cpc`, `ppc`, `paid`, `sem`, `ads`, `ad`, `cpm`, `display`, `paid_search` | `GOOGLE_ADS` | `/?utm_source=google&utm_medium=cpc` ; `/?utm_source=adwords` |
| 4 | `utm_source` parmi `gmb`, `gbp`, `google_my_business`, `googlemybusiness`, `google_business`, `googlebusiness`, `google_business_profile`, `mybusiness` ; ou `utm_source=google` avec un `utm_medium` ou un `utm_campaign` contenant `gmb`, `gbp`, `mybusiness`, `business`, `fiche` ou `maps` | `GOOGLE_MYBUSINESS` | `/?utm_source=gmb&utm_medium=organic` ; `/?utm_source=google&utm_campaign=fiche-gmb` |
| 5 | Source Meta : `utm_source` parmi `meta`, `meta_ads`, `metaads`, `facebook_ads`, `facebookads`, `fb_ads`, `instagram_ads`, `ig_ads`, `facebook`, `fb`, `instagram`, `ig`, `an`, `audience_network`, `msg`, `messenger`, ou contenant `facebook`, `instagram` ou `meta` ; avec un `utm_medium` organique : `social`, `organic`, `organique`, `post`, `bio`, `profile`, `profil`, `story`, `reel`, `link`, `lien` | `INSTAGRAM` (source `instagram` ou `ig`), `FACEBOOK_MESSENGER` (source `messenger` ou `msg`), sinon `FACEBOOK` | `/?utm_source=facebook&utm_medium=social` : `FACEBOOK` ; `/?utm_source=instagram&utm_medium=bio` : `INSTAGRAM` |
| 5 | Source Meta avec tout autre `utm_medium` (payant, vide ou autre) | `META_ADS` | `/essai-gratuit?utm_source=facebook&utm_medium=cpc&fbclid=...` : `META_ADS` ; `/?utm_source=fb&utm_medium=paid` : `META_ADS` |
| 6 | Autres sources connues : `whatsapp`, `wa` ; `chatgpt`, `chatgpt.com`, `openai` ; `activecampaign`, `active_campaign` ; `typeform` ; `systeme`, `systeme_io`, `system_io`, `systemeio` ; `clickfunnels` ; `urban_sports_club`, `urbansportsclub`, `usc` ; `resamania` ; `deciplus` ; `google` (sans support payant ni indice de fiche) | Dans l'ordre : `WHATSAPP`, `CHATGPT`, `ACTIVE_CAMPAIGN`, `TYPEFORM`, `SYSTEM_IO`, `CLICKFUNNELS`, `URBAN_SPORTS_CLUB`, `RESAMANIA`, `DECIPLUS`, `GOOGLE` | `/?utm_source=wa` : `WHATSAPP` ; `/?utm_source=google&utm_medium=organic` : `GOOGLE` |
| 7 | `utm_source` renseigné mais non reconnu | `MSDS_EXTERN_REFERER` | `/?utm_source=newsletter` |
| 8 | Pas d'`utm_source`, `fbclid` renseigné | `INSTAGRAM` si le référent est `instagram.com` ou `l.instagram.com`, sinon `FACEBOOK` | `/?fbclid=IwAR...` depuis `https://l.instagram.com/` : `INSTAGRAM` |
| 9 | Aucun paramètre UTM, référent externe | `google.*` : `GOOGLE` ; `facebook.com`, `m.facebook.com`, `l.facebook.com`, `lm.facebook.com`, `business.facebook.com` : `FACEBOOK` ; `instagram.com`, `l.instagram.com` : `INSTAGRAM` ; `messenger.com`, `m.me` : `FACEBOOK_MESSENGER` ; `chatgpt.com`, `chat.openai.com` : `CHATGPT` ; `wa.me`, `whatsapp.com`, `web.whatsapp.com`, `api.whatsapp.com` : `WHATSAPP` ; tout autre référent : `MSDS_EXTERN_REFERER` | `/contact` depuis `https://www.google.fr/` : `GOOGLE` |
| 10 | Sinon (visite directe, rien de connu) | `WEBSITE_FORM` | `/contact` tapé dans la barre d'adresse |

Précisions :

- `fb`, `ig`, `an` et `msg` sont les valeurs du paramètre dynamique Meta
  `{{site_source_name}}`.
- Règle 8 : Meta ajoute `fbclid` à tous les clics sortants, publicités comme
  publications ; les publicités balisées sont déjà classées par la règle 5.
- Règle 1 : un code du CRM écrit tel quel l'emporte toujours
  (`utm_source=FACEBOOK&utm_medium=cpc` donne `FACEBOOK`). Écrits autrement
  qu'en majuscules (`google`, `Facebook`, `instagram`, etc.), ces trois mots
  sont classés selon `gclid`, `utm_medium` et `utm_campaign`
  (`utm_source=facebook&utm_medium=cpc` donne `META_ADS`,
  `utm_source=google&utm_medium=cpc` donne `GOOGLE_ADS`).
- Règle 9 : une visite sans `utm_source`, `gclid` ni `fbclid` mais avec un
  autre paramètre UTM (`utm_medium`, `utm_campaign`, `utm_content` ou
  `utm_term`) n'en relève pas : `WEBSITE_FORM`, même avec un référent externe.

## Provenance d'`attribution`

`attribution` vient du cookie `ksc_attribution` (first touch / last touch),
écrit dès la première page vue et mis à jour à chaque chargement de page
publique (règles ci-dessous), sans condition : le bandeau cookies du site est
une simple information et ne change rien au suivi.

Si le cookie est absent ou illisible au moment de l'envoi (cookies bloqués par
le navigateur), `first` et `last` valent tous deux la visite d'arrivée gardée
en mémoire par la page : paramètres de campagne, référent et page d'entrée du
chargement de page en cours.

## Règles first touch / last touch

Chaque chargement de page publique du site est classé :

- visite **campagne** : l'URL contient au moins un des 7 paramètres
  `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`,
  `gclid`, `fbclid` ;
- sinon visite **référent** : le visiteur arrive d'un autre domaine ;
- sinon visite **directe** (aucun référent) ou **navigation interne** (depuis
  une page du site).

Mise à jour :

- `first` est enregistré à la première visite, quel qu'en soit le type (visite
  directe : `referrer` vide, `landing_page` renseignée), puis n'est plus jamais
  modifié ;
- `last` vaut `first` au départ, puis est remplacé à chaque visite campagne ou
  référent ;
- une visite directe ou une navigation interne ne change rien.

Exemple :

| Visite | `first` | `last` |
|---|---|---|
| 1. Annonce Facebook : `/essai-gratuit?utm_source=facebook&utm_medium=cpc&fbclid=...` | Facebook | Facebook |
| 2. Clic vers `/tarifs` sur le site | Facebook | Facebook |
| 3. Quelques jours plus tard, annonce Google : `/?utm_source=google&gclid=...` | Facebook | Google |
| 4. Retour direct (favori, adresse tapée), puis envoi du formulaire | Facebook | Google |

Limites : l'attribution est propre à un navigateur sur un appareil. Si le
visiteur efface ses cookies, sa visite suivante redevient une première visite.
Si le cookie est absent ou illisible au moment de l'envoi (cookies bloqués),
`first` et `last` décrivent la visite d'arrivée en mémoire.

## Cookie

- Nom : `ksc_attribution` (cookie first-party, domaine du site).
- Déposé dès la première page vue, sans condition (le bandeau cookies du site
  est informatif).
- Durée : 90 jours (`Max-Age=7776000`), repoussée à chaque mise à jour
  (première visite, visite campagne ou référent).
- Attributs : `Path=/`, `SameSite=Lax`, `Secure` en https ; lisible par
  JavaScript, donc par GTM.
- Contenu : `{ "first": {...}, "last": {...} }` en JSON encodé pour l'URL, avec
  les 10 clés décrites plus haut ; valeurs tronquées à 200 caractères. Aucune
  donnée personnelle.
- Mis à jour à chaque chargement d'une page publique (jamais dans
  l'administration).

## Valeurs de `source`

| `source` | Formulaire |
|---|---|
| `contact` | Page Contact (`/contact`). |
| `seance-essai` | Page Séance d'essai (`/seance-essai`). |
| `prestation-{slug}` | Fiche prestation `/nos-prestations/{slug}`. |
| `activite-{tranche}-{cours}` | Page d'un cours `/nos-prestations/{tranche}/{cours}`. |
| `landing-{slug}` | Formulaire du haut d'une landing `/{slug}` (ex. `/essai-gratuit`). |
| `landing-{slug}-final` | Formulaire de fin de page de la même landing. |

Fiches prestation (7) : `prestation-mercredis-sportifs`,
`prestation-stages-vacances`, `prestation-anniversaire`,
`prestation-cours-10-36-mois`, `prestation-cours-3-5-ans`,
`prestation-cours-6-10-ans`, `prestation-cours-11-14-ans`.

Landings avec formulaires : `essai-gratuit`, `anniversaire-sportif`,
`stage-vacances`, `stage-toussaint` (sources `landing-essai-gratuit`,
`landing-essai-gratuit-final`, etc.). La landing catalogue `/prestations`
n'a pas de formulaire (ses boutons ouvrent le calendrier d'inscription).

Depuis le 02/10/2026, les landings sont servies à la racine du site
(`/essai-gratuit`, `/stage-toussaint`...). Les anciennes adresses
`/landing/{slug}` redirigent (308) vers la nouvelle, paramètres UTM compris :
les valeurs de `source` et `landing` ne changent pas.

Les prestations et les cours sont administrables (Payload) : les listes de ce
document sont celles du 28/09/2026 et suivent le contenu de l'admin.

## Valeurs d'`activite`

| Formulaire | `activite` |
|---|---|
| Contact, Séance d'essai, landing essai-gratuit (ses deux formulaires) | Liste déroulante : `Je ne sais pas encore` (valeur par défaut, transmise telle quelle) ou l'une des 7 prestations. |
| Fiche prestation | Titre de la prestation. |
| Page d'un cours | `{cours} ({tranche})`, voir le tableau ci-dessous. |
| Landing anniversaire-sportif | `Anniversaire` |
| Landings stage-vacances et stage-toussaint | `Stages vacances` |

Les 7 prestations : `Mercredis Sportifs`, `Stages vacances`, `Anniversaire`,
`Cours 10 – 36 mois`, `Cours 3 – 5 ans`, `Cours 6 – 10 ans`,
`Cours 11 – 14 ans`.

Pages des cours (16) :

| `source` | `activite` |
|---|---|
| `activite-cours-10-36-mois-baby-gym-dance` | `Baby Gym Dance (Cours 10 – 36 mois)` |
| `activite-cours-3-5-ans-gym-et-dance` | `Gym & Dance (Cours 3 – 5 ans)` |
| `activite-cours-3-5-ans-cross-training-et-boxing` | `Cross Training & Boxing (Cours 3 – 5 ans)` |
| `activite-cours-3-5-ans-multisports` | `Multisports (Cours 3 – 5 ans)` |
| `activite-cours-6-10-ans-pompom-girl` | `Pompom Girl (Cours 6 – 10 ans)` |
| `activite-cours-6-10-ans-cross-training-et-boxing` | `Cross Training & Boxing (Cours 6 – 10 ans)` |
| `activite-cours-6-10-ans-multisports` | `Multisports (Cours 6 – 10 ans)` |
| `activite-cours-6-10-ans-fit-family` | `Fit’Family (Parent/Enfant) (Cours 6 – 10 ans)` |
| `activite-cours-6-10-ans-zumba-mix-dance` | `Zumba Mix Dance (Cours 6 – 10 ans)` |
| `activite-cours-6-10-ans-gym-accro-jungle-warrior` | `Gym Accro / Jungle Warrior (Cours 6 – 10 ans)` |
| `activite-cours-11-14-ans-pompom-girl` | `Pompom Girl (Cours 11 – 14 ans)` |
| `activite-cours-11-14-ans-cross-training-et-boxing` | `Cross Training & Boxing (Cours 11 – 14 ans)` |
| `activite-cours-11-14-ans-multisports` | `Multisports (Cours 11 – 14 ans)` |
| `activite-cours-11-14-ans-fit-family` | `Fit’Family (Parent/Enfant) (Cours 11 – 14 ans)` |
| `activite-cours-11-14-ans-zumba-mix-dance` | `Zumba Mix Dance (Cours 11 – 14 ans)` |
| `activite-cours-11-14-ans-gym-accro-jungle-warrior` | `Gym Accro / Jungle Warrior (Cours 11 – 14 ans)` |

## Exemple de JSON reçu

JSON réellement reçu lors des tests (données fictives) pour une demande envoyée
depuis la page Contact, par un visiteur arrivé d'abord par une annonce Facebook
(`first`) puis revenu par une annonce Google (`last`). `sourceCrm` vaut
`GOOGLE_ADS` : il est calculé sur `last`, dont le `gclid` est renseigné
(règle 2) :

```json
{
  "source": "contact",
  "landing": "",
  "page": "/contact",
  "prenom": "Testeur",
  "nom": "Tracking",
  "telephone": "0600000000",
  "email": "test.tracking@example.com",
  "ageEnfant": "",
  "activite": "Mercredis Sportifs",
  "creneau": "",
  "message": "Test automatique du tracking, a ignorer.",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "rentree",
    "content": "",
    "term": ""
  },
  "attribution": {
    "first": {
      "utm_source": "facebook",
      "utm_medium": "cpc",
      "utm_campaign": "test",
      "utm_content": "",
      "utm_term": "",
      "gclid": "",
      "fbclid": "abc",
      "referrer": "",
      "landing_page": "/landing/essai-gratuit?utm_source=facebook&utm_medium=cpc&utm_campaign=test&fbclid=abc",
      "date": "2026-09-28T15:40:53.685Z"
    },
    "last": {
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "rentree",
      "utm_content": "",
      "utm_term": "",
      "gclid": "test123",
      "fbclid": "",
      "referrer": "",
      "landing_page": "/?utm_source=google&utm_medium=cpc&utm_campaign=rentree&gclid=test123",
      "date": "2026-09-28T15:40:54.478Z"
    }
  },
  "sourceCrm": "GOOGLE_ADS",
  "recuLe": "2026-09-28T15:40:57.825Z"
}
```

`landing`, `ageEnfant` et `creneau` sont vides ici : le formulaire Contact n'a
pas ces champs, mais les clés restent présentes.

## Événement dataLayer

Après chaque envoi réussi, tous les formulaires poussent :

```js
window.dataLayer.push({ event: 'lead', source: '<source>', activite: '<activite>' })
```

Le conteneur Google Tag Manager `GTM-W2WBD65R` est chargé sur toutes les pages
publiques (jamais dans l'administration). Dans GTM : déclencheur
« Événement personnalisé » nommé `lead`, variables de couche de données
`source` et `activite`.

## Mise en place côté Make / CRM

1. Dans le scénario Make, sur le module webhook : « Redetermine data
   structure », puis envoyer une demande de test depuis le site en ligne (par
   exemple en arrivant par une URL avec `?utm_source=test`), pour que Make
   découvre tous les champs : les clés étant toujours présentes (`landing`,
   `nom`, `ageEnfant`, `creneau`, les 5 clés d'`utm` et `sourceCrm` compris),
   une seule demande de test suffit.
2. Rattacher ces champs aux champs du CRM, par exemple :

| Webhook | Donnée CRM |
|---|---|
| `sourceCrm` | Champ `source` du CRM : dans le module CRM de Make, ligne `source` = `21.sourceCrm` (à la place de la valeur fixe `META_ADS`). |
| `prenom`, `nom` | Prénom et nom de famille du parent (`nom` : lastname). |
| `activite` | Activité qui intéresse le prospect. |
| `source`, `page` | Formulaire et page d'origine de la demande (le champ `source` du webhook désigne le formulaire, pas la source du CRM). |
| `attribution.first.utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | Source, support, campagne, contenu et mot-clé du premier contact. |
| `attribution.first.referrer`, `landing_page`, `date` | Site référent, page d'entrée et date du premier contact. |
| `attribution.first.gclid`, `fbclid` | Identifiants de clic du premier contact (Google Ads, Meta). |
| `attribution.last.*` | Mêmes informations pour la dernière source avant la demande. |

3. Le champ `utm` garde ses 5 clés, désormais toujours présentes (vides si non
   renseignées) : le mapping existant continue de fonctionner.
