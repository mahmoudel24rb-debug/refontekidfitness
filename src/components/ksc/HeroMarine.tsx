import React from 'react'
import TerrainLines from './TerrainLines'
import { KSC, display, kicker } from './ui'

// Hero intérieur unifié : bande marine unie + lignes de terrain (signature),
// kicker magenta clair, titre display crème, sous-titre crème 80 %.
//
// v2 : variante 2 colonnes quand `image` est fournie — texte à gauche
// (kicker, titre display, sous-titre, CTAs), photo à droite dans un cadre
// radius 24 légèrement incliné (-2deg desktop, 0 mobile — voir overrides.css
// .ksc-hero-grid / .ksc-hero-media), badge d'âge en pill flottant sur le coin
// haut-gauche de la photo. Tout est en flux normal (grid, hauteurs auto).
type Props = {
  kicker?: React.ReactNode
  title: React.ReactNode
  sub?: React.ReactNode
  children?: React.ReactNode // boutons / badges optionnels
  padding?: string
  maxWidth?: number
  image?: string
  imageAlt?: string
  badge?: React.ReactNode // pill d'âge posée sur la photo (variante image)
}

export default function HeroMarine({ kicker: kick, title, sub, children, padding = '78px 24px', maxWidth = 820, image, imageAlt, badge }: Props) {
  if (image) {
    return (
      <section style={{ position: 'relative', background: KSC.marine, color: KSC.cream, padding, overflow: 'hidden' }}>
        <TerrainLines />
        <div className="ksc-hero-grid" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
          <div>
            {kick && (
              <p style={{ ...kicker, color: KSC.magentaLight, margin: '0 0 14px' }}>{kick}</p>
            )}
            <h1 className="ksc-display-xl" style={{ ...display, fontSize: 'clamp(36px,4.6vw,60px)', fontWeight: 800, lineHeight: 1.06, color: KSC.cream, margin: 0 }}>
              {title}
            </h1>
            {sub && (
              <p style={{ fontSize: 19, lineHeight: 1.65, color: 'rgba(251,249,240,.8)', maxWidth: 560, margin: '18px 0 0' }}>
                {sub}
              </p>
            )}
            {children && (
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 30 }}>
                {children}
              </div>
            )}
          </div>
          <div className="ksc-hero-media">
            <img src={image} alt={imageAlt ?? ''} />
            {badge && <span className="ksc-age-badge ksc-hero-media-badge">{badge}</span>}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={{ position: 'relative', background: KSC.marine, color: KSC.cream, padding, textAlign: 'center', overflow: 'hidden' }}>
      <TerrainLines />
      <div style={{ position: 'relative', maxWidth, margin: '0 auto' }}>
        {kick && (
          <p style={{ ...kicker, color: KSC.magentaLight, margin: '0 0 14px' }}>{kick}</p>
        )}
        <h1 className="ksc-display-xl" style={{ ...display, fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, lineHeight: 1.1, color: KSC.cream, margin: 0 }}>
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
