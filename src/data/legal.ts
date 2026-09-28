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

export const COOKIES: LegalContent = {
  titre: 'Gestion des cookies',
  intro: "Ce site utilise des cookies pour son bon fonctionnement et, à terme, pour la mesure d'audience.",
  sections: [
    { h: 'Cookies utilisés', p: "Cookies techniques nécessaires au fonctionnement du site. Des cookies de mesure d'audience (statistiques) pourront être ajoutés à la mise en ligne, soumis à votre consentement." },
    { h: 'Votre consentement', p: "Un bandeau de consentement sera affiché à la mise en production : vous pourrez accepter ou refuser les cookies non essentiels." },
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
