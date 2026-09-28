import type { Access, FieldAccess } from 'payload'

// Lecture publique : le front Next.js consomme ces contenus sans authentification.
export const publicRead: Access = () => true

// Écriture réservée aux utilisateurs connectés (admin DGL ou éditeur client).
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

// Réservé au rôle admin (gestion des comptes).
export const adminOnly: Access = ({ req: { user } }) => user?.role === 'admin'

// Admin : tous les comptes. Autre utilisateur connecté : uniquement son propre
// compte (contrainte appliquée par Payload à la requête, liste comprise).
export const adminOuSoiMeme: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } }
}

// Variante champ (FieldAccess, booléen uniquement) : un éditeur ne peut pas
// modifier ce champ, même sur son propre compte (ex. : son rôle).
export const adminOnlyChamp: FieldAccess = ({ req: { user } }) => user?.role === 'admin'
