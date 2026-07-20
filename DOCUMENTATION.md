# Documentation — Site Kids Sport Club (`kidsportclub.fr`)

> Document de référence technique et fonctionnel du projet.
> Dernière mise à jour : 2026-07-03.
> Statut : **projet actif**. Site construit, déployé en preview sur Vercel. En attente d'éléments client pour la mise en prod réelle.

---

## 1. Présentation

**Kids Sport Club (KSC)** est une marque dérivée de *Kid Fitness*, positionnée comme un **club** (appartenance, communauté) et non une « salle de sport ». Activités physiques et sportives pour enfants de **10 mois à 14 ans**, basées sur la **psychomotricité** et l'apprentissage moteur. Club unique à **Rochecorbon (37)**, près de Tours.

Le site cible **les parents** (rassurer, donner envie, convertir) avec trois objectifs : inscriptions en ligne (via **Bodylink**), notoriété de marque, et **SEO local fort**.

- **Client / interlocuteur** : Victor Lucien-Brun (brief) ; Bastien (contenus terrain, côté Beauregard).
- **Développeur** : Mahmoud (DGL Agency), dev solo sur son propre GitHub.
- **Repo GitHub** : `https://github.com/mahmoudel24rb-debug/refontekidfitness` (branche `main`).
- **Hébergement** : Vercel (déploiement auto à chaque push sur `main`).
- **Domaine cible (prod)** : `kidsportclub.fr` (pas encore pointé).
- **Origine** : port du template Framer **« Kinderly »**, recolorisé charte KSC, contenu FR.

> Le brief client complet est reproduit **en annexe (§10)** de ce document.

---

## 2. Stack technique

| Élément | Choix | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.9 |
| Runtime UI | React / React DOM | 19.2.4 |
| CMS | **Aucun** (full code, statique/SSG) | — |
| Images | `sharp` (hors runtime, scripts de conversion webp / détourage) | — |
| Langage | TypeScript | ^5 |
| Lint | ESLint + `eslint-config-next` | 16.2.9 |

**Décision de stack** : contrairement au socle habituel de l'agence (WordPress + Oxygen, évoqué au brief §7), on a retenu **Next.js en full code sans CMS** — même socle que Beauregard, aligné avec le choix de Mahmoud « on commence en full code sans CMS et on ajoute plus tard ». Perf/Core Web Vitals au top, mobile-first, statique. Un CMS pourra être ajouté ultérieurement si le besoin d'édition client apparaît.

### Config notable (`next.config.ts`)
- `typescript.ignoreBuildErrors: true` : **obligatoire**. Le port Kinderly est du markup vendored avec du CSS Framer non-standard (`cornerShape`, variables `--framer-*`). Le code métier écrit à la main reste vérifié dans l'éditeur.
- `redirects()` : redirections 301 des anciennes routes Kinderly (EN) vers la nouvelle arborescence FR (voir §4).
- Build : on utilise `NODE_OPTIONS=--max-old-space-size=10240` (heap 10 Go) car le port Framer est lourd.

---

## 3. Structure du dépôt

```
kidfitness/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx             ← metadata globale, JSON-LD LocalBusiness, OG, SvgSprite
│  │  ├─ page.tsx               ← Accueil (metadata dédiée)
│  │  ├─ overrides.css          ← surcharges CSS (logo, etc.)
│  │  ├─ sitemap.ts             ← sitemap.xml (pages + articles, hors landings)
│  │  ├─ robots.ts              ← robots.txt
│  │  ├─ qui-sommes-nous/
│  │  ├─ nos-prestations/       ← hub + [slug] (7 prestations)
│  │  ├─ faq/
│  │  ├─ contact/
│  │  ├─ seance-essai/
│  │  ├─ blog/                  ← index + [slug] (4 articles)
│  │  ├─ landing/[slug]/        ← gabarit landing (hors menu, noindex)
│  │  ├─ mentions-legales/  confidentialite/  cookies/  cgv/
│  ├─ components/
│  │  ├─ HomePage.tsx           ← port Framer de l'accueil (chrome unifié KSC)
│  │  ├─ SvgSprite.tsx          ← sprite SVG extrait du rendu Kinderly
│  │  └─ ksc/                   ← composants métier (React propre, charte KSC)
│  │     ├─ SiteHeader.tsx  SiteFooter.tsx   ← chrome partagé
│  │     ├─ InscriptionCTA.tsx  ← CTA S'inscrire (placeholder Bodylink)
│  │     ├─ prestations.ts  Prestation.tsx  PrestationsHub.tsx
│  │     ├─ QuiSommesNous.tsx  Faq.tsx  SeanceEssai.tsx  ContactKSC.tsx
│  │     ├─ articles.ts  BlogKSC.tsx  Article.tsx  ActusHome.tsx
│  │     ├─ landings.ts  Landing.tsx
│  │     └─ legal.ts  LegalPage.tsx
│  └─ components/framer.css     ← CSS SSR Framer (importé une fois)
├─ public/
│  ├─ assets/ksc/               ← images webp (hero détouré, prestations, articles…)
│  ├─ assets/ksc-logo.png
│  └─ og.png                    ← image Open Graph 1200x630
├─ next.config.ts
└─ package.json
```

