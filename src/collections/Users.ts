import type { CollectionConfig } from 'payload'

import { adminOnly } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utilisateur', plural: 'Utilisateurs' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'nom', 'role'],
    group: 'Administration',
  },
  auth: true,
  access: {
    // Seul un admin gère les comptes ; chacun peut lire son propre profil.
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      if (user) return { id: { equals: user.id } }
      return false
    },
    create: adminOnly,
    update: adminOnly,
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
    },
    { name: 'nom', label: 'Nom', type: 'text' },
  ],
}
