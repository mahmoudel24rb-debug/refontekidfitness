import React from 'react'
import TerrainLines from './TerrainLines'
import { KSC, display, kicker } from './ui'

// Hero intérieur unifié : bande marine unie + lignes de terrain (signature),
// kicker magenta clair, titre display crème, sous-titre crème 80 %.
// Remplace les anciens dégradés magenta→bleu et bandeaux crème.
type Props = {
  kicker?: React.ReactNode
  title: React.ReactNode
  sub?: React.ReactNode
  children?: React.ReactNode // boutons / badges optionnels
  padding?: string
  maxWidth?: number
}

export default function HeroMarine({ kicker: kick, title, sub, children, padding = '78px 24px', maxWidth = 820 }: Props) {
  return (
    <section style={{ position: 'relative', background: KSC.marine, color: KSC.cream, padding, textAlign: 'center', overflow: 'hidden' }}>
      <TerrainLines />
      <div style={{ position: 'relative', maxWidth, margin: '0 auto' }}>
        {kick && (
          <p style={{ ...kicker, color: KSC.magentaLight, margin: '0 0 14px' }}>{kick}</p>
        )}
        <h1 style={{ ...display, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, lineHeight: 1.1, color: KSC.cream, margin: 0 }}>
          {title}
        </h1>
        {sub && (
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'rgba(251,249,240,.8)', maxWidth: 720, margin: '16px auto 0' }}>
            {sub}
          </p>
        )}
        {children && (
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
