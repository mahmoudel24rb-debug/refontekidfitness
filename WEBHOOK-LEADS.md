# Webhook des leads : champs transmis au CRM

Référence pour le mapping CRM des demandes envoyées par les formulaires du site
kidsportclub.fr (état au 28/09/2026).

## Circuit

1. Le visiteur envoie un formulaire du site.
2. Le navigateur poste la demande sur `/api/lead` (même domaine).
3. `/api/lead` vérifie et borne les champs, puis transmet un JSON (`POST`,
   `Content-Type: application/json`) à l'URL de la variable d'environnement
   `LEAD_WEBHOOK_URL` (webhook Make), qui alimente le CRM.

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
| `nom` | toujours | Nom (formulaire Contact). Vide si non saisi. |
| `telephone` | toujours | Téléphone. Téléphone ou email obligatoire ; vide si non saisi. |
| `email` | toujours | Email. Vide si non saisi. |
| `ageEnfant` | toujours | Âge de l'enfant, texte libre (ex. « 6 ans »). Vide si non saisi. |
| `activite` | toujours | Activité qui intéresse le prospect (valeurs plus bas). |
| `creneau` | toujours | Créneau souhaité (fiches prestation et pages des cours). Vide si non choisi. |
| `message` | toujours | Message libre. Vide si non saisi. |
| `utm` | toujours | UTM de la dernière visite : `source`, `medium`, `campaign`, `content`, `term`, les 5 clés toujours présentes (vides si non renseignées). Champ historique, conservé pour le mapping existant : mêmes valeurs que `attribution.last.utm_*`. |
| `attribution.first` | toujours | Première source connue du visiteur (first touch) : 10 clés, détail ci-dessous. Provenance selon le consentement aux cookies : voir « Consentement et provenance d'`attribution` ». |
| `attribution.last` | toujours | Dernière source connue du visiteur (last touch) : mêmes 10 clés. |
| `recuLe` | toujours | Date et heure de réception par le site (ISO 8601, UTC). |

Structure stable : toutes les clés sont toujours présentes, dans cet ordre,
quel que soit le formulaire ; une valeur manquante vaut une chaîne vide (y
compris les 5 clés d'`utm` et les 10 clés de chaque visite d'`attribution`).
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
| `landing_page` | Page d'entrée : chemin et paramètres, ex. `/landing/essai-gratuit?utm_source=facebook&utm_medium=cpc`. |
| `date` | Date et heure de la visite (ISO 8601, UTC). |

## Consentement et provenance d'`attribution`

Le site affiche un bandeau de consentement aux cookies (règles CNIL). La
provenance d'`attribution` dépend du choix du visiteur pour la catégorie
« Publicité et suivi des campagnes » :

- catégorie acceptée : `attribution` vient du cookie `ksc_attribution`
  (first touch / last touch, règles ci-dessous) ;
- catégorie refusée, ou pas encore de choix : rien n'est enregistré sur
  l'appareil. `first` et `last` valent tous deux la visite d'arrivée gardée
  en mémoire par la page (session en cours uniquement) : paramètres de
  campagne, référent et page d'entrée du chargement de page en cours. Un
  rechargement complet de page (la plupart des liens du site en provoquent
  un) la remplace par celle de la nouvelle page. Le formulaire d'une landing
  transmet ainsi les UTM de l'annonce qui y a mené.

Si le visiteur accepte la catégorie plus tard sur la même page, le cookie est
écrit avec cette visite d'arrivée ; s'il retire son accord, le cookie est
supprimé.

## Règles first touch / last touch

Avec l'accord du visiteur (catégorie « Publicité et suivi des campagnes »),
chaque chargement de page du site est classé :

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
| 1. Annonce Facebook : `/landing/essai-gratuit?utm_source=facebook&utm_medium=cpc&fbclid=...` | Facebook | Facebook |
| 2. Clic vers `/tarifs` sur le site | Facebook | Facebook |
| 3. Quelques jours plus tard, annonce Google : `/?utm_source=google&gclid=...` | Facebook | Google |
| 4. Retour direct (favori, adresse tapée), puis envoi du formulaire | Facebook | Google |

Limites : l'attribution est propre à un navigateur sur un appareil. Si le
visiteur efface ses cookies, sa visite suivante redevient une première visite.
Si le cookie est absent ou illisible au moment de l'envoi (catégorie refusée,
cookies bloqués), `first` et `last` décrivent la visite d'arrivée en mémoire.

