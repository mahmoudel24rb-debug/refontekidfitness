import { COORDONNEES } from './site'

// Type des contenus légaux (consommé par components/ksc/LegalPage.tsx).
export type LegalContent = { titre: string; intro?: string; sections: { h: string; p: string }[] }

// Contenus légaux PLACEHOLDER (à compléter/valider par le client). NAP : Kid Sport
// Club, 1 Quai de la Loire, 37210 Rochecorbon. Téléphone et email ne sont JAMAIS
// écrits en dur ici : ils viennent de COORDONNEES (src/data/site.ts), source unique.
export const MENTIONS_LEGALES: LegalContent = {
  titre: 'Mentions légales',
  sections: [
    // Éditeur : SAS Parc Beauregard (récap client). Pas de responsable de publication
    // nommé publiquement — le client ne veut pas de nom : « le représentant légal de la société ».
    { h: 'Éditeur du site', p: `Kid Sport Club, un établissement de la SAS Parc Beauregard\nSIREN : 932 593 452\n${COORDONNEES.adresse}\nTéléphone : ${COORDONNEES.telephone}\nEmail : ${COORDONNEES.email}\nDirecteur de la publication : le représentant légal de la société.` },
    { h: 'Hébergement', p: "Site hébergé par Hostinger International Ltd, 61 Lordou Vironos Street, 6023 Larnaca, Chypre." },
    { h: 'Propriété intellectuelle', p: "L'ensemble des contenus de ce site (textes, visuels, logo) est la propriété de Kid Sport Club, sauf mention contraire. Toute reproduction est interdite sans autorisation." },
  ],
}

export const CONFIDENTIALITE: LegalContent = {
  titre: 'Politique de confidentialité',
  intro: "Cette page décrit comment Kid Sport Club collecte et traite vos données personnelles, conformément au RGPD.",
  sections: [
    { h: 'Données collectées', p: "Via les formulaires (contact, séance d'essai) : nom, prénom, email, téléphone et informations que vous nous communiquez. Ces données servent uniquement à traiter votre demande." },
    { h: 'Conservation', p: "Vos données sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées conformément à la réglementation." },
    { h: 'Vos droits', p: `Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer : ${COORDONNEES.email}.` },
  ],
}

// Traceurs réels du site (bandeau de consentement, src/lib/consentement.ts) :
// texte factuel à faire valider par le client. ` ` : espace insécable
// (avant les deux-points, dans les guillemets, entre un nombre et son unité).
export const COOKIES: LegalContent = {
  titre: 'Gestion des cookies',
  intro:
    'Cette page présente les cookies et traceurs utilisés sur le site kidsportclub.fr, leur finalité, leur durée de conservation et la façon de modifier votre choix.',
  sections: [
    {
      h: 'Votre choix',
      p: 'Lors de votre première visite, un bandeau vous permet d’accepter ou de refuser les cookies non nécessaires, ou de choisir catégorie par catégorie. Refuser est aussi simple qu’accepter, et aucun cookie non nécessaire n’est déposé sans votre accord.\nVotre choix, accord comme refus, est conservé 6 mois. À l’issue de ce délai, ou si la liste des traceurs change, le bandeau vous est de nouveau proposé.',
    },
    {
      h: 'Cookies nécessaires',
      p: 'ksc_consentement : mémorise votre choix sur les cookies (catégories acceptées ou refusées, date du choix). Durée : 6 mois. Indispensable au respect de votre choix, ce cookie ne peut pas être désactivé.',
    },
    {
      h: 'Mesure d’audience',
      p: 'Les traceurs de mesure d’audience de Google (Google Analytics), chargés par l’intermédiaire de Google Tag Manager, ne sont déposés qu’avec votre accord pour la catégorie « Mesure d’audience ». Ils établissent des statistiques de visite (pages consultées, provenance des visites) qui nous aident à améliorer le site. Leur durée de conservation est définie par Google.',
    },
    {
      h: 'Publicité et suivi des campagnes',
      p: 'Avec votre accord pour la catégorie « Publicité et suivi des campagnes » :\n- ksc_attribution : mémorise la source de vos visites (paramètres des liens publicitaires, site d’origine, page d’entrée, date), transmise avec vos demandes de contact pour mesurer l’efficacité de nos campagnes. Durée : 90 jours, prolongée à chaque nouvelle visite issue d’une campagne ou d’un autre site.\n- les traceurs publicitaires de Google (Google Ads) et de Meta (Facebook, Instagram), chargés par l’intermédiaire de Google Tag Manager, mesurent les résultats de nos publicités. Leur durée de conservation est définie par Google et par Meta.\nSans votre accord, le cookie ksc_attribution n’est pas déposé, et il est supprimé si vous retirez votre accord : la source de la visite en cours est seulement gardée en mémoire par la page et jointe à une demande envoyée par formulaire, sans rien enregistrer sur votre appareil.',
    },
    {
      h: 'Modifier votre choix',
      p: 'Vous pouvez modifier ou retirer votre choix à tout moment, aussi simplement que vous l’avez donné, grâce au lien « Gérer les cookies » en bas des pages du site ou au bouton ci-dessous. Vous pouvez aussi supprimer les cookies depuis les réglages de votre navigateur.',
    },
  ],
}

export const CGV: LegalContent = {
  titre: 'Conditions générales de vente',
  intro: "Les présentes CGV encadreront les inscriptions et achats en ligne (cours, stages, anniversaires) via le club.",
  sections: [
    { h: 'Objet', p: "Les CGV régissent les prestations proposées par Kid Sport Club et leurs modalités d'inscription et de paiement. [À finaliser avec les offres et tarifs définitifs.]" },
    { h: 'Inscriptions & paiement', p: "Les modalités d'inscription, de paiement en ligne et de remboursement seront précisées ici lors de l'activation de la vente en ligne." },
    { h: 'Annulation & rétractation', p: "Conditions d'annulation et droit de rétractation conformes à la réglementation en vigueur. [À compléter.]" },
  ],
}
