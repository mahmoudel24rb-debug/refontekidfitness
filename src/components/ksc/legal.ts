import type { LegalContent } from './LegalPage'

// Contenus légaux PLACEHOLDER (à compléter/valider par le client). NAP : Kid Sport
// Club, 1 Quai de la Loire, 37210 Rochecorbon — 02 47 44 41 43.
export const MENTIONS_LEGALES: LegalContent = {
  titre: 'Mentions légales',
  sections: [
    { h: 'Éditeur du site', p: "Kid Sport Club\n1 Quai de la Loire, 37210 Rochecorbon\nTéléphone : 02 47 44 41 43\nEmail : kidfitnessrochecorbon@gmail.com\n[Forme juridique, capital, SIRET, RCS, directeur de la publication — à compléter.]" },
    { h: 'Hébergement', p: "Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA." },
    { h: 'Propriété intellectuelle', p: "L'ensemble des contenus de ce site (textes, visuels, logo) est la propriété de Kid Sport Club, sauf mention contraire. Toute reproduction est interdite sans autorisation." },
  ],
}

export const CONFIDENTIALITE: LegalContent = {
  titre: 'Politique de confidentialité',
  intro: "Cette page décrit comment Kid Sport Club collecte et traite vos données personnelles, conformément au RGPD.",
  sections: [
    { h: 'Données collectées', p: "Via les formulaires (contact, séance d'essai) : nom, prénom, email, téléphone et informations que vous nous communiquez. Ces données servent uniquement à traiter votre demande." },
    { h: 'Conservation', p: "Vos données sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées conformément à la réglementation." },
    { h: 'Vos droits', p: "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer : kidfitnessrochecorbon@gmail.com." },
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
