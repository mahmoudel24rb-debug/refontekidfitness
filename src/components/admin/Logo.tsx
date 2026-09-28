import React from 'react'
import Image from 'next/image'

// Logo de l'écran de connexion de l'admin (admin.components.graphics.Logo) :
// badge du club et sous-titre. Styles : src/app/(payload)/custom.css (.ksc-logo).
export function Logo() {
  return (
    <div className="ksc-logo">
      <Image
        className="ksc-logo__image"
        src="/assets/ksc-logo.png"
        alt="Kid Sport Club"
        width={220}
        height={147}
        loading="eager"
      />
      <p className="ksc-logo__sous-titre">Espace de gestion du site</p>
    </div>
  )
}
