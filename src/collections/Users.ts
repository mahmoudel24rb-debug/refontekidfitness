import type { CollectionConfig } from 'payload'

import { adminOnly, adminOnlyChamp, adminOuSoiMeme } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utilisateur', plural: 'Utilisateurs' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'nom', 'role'],
    pagination: { defaultLimit: 25 },
    group: 'Réglages',
    description:
      'Les comptes qui peuvent se connecter à cet espace de gestion. Chacun peut changer son nom et son mot de passe depuis « Mon compte » ; seul un administrateur crée ou supprime des comptes.',
    hideAPIURL: true,
  },
  auth: true,
  access: {
    // Seul un admin crée et supprime les comptes ; chacun peut lire et modifier
    // son propre compte (nom, email, mot de passe), mais pas son rôle.
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    create: adminOnly,
    update: adminOuSoiMeme,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'role',
      label: 'Rôle',
      type: 'select',
      required: true,
      defaultValue: 'editeur',
      options: [
        { label: 'Admin (DGL)', value: 'admin' },
        { label: 'Éditeur (client)', value: 'editeur' },
      ],
      saveToJWT: true,
      // Un éditeur ne peut pas se promouvoir admin : champ modifiable par un admin seulement.
      access: { update: adminOnlyChamp },
      admin: {
        description: 'Admin : gestion complète, comptes compris. Éditeur : gestion du contenu du site.',
      },
    },
    {
      name: 'nom',
      label: 'Nom',
      type: 'text',
      admin: { description: 'Utilisé pour vous saluer sur l’accueil de cet espace.' },
    },
  ],
}
