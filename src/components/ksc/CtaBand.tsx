import React from 'react'

import Section from './Section'
import TerrainLines from './TerrainLines'

// Bande CTA pré-footer réutilisable : section marine pleine largeur + lignes
// de terrain, titre display crème, sous-titre, boutons passés en children
// (chaque page fournit SES textes existants — ce composant n'en invente aucun).
// Titre/sous-titre optionnels : certaines pages n'ont qu'un bouton.
//
// NB coexistence : les marges des <h2>/<p> portent `!` tant que framer.css
// (non layeré, `h1..h6,p{margin:0}`) vit — voir HeroMarine.tsx.
type Props = {
  title?: React.ReactNode
  sub?: React.ReactNode
  children?: React.ReactNode // CTAs
}

export default function CtaBand({ title, sub, children }: Props) {
  return (
    // Rythme vertical propre à la bande (64/72px) : on double les overrides en
    // `md:` pour neutraliser le `md:py-20` par défaut de Section.
    <Section tone="marine" className="pt-16 pb-[72px] text-center md:pt-16 md:pb-[72px]">
      <TerrainLines />
      <div className="relative mx-auto max-w-[860px]">
        {title && (
          <h2 className="mb-3.5! font-heading text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.02em] text-cream">
            {title}
          </h2>
        )}
        {sub && <p className="mb-7! text-[17px] leading-[1.6] text-cream/80">{sub}</p>}
        {children && <div className="flex flex-wrap justify-center gap-3.5">{children}</div>}
      </div>
    </Section>
  )
}