### Documents de projet
- `CONTENU-REEL-KSC.md` — coordonnées et activités réelles (source de vérité).
- `QUESTIONNAIRE-KSC.xlsx` — questionnaire interactif de ce qu'on attend du client.
- `../brief-kidsportclub.md` — brief client d'origine (reproduit en §10).

---

## 4. Arborescence & pages

Arborescence conforme au brief (§3) :

```
Accueil                       /
Qui sommes-nous               /qui-sommes-nous
Nos prestations (hub)         /nos-prestations
 ├─ Garderie                  /nos-prestations/garderie
 ├─ Stages vacances           /nos-prestations/stages-vacances
 ├─ Anniversaire              /nos-prestations/anniversaire
 ├─ Cours 10–36 mois          /nos-prestations/cours-10-36-mois
 ├─ Cours 3–5 ans             /nos-prestations/cours-3-5-ans
 ├─ Cours 6–10 ans            /nos-prestations/cours-6-10-ans
 └─ Cours 11–14 ans           /nos-prestations/cours-11-14-ans
FAQ                           /faq
Contact                       /contact
Séance d'essai                /seance-essai
Blog / Actualités             /blog  (+ /blog/[slug] ×4)
Légales                       /mentions-legales /confidentialite /cookies /cgv
Landings (hors menu)          /landing/[slug]   (noindex, hors sitemap)
```

**Redirections 301** (anciennes routes Kinderly → nouvelles) définies dans `next.config.ts` :
`/about-us→/qui-sommes-nous`, `/programs→/nos-prestations`, `/admission→/nos-prestations`, `/parent-resources→/faq`, `/fees-breakdown→/nos-prestations`, `/gallery→/nos-prestations`, `/testimonials→/`, `/book-a-tour→/seance-essai`, `/privacy-policy→/confidentialite`.

### Contenu réel (cf. `CONTENU-REEL-KSC.md`)
- **Adresse** : 1 Quai de la Loire, 37210 Rochecorbon
- **Téléphone** : 02 47 44 41 43
- **Email** : kidfitnessrochecorbon@gmail.com
- **Horaires** : Lun–Ven 9h30–12h30 et 16h00–19h30 · Samedi 9h30–17h30

---

## 5. Points techniques clés

### Chrome partagé
Toutes les pages « propres » partagent `SiteHeader` + `SiteFooter` (charte KSC : crème `#fbf9f0`, marine `#081646`, magenta `#e6007e`). L'accueil est le **port Framer** (`HomePage.tsx`) dans lequel le header/footer inline a été remplacé par ces composants pour unifier le chrome.

### Bodylink (inscription en ligne) — PLACEHOLDER
Le point structurant du brief (§5). Pour la version preview (GitHub/Vercel), les boutons « S'inscrire » sont **inertes** : ils pointent vers `/contact` et n'envoient rien.
- Composant central unique : `src/components/ksc/InscriptionCTA.tsx`.
- Constante `BODYLINK_URL = '/contact'` : **le seul endroit à modifier** pour brancher le vrai Bodylink en prod (URL / iframe / modale selon la mécanique retenue avec le client).
- Le hero de l'accueil a aussi un CTA marqué `data-bodylink="placeholder"`.

### SEO
- `generateMetadata` (title/description uniques) sur **toutes** les pages + metadata dédiée sur l'accueil.
- **Données structurées** : `LocalBusiness` (SportsActivityLocation, NAP + horaires) dans le layout ; `FAQPage` sur la FAQ ; `BreadcrumbList` + `Service` (areaServed Rochecorbon) sur les 7 sous-pages ; `BreadcrumbList` + `ItemList` sur le hub.
  - Note : le schéma `Event` (stages/anniversaire) sera ajouté **quand le client fournira de vraies dates** (un Event sans dates est invalide).
