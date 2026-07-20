import React from 'react'
import TerrainLines from './TerrainLines'
import { KSC, display } from './ui'

// Bande CTA pré-footer réutilisable : section marine pleine largeur + lignes
// de terrain, titre display crème, sous-titre, boutons passés en children
// (chaque page fournit SES textes existants — ce composant n'en invente aucun).
// Titre/sous-titre optionnels : certaines pages n'ont qu'un bouton.
type Props = {
  title?: React.ReactNode
  sub?: React.ReactNode
  children?: React.ReactNode // CTAs
}

export default function CtaBand({ title, sub, children }: Props) {
  return (
    <section style={{ position: 'relative', background: KSC.marine, color: KSC.cream, padding: '64px 24px 72px', textAlign: 'center', overflow: 'hidden' }}>
      <TerrainLines />
      <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
        {title && (
          <h2 className="ksc-display-xl" style={{ ...display, fontSize: 'clamp(28px,3.6vw,40px)', fontWeight: 800, color: KSC.cream, margin: '0 0 14px' }}>
            {title}
          </h2>
        )}
        {sub && (
          <p style={{ color: 'rgba(251,249,240,.8)', fontSize: 17, lineHeight: 1.6, margin: '0 0 28px' }}>{sub}</p>
        )}
        {children && (
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
