import type { CollectionConfig, Condition } from 'payload'

import { authenticated, publicRead } from '../access'

// Les activités du club (« Nos activités »). Une fiche = une page
// /nos-prestations/[slug] + une carte dans la mosaïque du hub, le footer et les
// landings. Source de secours : src/data/prestations.ts.
// Vocabulaire de l'admin : la collection = « Activités » (les 7 fiches), le
// tableau `disciplines` = « Cours de la tranche », le champ `activite` du
// planning = « Cours ».
//
// Fiche en onglets SANS `name` : purement visuels, les données restent à la
// racine du document (aucun champ déplacé en base). `row` et `collapsible`
// n'ont pas non plus d'effet sur les données.

const slugDe = (data: unknown): string => {
  const slug = (data as { slug?: unknown } | undefined)?.slug
  return typeof slug === 'string' ? slug : ''
}

// Onglet « Cours » : uniquement les 4 fiches de cours par tranche d'âge.
const estFicheCours: Condition = (data) => slugDe(data).startsWith('cours-')

// Onglet « Déroulé de la journée » : Mercredis Sportifs et Stages vacances.
const aUnDeroule: Condition = (data) => ['mercredis-sportifs', 'stages-vacances'].includes(slugDe(data))

export const Prestations: CollectionConfig = {
  slug: 'prestations',
  labels: { singular: 'Activité', plural: 'Activités' },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'age', 'prix', 'ordre'],
    listSearchableFields: ['titre'],
    pagination: { defaultLimit: 25 },
    group: 'Contenu du site',
    description:
      'Les 7 fiches du menu « Nos activités » : Mercredis Sportifs, stages, anniversaire et les 4 cours par tranche d’âge. Chaque fiche est une page du site.',
    hideAPIURL: true,
  },
  access: {
    read: publicRead,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Présentation',
          fields: [
            { name: 'titre', label: 'Titre', type: 'text', required: true },
            {
              type: 'row',
              fields: [
                {
                  name: 'age',
                  label: 'Tranche d’âge',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Affichée en pastille sur l’image. Ex. : « 3 – 5 ans », « Tous âges ».',
                  },
                },
                {
                  name: 'prix',
                  label: 'Prix affiché',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', description: 'Ex. : « 95 €/mois », « À partir de 29,90 €/mois ».' },
                },
              ],
            },
            {
              name: 'accroche',
              label: 'Accroche',
              type: 'text',
              required: true,
              admin: { description: 'Une phrase, reprise sous le titre en haut de la page et sur les cartes.' },
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
              name: 'creneauxTexte',
              label: 'Créneaux (texte)',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Phrase du bloc « Créneaux ». Si elle contient « voir le planning », ces mots deviennent un lien vers la page Planning.',
              },
            },
            {
              name: 'image',
              label: 'Photo',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Optionnelle : sans photo, le visuel actuel du site est conservé.' },
            },
          ],
        },
        {
          label: 'Cours',
          admin: { condition: estFicheCours },
          fields: [
            {
              name: 'disciplines',
              label: 'Cours de la tranche',
              type: 'array',
              labels: { singular: 'Cours', plural: 'Cours' },
              admin: {
                description:
                  'Les cours pratiqués dans cette tranche d’âge. Chaque cours a sa propre page, une carte sur la fiche de la tranche et une entrée dans le sous-menu « Nos activités » du site.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'nom', label: 'Nom', type: 'text', required: true, admin: { width: '70%' } },
                    {
                      name: 'duree',
                      label: 'Durée (minutes)',
                      type: 'number',
                      min: 15,
                      max: 600,
                      admin: {
                        width: '30%',
                        description:
                          'Durée d’une séance, affichée en pastille (« 45 min », « 1h ») sur la fiche de la tranche et sur la page du cours. Vide : aucune pastille.',
                      },
                    },
                  ],
                },
                {
                  name: 'description',
                  label: 'Accroche',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description:
                      'Résumé court : sous-titre en haut de la page du cours et texte de sa carte sur la fiche de la tranche.',
                  },
                },
                {
                  name: 'intro',
                  label: 'Présentation',
                  type: 'array',
                  labels: { singular: 'Paragraphe', plural: 'Paragraphes' },
                  admin: {
                    description:
                      'Texte de la page du cours, en 2 paragraphes. Vide : le texte actuel du site est conservé.',
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
                  admin: { description: 'Un paragraphe : à quels enfants ce cours s’adresse.' },
                },
                {
                  type: 'collapsible',
                  label: 'Avancé',
                  admin: { initCollapsed: true },
                  fields: [
                    {
                      name: 'slug',
                      label: 'Adresse de la page',
                      type: 'text',
                      // Volontairement NON requis : le champ est additif sur une table déjà
                      // peuplée (une colonne NOT NULL casserait la mise à jour du schéma).
                      // Vide, le site recalcule le slug depuis le nom (même règle qu'avant).
                      admin: {
                        description:
                          'Fin de l’adresse de la page du cours, après celle de la tranche. Ex. : gym-et-dance donne kidsportclub.fr/nos-prestations/cours-3-5-ans/gym-et-dance. Vide : elle est déduite du nom. Ne plus la modifier une fois la page en ligne.',
                      },
                    },
                    {
                      name: 'activitePlanning',
                      label: 'Nom dans le planning',
                      type: 'text',
                      admin: {
                        description:
                          'Nom du cours tel qu’il est écrit dans le planning, pour afficher ses horaires sur sa page. S’il porte plusieurs noms dans le planning, séparez-les par une barre verticale. Ex. : Pompom|Pompom Girl.',
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'noteDisciplines',
              label: 'Note sous les cours',
              type: 'text',
              admin: {
                description:
                  'Petite note affichée sous la grille des cours. Ex. : « *Multisports : football, rugby, basket… ».',
              },
            },
          ],
        },
        {
          label: 'Déroulé de la journée',
          admin: { condition: aUnDeroule },
          fields: [
            {
              name: 'derouleIntro',
              label: 'Phrase d’introduction',
              type: 'text',
              admin: {
                description:
                  'Optionnelle, affichée au-dessus des étapes. Ex. : « Même principe que les Mercredis Sportifs, avec un accueil dès 8h00. »',
              },
            },
            {
              name: 'deroule',
              label: 'Déroulé de la journée',
              type: 'array',
              labels: { singular: 'Étape', plural: 'Étapes' },
              admin: {
                description:
                  'Les étapes de la journée, dans l’ordre. Liste vide : la section n’est pas affichée sur la fiche.',
              },
              fields: [
                {
                  name: 'horaire',
                  label: 'Horaire',
                  type: 'text',
                  required: true,
                  admin: { description: 'Ex. : « 7h30 – 10h00 ».' },
                },
                { name: 'titre', label: 'Titre', type: 'text', required: true },
                { name: 'description', label: 'Description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'derouleNote',
              label: 'Note de fin',
              type: 'text',
              admin: { description: 'Phrase affichée sous les étapes, en italique.' },
            },
          ],
        },
        {
          label: 'Référencement',
          fields: [
            {
              name: 'slug',
              label: 'Adresse de la page',
              type: 'text',
              required: true,
              unique: true,
              admin: {
                description:
                  'Fin de l’adresse de la page sur le site. Ex. : cours-3-5-ans donne kidsportclub.fr/nos-prestations/cours-3-5-ans. En minuscules, sans accents ni espaces (mots séparés par des tirets). Ne plus la modifier une fois la page en ligne.',
              },
            },
            {
              name: 'motCle',
              label: 'Mot-clé pour Google',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Expression que les parents tapent dans Google pour trouver cette activité. Elle est reprise dans le résumé de la page destiné aux moteurs de recherche.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'ordre',
      label: 'Ordre d’affichage',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Ordre d’affichage sur la page Nos activités et dans le pied de page.',
      },
    },
  ],
}
