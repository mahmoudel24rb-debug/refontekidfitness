import React from 'react'
import Image from 'next/image'
import type { ServerProps } from 'payload'

// Icône du fil d'Ariane de l'admin (admin.components.graphics.Icon), lien vers
// l'accueil de l'admin. Taille fixée dans src/app/(payload)/custom.css.
// Payload rend aussi ce composant dans l'image Open Graph de l'admin (/api/og,
// rendu satori) sans props serveur : next/image n'y est pas utilisable, on n'y
// affiche donc rien plutôt que de faire échouer la génération de l'image.
export function Icone({ payload }: Partial<Pick<ServerProps, 'payload'>>) {
  if (!payload) return null
  return <Image className="ksc-icone" src="/icon.png" alt="Kid Sport Club, accueil" width={28} height={28} />
}
