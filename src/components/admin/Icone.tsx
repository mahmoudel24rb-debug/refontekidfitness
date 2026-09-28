import React from 'react'
import Image from 'next/image'

// Icône du fil d'Ariane de l'admin (admin.components.graphics.Icon), lien vers
// l'accueil de l'admin. Taille fixée dans src/app/(payload)/custom.css.
export function Icone() {
  return <Image className="ksc-icone" src="/icon.png" alt="Kid Sport Club, accueil" width={28} height={28} />
}