## Cookie

- Nom : `ksc_attribution` (cookie first-party, domaine du site).
- Déposé uniquement avec l'accord du visiteur pour la catégorie « Publicité
  et suivi des campagnes » (choix conservé 6 mois dans le cookie
  `ksc_consentement`) ; supprimé si la catégorie est refusée ou retirée.
- Durée : 90 jours (`Max-Age=7776000`), repoussée à chaque mise à jour
  (première visite, visite campagne ou référent).
- Attributs : `Path=/`, `SameSite=Lax`, `Secure` en https ; lisible par
  JavaScript, donc par GTM.
- Contenu : `{ "first": {...}, "last": {...} }` en JSON encodé pour l'URL, avec
  les 10 clés décrites plus haut ; valeurs tronquées à 200 caractères. Aucune
  donnée personnelle.
- Mis à jour à chaque chargement d'une page publique tant que l'accord est
  valable (jamais dans l'administration).

## Valeurs de `source`

| `source` | Formulaire |
|---|---|
| `contact` | Page Contact (`/contact`). |
| `seance-essai` | Page Séance d'essai (`/seance-essai`). |
| `prestation-{slug}` | Fiche prestation `/nos-prestations/{slug}`. |
| `activite-{tranche}-{cours}` | Page d'un cours `/nos-prestations/{tranche}/{cours}`. |
| `landing-{slug}` | Formulaire du haut d'une landing `/landing/{slug}`. |
| `landing-{slug}-final` | Formulaire de fin de page de la même landing. |

Fiches prestation (7) : `prestation-mercredis-sportifs`,
`prestation-stages-vacances`, `prestation-anniversaire`,
`prestation-cours-10-36-mois`, `prestation-cours-3-5-ans`,
`prestation-cours-6-10-ans`, `prestation-cours-11-14-ans`.

Landings avec formulaires : `essai-gratuit`, `anniversaire-sportif`,
`stage-vacances` (sources `landing-essai-gratuit`,
`landing-essai-gratuit-final`, etc.). La landing catalogue `/landing/prestations`
n'a pas de formulaire (ses boutons ouvrent le calendrier d'inscription).

Les prestations et les cours sont administrables (Payload) : les listes de ce
document sont celles du 28/09/2026 et suivent le contenu de l'admin.

## Valeurs d'`activite`

| Formulaire | `activite` |
|---|---|
| Contact, Séance d'essai, landing essai-gratuit (ses deux formulaires) | Liste déroulante : `Je ne sais pas encore` (valeur par défaut, transmise telle quelle) ou l'une des 7 prestations. |
| Fiche prestation | Titre de la prestation. |
| Page d'un cours | `{cours} ({tranche})`, voir le tableau ci-dessous. |
| Landing anniversaire-sportif | `Anniversaire` |
| Landing stage-vacances | `Stages vacances` |

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
depuis la page Contact, par un visiteur ayant accepté la catégorie « Publicité
et suivi des campagnes », arrivé d'abord par une annonce Facebook (`first`) puis
revenu par une annonce Google (`last`) :

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
      "date": "2026-09-28T14:33:02.044Z"
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
      "date": "2026-09-28T14:33:02.767Z"
    }
  },
  "recuLe": "2026-09-28T14:33:06.080Z"
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
   `nom`, `ageEnfant`, `creneau` et les 5 clés d'`utm` compris), une seule
   demande de test suffit.
2. Rattacher ces champs aux champs du CRM, par exemple :

| Webhook | Donnée CRM |
|---|---|
| `activite` | Activité qui intéresse le prospect. |
| `source`, `page` | Formulaire et page d'origine de la demande. |
| `attribution.first.utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` | Source, support, campagne, contenu et mot-clé du premier contact. |
| `attribution.first.referrer`, `landing_page`, `date` | Site référent, page d'entrée et date du premier contact. |
| `attribution.first.gclid`, `fbclid` | Identifiants de clic du premier contact (Google Ads, Meta). |
| `attribution.last.*` | Mêmes informations pour la dernière source avant la demande. |

3. Le champ `utm` garde ses 5 clés, désormais toujours présentes (vides si non
   renseignées) : le mapping existant continue de fonctionner.
