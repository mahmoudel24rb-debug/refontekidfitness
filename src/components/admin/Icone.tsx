import React from 'react'
import Image from 'next/image'
import type { ServerProps } from 'payload'

// Icône du fil d'Ariane de l'admin (admin.components.graphics.Icon), lien vers
// l'accueil de l'admin. Taille fixée dans src/app/(payload)/custom.css.
// Image : public/assets/ksc-icone-admin.png, logo du club rogné sur son contenu
// (64 x 64, sans les marges transparentes de src/app/icon.png) pour que le
// badge occupe toute la largeur de l'icône.
// Payload peut rendre ce composant dans l'image Open Graph de l'admin (/api/og,
// rendu satori, désactivée par meta.defaultOGImageType) sans props serveur :
// next/image n'y est pas utilisable, on n'y affiche donc rien.
export function Icone({ payload }: Partial<Pick<ServerProps, 'payload'>>) {
  if (!payload) return null
  return (
    <Image
      className="ksc-icone"
      src="/assets/ksc-icone-admin.png"
      alt="Kid Sport Club, accueil"
      width={28}
      height={28}
    />
  )
}