- `sitemap.ts` (pages + 4 articles, **landings exclues**) + `robots.ts`.
- **Open Graph** : `public/og.png` (1200×630, charte + logo) branché OG + Twitter card sur tout le site.
- Maillage interne : hub ↔ sous-pages ↔ blog ; bandeau actus sur l'accueil.
- Zone SEO : **Rochecorbon** (mono-ville), variantes Tours / 37 en secondaire.

### Gabarit Landing réutilisable (brief §3)
- Route `/landing/[slug]`, **hors menu**, **noindex**, **hors sitemap** (pour ne pas cannibaliser le SEO).
- Composant `Landing.tsx` orienté conversion : barre de marque minimale (pas de nav), hero, bandeau réassurance, bénéfices, preuve sociale, CTA final, pied légal.
- Données dans `landings.ts`. **2 exemples livrés** : `/landing/anniversaire-sportif`, `/landing/stage-vacances`. Créer une nouvelle landing = ajouter une entrée dans `landings.ts`.

### Détourage d'images (hero)
Les images IA fournies par le client sont détourées avec un script `sharp` maison (region-growing sur le fond + masque « brun-sombre » limité aux pixels connectés au bord, dilation + feather). Le hero (`public/assets/ksc/hero.webp`) est un PNG/webp à fond transparent qui « flotte » sur le crème avec les décorations du template (avion, étoiles). L'`objectFit` du hero est `contain` (sujet vertical entier, non recadré).
> Pour un rendu parfait, préférer des images générées **directement en fond transparent** (ou fond blanc uni sans glow) : le détourage est alors net.

### Port Framer (méthode)
Même méthode que Beauregard (voir la doc Beauregard) : `framer-port.mjs` (node-html-parser) → JSX fidèle ; nettoyage CSS + denylist `FRAMER_JUNK` ; sprite SVG extrait du rendu live (Playwright) rendu une fois dans le layout ; traduction FR ligne-par-ligne.

---

## 6. Déploiement

### Développement local
```bash
npm install
npm run dev          # http://localhost:3000
```

### Build de production
```bash
# heap élargi recommandé (port Framer lourd)
NODE_OPTIONS=--max-old-space-size=10240 npm run build
npm run start        # sert le build
```

### Variables d'environnement
Le site est **statique, sans base de données ni secret**. Une seule variable optionnelle :
| Variable | Rôle | Défaut |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique utilisée par le sitemap, les canoniques et le JSON-LD | `https://kidsportclub.fr` |

### Vercel
- Déploiement **automatique** à chaque push sur `main` → URL de preview `refontekidfitness.vercel.app`.
- Mise en prod : pointer le domaine `kidsportclub.fr` sur Vercel + définir `NEXT_PUBLIC_SITE_URL`.

---

## 7. Historique des sessions (ce qui a été fait)

