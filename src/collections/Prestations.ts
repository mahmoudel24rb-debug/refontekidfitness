import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Les activités du club (« Nos activités »). Une fiche = une page
// /nos-prestations/[slug] + une carte dans la mosaïque du hub, le footer et les
// landings. Source de secours : src/data/prestations.ts.
export const Prestations: CollectionConfig = {
  slug: 'prestations',
  labels: { singular: 'Activité', plural: 'Activités' },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'age', 'prix', 'ordre'],
    group: 'Contenu',
    description:
      'Fiches activités : mercredis sportifs, stages, anniversaire, cours par tranche d’âge.',
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    {
      name: 'slug',
      label: 'Slug (URL)',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Ex. : cours-3-5-ans → /nos-prestations/cours-3-5-ans. Ne pas modifier une fois la page en ligne.',
      },
    },
    {
      name: 'age',
      label: 'Tranche d’âge',
      type: 'text',
      required: true,
      admin: { description: 'Affichée en pastille sur l’image. Ex. : « 3 – 5 ans », « Tous âges ».' },
    },
    {
      name: 'accroche',
      label: 'Accroche',
      type: 'text',
      required: true,
      admin: { description: 'Une phrase, reprise sous le titre du hero et sur les cartes.' },
    },
    {
      name: 'intro',
      label: 'Le principe',
      type: 'textarea',
      required: true,
      admin: { description: 'Paragraphe de présentation (bloc « Le principe » de la fiche).' },
    },
    {
      name: 'benefices',
      label: 'Les bénéfices',
      type: 'array',
      labels: { singular: 'Bénéfice', plural: 'Bénéfices' },
      minRows: 1,
      admin: { description: 'Liste à puces cochées de la fiche (3 ou 4 lignes courtes).' },
      fields: [{ name: 'texte', label: 'Texte', type: 'text', required: true }],
    },
    {
      name: 'prix',
      label: 'Prix affiché',
      type: 'text',
      required: true,
      admin: { description: 'Ex. : « 95 €/mois », « À partir de 29,90 €/mois ».' },
    },
    {
      name: 'creneauxTexte',
      label: 'Créneaux (texte)',
      type: 'text',
      required: true,
      admin: {
        description:
          'Phrase du bloc « Créneaux ». Si elle contient « voir le planning », ces mots deviennent un lien vers /planning.',
      },
    },
    {
      name: 'motCle',
      label: 'Mot-clé SEO',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Utilisé dans la meta description et les données structurées de la fiche.',
      },
    },
    {
      name: 'image',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optionnelle : sans photo, le visuel actuel du site est conservé.' },
    },
    {
      name: 'ordre',
      label: 'Ordre d’affichage',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Ordre dans la mosaïque, le footer et le sitemap.' },
    },
  ],
}
