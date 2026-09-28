import type { CollectionConfig } from 'payload'

import { authenticated, publicRead } from '../access'

// Créneaux du planning. Une ligne = un créneau (jour, salle, heure, cours).
// La page /planning les regroupe par jour puis par salle, dans l'ordre du champ
// « ordre ». Les tranches d'âge alimentent aussi le sélecteur de créneau des
// fiches activités. Source de secours : src/data/planning.ts.
export const Planning: CollectionConfig = {
  slug: 'planning',
  labels: { singular: 'Créneau', plural: 'Planning' },
  admin: {
    useAsTitle: 'activite',
    defaultColumns: ['jour', 'heure', 'activite', 'age', 'salle', 'duree', 'actif'],
    listSearchableFields: ['activite', 'salle'],
    pagination: { defaultLimit: 50 },
    group: 'Contenu du site',
    description:
      'Les créneaux de la semaine type, affichés sur la page Planning et sur les pages des cours. Un créneau par ligne ; l’ordre s’applique à l’intérieur de chaque journée.',
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
      type: 'row',
      fields: [
        {
          name: 'jour',
          label: 'Jour',
          type: 'select',
          required: true,
          admin: { width: '33.33%' },
          options: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((j) => ({
            label: j,
            value: j,
          })),
        },
        {
          name: 'heure',
          label: 'Heure',
          type: 'text',
          required: true,
          admin: { width: '33.33%', description: 'Heure de début. Ex. : 10h30, 17h, 9h15.' },
        },
        {
          name: 'duree',
          label: 'Durée (minutes)',
          type: 'number',
          defaultValue: 60,
          min: 15,
          max: 600,
          admin: {
            width: '33.33%',
            description:
              'Elle fixe la hauteur du bloc dans le calendrier de la semaine. 60 minutes par défaut.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'activite',
          label: 'Cours',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
            description:
              'Nom du cours tel qu’il s’affiche dans le calendrier. Écrivez-le toujours de la même façon : il sert aussi à retrouver les horaires d’un cours sur sa page.',
          },
        },
        {
          name: 'salle',
          label: 'Salle',
          type: 'text',
          required: true,
          admin: { width: '50%', description: 'Ex. : Salle Kid, Salle Cross, Salle Fitness, Bulle.' },
        },
      ],
    },
    {
      name: 'age',
      label: 'Tranche d’âge',
      type: 'select',
      options: [
        { label: '10-36 mois', value: '10-36 mois' },
        { label: '3-5 ans', value: '3-5 ans' },
        { label: '6-14 ans', value: '6-14 ans' },
      ],
      admin: {
        description:
          'Optionnelle. Elle donne sa couleur et sa pastille d’âge au créneau, ouvre le bon lien de réservation et propose le créneau dans le formulaire des fiches activités.',
      },
    },
    {
      name: 'ordre',
      label: 'Ordre d’affichage',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Ordre du créneau dans sa journée.' },
    },
    {
      name: 'actif',
      label: 'Actif',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Décoché : le créneau disparaît du site.' },
    },
  ],
}
