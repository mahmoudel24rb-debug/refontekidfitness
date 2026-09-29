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

// Traceurs réels du site (src/lib/attribution.ts, src/lib/envoiLead.ts, conteneur
// GTM) : texte factuel à faire valider par le client. ` ` : espace insécable
// (avant les deux-points, dans les guillemets, entre un nombre et son unité).
export const COOKIES: LegalContent = {
  titre: 'Gestion des cookies',
  intro:
    'Cette page présente les cookies et traceurs utilisés sur le site kidsportclub.fr, leur finalité et leur durée de conservation.',
  sections: [
    {
      h: 'Source de votre visite',
      p: 'ksc_attribution : mémorise la source de votre première visite et celle de votre visite la plus récente (paramètres des liens publicitaires, identifiants de clic Google Ads et Meta, site d’origine, page d’entrée, date). Ces informations sont transmises avec vos demandes de contact pour mesurer l’efficacité de nos campagnes. Durée : 90 jours, prolongée à chaque nouvelle visite issue d’une campagne ou d’un autre site.',
    },
    {
      h: 'Mesure d’audience',
      p: 'Google Analytics, chargé par l’intermédiaire de Google Tag Manager, dépose les cookies _ga et _ga_VB7RJBHMRZ. Ils établissent des statistiques de visite (pages consultées, provenance des visites) qui nous aident à améliorer le site. Durée : jusqu’à 2 ans, définie par Google.',
    },
    {
      h: 'Publicité Meta',
      p: 'Le pixel Meta (Facebook, Instagram), chargé par l’intermédiaire de Google Tag Manager, dépose le cookie _fbp (et _fbc si vous arrivez par un lien Facebook ou Instagram) et enregistre des informations dans le stockage local de votre navigateur, pour mesurer les résultats de nos publicités. Durée : 90 jours.\nksc_vid : identifiant aléatoire déposé à l’envoi d’un formulaire et transmis à Meta sous forme hachée avec votre demande, pour améliorer la mesure de nos publicités. Durée : 395 jours.',
    },
    {
      h: 'Carte Google Maps',
      p: 'Les pages qui affichent notre plan d’accès intègrent une carte Google Maps. Google peut alors déposer ses propres cookies, selon ses règles.',
    },
    {
      h: 'Bandeau d’information',
      p: 'Le bandeau affiché lors de votre première visite présente ces cookies. Le bouton « J’ai compris » le ferme : ce choix est mémorisé dans le stockage local de votre navigateur (ksc_bandeau_cookies), sans cookie, pour ne plus l’afficher.',
    },
    {
      h: 'Supprimer les cookies',
      p: 'Vous pouvez supprimer à tout moment les cookies et le stockage local du site depuis les réglages de votre navigateur.',
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
