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
      name: 'disciplines',
      label: 'Activités de la tranche',
      type: 'array',
      labels: { singular: 'Activité', plural: 'Activités' },
      admin: {
        description:
          'Uniquement pour les 4 cours par tranche d’âge : le détail des activités pratiquées. Chaque activité a sa propre page /nos-prestations/[cours]/[activité], une carte sur la fiche du cours et une entrée du sous-menu « Nos activités ».',
      },
      fields: [
        { name: 'nom', label: 'Nom', type: 'text', required: true },
        {
          name: 'slug',
          label: 'Slug (URL)',
          type: 'text',
          // Volontairement NON requis : le champ est additif sur une table déjà
          // peuplée (une colonne NOT NULL casserait la mise à jour du schéma).
          // Vide, le site recalcule le slug depuis le nom (même règle qu'avant).
          admin: {
            description:
              'Segment d’URL de la page de l’activité. Ex. : kid-gym-et-dance → /nos-prestations/cours-3-5-ans/kid-gym-et-dance. Laisser vide pour le déduire du nom. Ne pas modifier une fois la page en ligne.',
          },
        },
        {
          name: 'description',
          label: 'Accroche',
          type: 'textarea',
          required: true,
          admin: {
            description:
              'Résumé court : sous-titre du hero de la page de l’activité, texte de sa carte sur la fiche du cours.',
          },
        },
        {
          name: 'intro',
          label: 'Présentation',
          type: 'array',
          labels: { singular: 'Paragraphe', plural: 'Paragraphes' },
          admin: {
            description:
              'Corps de la page de l’activité : 2 paragraphes. Vide, le texte de src/data/prestations.ts est servi.',
          },
          fields: [{ name: 'texte', label: 'Texte', type: 'textarea', required: true }],
        },
        {
          name: 'benefices',
          label: 'Les bénéfices',
          type: 'array',
          labels: { singular: 'Bénéfice', plural: 'Bénéfices' },
          admin: { description: 'Liste à puces cochées de la page (3 à 5 lignes courtes).' },
          fields: [{ name: 'texte', label: 'Texte', type: 'text', required: true }],
        },
        {
          name: 'pourQui',
          label: 'Pour qui ?',
          type: 'textarea',
          admin: { description: 'Un paragraphe : à quels enfants cette activité s’adresse.' },
        },
      ],
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