- **Port du template Kinderly** → Next.js 16 (accueil + gabarits), recolorisation **charte KSC**, intégration du **logo KSC** (correction pixelisation/taille).
- **Nouvelle arborescence** conforme au brief : hub « Nos prestations » + **7 sous-pages** (gabarit unique), FAQ, Contact, Séance d'essai, Blog + 4 articles, 4 pages légales (dont **CGV**). Redirections 301 des anciennes routes.
- **Contenu FR** rédigé (orienté parents) : 7 prestations, Qui sommes-nous (pédagogie psychomotricité), FAQ, 4 articles de cluster éditorial. Tranches d'âge alignées sur le brief (10–36 mois / 3–5 / 6–10 / 11–14 ans).
- **Bodylink placeholder** (`InscriptionCTA`) centralisé.
- **SEO technique** : metadata par page, sitemap, robots, JSON-LD (LocalBusiness, FAQPage, Breadcrumb, Service), maillage interne.
- **Contact** : coordonnées, formulaire placeholder, carte Google Rochecorbon.
- **Images stagiaire** analysées (18 exploitables, 1 rejetée car marquée d'un concurrent « Helen Doron ») ; intégrées sur Qui-sommes-nous, blog, prestations.
- **Correctifs** : hero recadré puis **détouré** (enfant qui saute, flotte sur le crème) ; sous-menu « Nos prestations » qui se fermait au survol (pont transparent) ; grilles à 4 blocs (Qui-sommes-nous, Blog) passées en **2×2 équilibré**.
- **Lot technique brief** : gabarit **Landing** réutilisable, metadata accueil dédiée, schémas Breadcrumb/Service, articles dans le sitemap, **bandeau actus** sur l'accueil, **double CTA hero** (S'inscrire / Séance d'essai), **image OG**, accessibilité (alt).
- **Livrables** : questionnaire Excel interactif (`QUESTIONNAIRE-KSC.xlsx`), audit de contenu / debrief client.

---

## 8. Reste à faire

**En attente du client (placeholders en attendant)**
- **Bodylink** : produits vendus en ligne, tarifs, mécanique panier→paiement → pour brancher le CTA.
- **Prix réels** (aujourd'hui « nous consulter »).
- **Vrais avis parents**, **équipe** (noms/photos/bios), **photos réelles** du club.
- **Séance d'essai** : gratuite ? formulaire ou Bodylink ? (à trancher).
- **Validation juridique** CGV / mentions.
- Confirmations : marque **« Kid » vs « Kids »**, âge plancher **10 mois vs 3 mois**, zone SEO.

**À la mise en prod (pas sur la preview)**
- Bodylink réel · tracking **GTM/GA4** + events conversion · **RGPD** (bandeau cookies/consentement) · domaine `kidsportclub.fr` · **Google Business Profile** (cohérence NAP).
- Schéma `Event` (stages/anniversaire) dès que des dates réelles existent.

**Livrable attendu par Victor (brief §8)**
Le brief demandait d'abord un **document plan** (arborescence + wireframes, plan contenu, plan SEO avec volumes, schéma Bodylink, rétroplanning, répartition) à valider avant production. Le site a été construit en avance ; il reste à formaliser ce document plan / point d'étape à renvoyer à Victor.

---

## 9. Règles de projet importantes

- **Pas d'emojis** — ni dans le site, ni dans les livrables : icônes SVG uniquement.
- **Ne rien inventer** — s'aligner sur `CONTENU-REEL-KSC.md`.
- **Bodylink** reste un placeholder inerte (`BODYLINK_URL='/contact'`) jusqu'à la vraie prod.
- **Image rejetée** : ne pas utiliser `6-10 ans 2.jpg` (branding concurrent Helen Doron). Attention au droit à l'image / licence des visuels fournis.

---

## 10. Annexe — Brief client complet

> Reproduction intégrale du brief initial (`brief-kidsportclub.md`), demandé par Victor Lucien-Brun le 26/06/2026.

### Brief projet — Site web `kidsportclub.fr`

| | |
|---|---|
| **Marque** | Kids Sport Club (KSC) |
| **Demandeur** | Victor Lucien-Brun |
| **Date** | 26/06/2026 |
| **Statut** | Brief initial → en attente du plan de l'équipe |

#### 0. Ce que je veux récupérer (à lire en premier)
Ceci est **l'input**. Je n'attends pas que vous lanciez la prod, mais que vous me renvoyiez **un plan propre et structuré** (voir §8) :
- Arborescence validée + wireframes
- Plan de contenu
- Plan SEO
- Plan technique (notamment l'intégration **Bodylink**)
- Rétroplanning
- Répartition des tâches

> **On valide le plan ensemble avant de produire quoi que ce soit.**

#### 1. Contexte & positionnement
**Kids Sport Club** est une marque dérivée de *Kid Fitness*, mais avec une promesse différente : on ne vend pas une « salle de sport » (bénéfice fonctionnel, individuel), on vend un **club** — de l'appartenance, une communauté, un endroit où l'enfant a sa carte de membre et ses copains.

Le mot « **Sport** » (vs « Fitness ») assume le **multi-activités** : motricité, jeux collectifs, stages, anniversaires.

- **Concept** : activités physiques & sportives pour enfants de **10 mois à 14 ans**, basées sur la **psychomotricité** et l'**apprentissage moteur**, dans un cadre ludique et sécurisé.
- **Cible du site** : d'abord les **parents** (rassurer, donner envie, faire convertir), tout en parlant à l'enfant via l'univers visuel.

**Objectifs du site**
1. **Générer des inscriptions en ligne** (via Bodylink) et des demandes de séance d'essai.
2. **Construire la notoriété** de marque KSC.
3. **SEO local fort** sur les requêtes parents (cours, garderie, anniversaire, stages).

#### 2. Charte graphique
> **Source de vérité = la charte reçue par mail.** À appliquer scrupuleusement : couleurs, typographies, logo, déclinaisons.

#### 3. Arborescence cible
```
Accueil
Qui sommes-nous
Nos prestations (page pilier / hub)
 ├─ Garderie
 ├─ Stages vacances
 ├─ Anniversaire
 ├─ Cours 10–36 mois
 ├─ Cours 3–5 ans
 ├─ Cours 6–10 ans
 └─ Cours 11–14 ans
FAQ
Contact
Séance d'essai (optionnelle — à cadrer)
Blog / Actualités (+ articles)
———
Landing pages (production au fil de l'eau, hors menu, gabarit dédié)
Pages légales : Mentions légales · Confidentialité · Cookies · CGV
```
**Notes importantes**
- Les **7 sous-pages de prestations** sont des **pages à part entière** (contenu + SEO propres), reliées à la page pilier « Nos prestations » par un **maillage interne fort**.
- **Landings** : prévoir **dès le départ un gabarit réutilisable** (campagnes Meta/Google Ads, événements, offres), pour pouvoir en sortir vite sans rebricoler à chaque fois.
- **Pages légales** : obligatoires dès lors qu'on fait de la vente en ligne (**CGV** notamment) — à ne pas oublier dans le périmètre.

#### 4. Spécifications par page (intention + blocs clés)
| Page | Rôle | Blocs / contenu attendus |
|---|---|---|
| **Accueil** | Convertir + orienter | Hero (promesse + slogan + double CTA *S'inscrire* / *Séance d'essai*), aperçu des prestations, tranches d'âge, preuve sociale (avis parents), réassurance (sécurité, encadrement), bandeau actus, footer riche |
| **Qui sommes-nous** | Confiance / E-E-A-T | Histoire & valeurs du club, pédagogie (psychomotricité), équipe/coachs, les locaux, engagement sécurité |
| **Nos prestations** (hub) | Aiguillage SEO | Présentation synthétique des 7 offres + accès vers chaque sous-page, CTA |
| **Garderie** | Offre | Principe, créneaux, âges, tarifs/modalités, CTA inscription Bodylink |
| **Stages vacances** | Offre | Thèmes, périodes (mercredis/vacances), âges, horaires, tarifs, CTA inscription |
| **Anniversaire** | Offre / lead | Formule(s), durée, capacité, ce qui est inclus, galerie, CTA demande/réservation |
| **Cours 10–36 mois** | Offre | Éveil moteur/baby gym, déroulé d'une séance, bénéfices, créneaux, CTA |
| **Cours 3–5 ans** | Offre | Éveil sportif, activités, bénéfices, créneaux, CTA |
| **Cours 6–10 ans** | Offre | Multisports, activités, bénéfices, créneaux, CTA |
| **Cours 11–14 ans** | Offre | Sport ado (cross/cardio/boxing…), activités, bénéfices, créneaux, CTA |
| **FAQ** | Lever les freins + SEO | Questions parents (âge de début, essai, tarifs, sécurité, remboursement…) → schema **FAQPage** |
| **Contact** | Joindre / venir | Formulaire, coordonnées, horaires, carte, lien Google Business Profile |
| **Séance d'essai** (option) | Lead | Pitch « essai gratuit/découverte », formulaire ou réservation Bodylink |
| **Blog / Actualités** | SEO + animation | Articles éditoriaux (cf. §6) + news du club |

#### 5. Inscription & vente en ligne (Bodylink)
> **C'est le point structurant du projet.**
- Le bouton « **S'inscrire** » doit être relié via **Bodylink**, le module de vente en ligne (parcours d'achat / adhésion / paiement).
- **À cadrer avec l'équipe** : quels produits sont vendus en ligne ? (cours à l'année, stages, garderie, anniversaire ?) ; structure d'offres et tarifs ; mécanique du parcours : sélection → panier → paiement → confirmation.
- CTA « **S'inscrire** » présents sur **chaque page de prestation + accueil**.
- La **séance d'essai** passe soit par un **formulaire** (lead), soit par **Bodylink** si on la « commercialise » — **à trancher**.
- **Vérifier la compatibilité Bodylink** avec le stack retenu : ça peut conditionner le choix technique (cf. §7).

#### 6. SEO — full SEO sur mots-clés cohérents
**Objectif** : SEO local orienté **intention parent**. Chaque page = **une intention principale + 1 mot-clé focus + variantes**.
> ⚠️ **À préciser** : la/les **ville(s)** et la **zone de chalandise**. Remplacer `[VILLE]` par la zone réelle. *(Tranché : Rochecorbon, mono-ville, variantes Tours/37.)*

| Page | Intention | Mots-clés cibles (exemples) |
|---|---|---|
| **Accueil** | Marque + local | `club de sport enfant [VILLE]`, `activités sportives enfants [VILLE]`, `kids sport club` |
| **Nos prestations** | Hub local | `activités enfants [VILLE]`, `sport enfant [VILLE]` |
| **Garderie** | Local | `garderie [VILLE]`, `halte-garderie [VILLE]`, `garde d'enfants ponctuelle [VILLE]` |
| **Stages vacances** | Local saisonnier | `stage vacances enfant [VILLE]`, `stage sportif enfant [VILLE]` |
| **Anniversaire** | Local fort intent | `anniversaire enfant [VILLE]`, `anniversaire sportif [VILLE]`, `salle anniversaire enfant [VILLE]` |
| **Cours 10–36 mois** | Local | `baby gym [VILLE]`, `éveil moteur bébé [VILLE]`, `activité bébé [VILLE]` |
| **Cours 3–5 ans** | Local | `éveil sportif 3-5 ans [VILLE]`, `activité sportive maternelle [VILLE]` |
| **Cours 6–10 ans** | Local | `multisports enfant [VILLE]`, `cours de sport enfant [VILLE]` |
| **Cours 11–14 ans** | Local | `sport ado [VILLE]`, `activité sportive collégien [VILLE]` |
| **FAQ** | Longue traîne | `à quel âge commencer le sport bébé`, etc. |
| **Blog** | Informationnel → cluster | cf. ci-dessous |

**Exigences SEO transverses**
- Title / meta description / structure Hn propres et uniques par page.
- Maillage interne : pilier « Nos prestations » ↔ sous-pages ↔ blog.
- Données structurées : `LocalBusiness` (NAP + horaires), `FAQPage`, `BreadcrumbList`, `Event` (stages/anniversaires) si pertinent.
- Performance / Core Web Vitals + mobile-first (cible = parents sur mobile).
- URLs propres, `sitemap.xml`, `robots.txt`, balises canoniques, Open Graph.
- Google Business Profile à connecter (cohérence NAP).

**Blog / Actualités — pistes de cluster éditorial**
- « À quel âge faire faire du sport à son enfant ? »
- « Les bienfaits de la motricité chez le tout-petit »
- « Idées d'anniversaire sportif pour enfant »
- « Que faire des enfants pendant les vacances scolaires ? »
- Actus du club (nouveaux créneaux, événements, portes ouvertes…).

#### 7. Technique & intégrations
- **Stack** : à proposer par l'équipe. Par défaut socle habituel (**WordPress + Oxygen**), **sauf si** la compatibilité Bodylink ou la perf imposent un autre choix. *(Tranché : Next.js full code, cf. §2.)*
- **Tracking** : GTM + GA4 + événements de conversion (clic inscription, lead séance d'essai, demande anniversaire, soumission contact).
- **RGPD** : bandeau cookies / consentement, page confidentialité, formulaires conformes.
- **Multilingue ?** à confirmer (a priori **FR uniquement**).
- **Responsive / mobile-first** prioritaire.
- **Accessibilité** raisonnable (contrastes, alt, navigation clavier).

#### 8. Plan attendu de l'équipe (le livrable de cette étape)
1. **Arborescence validée + wireframes** (au moins accueil + gabarit page prestation + gabarit landing).
2. **Plan de contenu** : qui rédige quoi, ce qui est fourni vs à produire, besoins photo/vidéo.
3. **Plan SEO** : recherche de mots-clés finalisée (volumes), mapping mot-clé ⇄ page validé, plan éditorial blog.
4. **Plan technique** : stack retenu + schéma d'intégration Bodylink (produits, parcours, paiement), tracking, RGPD.
5. **Rétroplanning** avec jalons (maquette → intégration → contenu → SEO → recette → mise en ligne).
6. **Répartition des tâches** (qui fait quoi) + estimation de charge / délais.

#### Points en suspens à trancher (récap pour décision)
- [ ] **Zone géographique** : une ou plusieurs villes ? Marque nationale ? *(Tranché : Rochecorbon mono-ville.)*
- [ ] **Produits vendus en ligne via Bodylink** : cours à l'année / stages / garderie / anniversaire ?
- [ ] **Séance d'essai** : formulaire (lead) ou réservation Bodylink ?
- [ ] **Stack** : WordPress + Oxygen par défaut, ou autre choix ? *(Tranché : Next.js full code.)*
- [ ] **Page « Séance d'essai »** : à conserver ou non dans l'arbo ? *(Conservée.)*
- [ ] **Multilingue** : FR uniquement confirmé ?
