import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Underline from './Underline'
import { KSC, display } from './ui'
import { PRESTATIONS } from './prestations'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

// Les 2 prestations phares (1re rangée) en cartes larges de la mosaïque.
const WIDE_SLUGS = ['mercredis-sportifs', 'stages-vacances']

export default function PrestationsHub() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Nos prestations', item: `${SITE}/nos-prestations` },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: PRESTATIONS.map((p, i) => ({
          '@type': 'ListItem', position: i + 1, name: p.titre, url: `${SITE}/nos-prestations/${p.slug}`,
        })),
      },
    ],
  }

  // Mosaïque : cartes larges d'abord (rangée 1), puis les autres (rangées de 3).
  const larges = PRESTATIONS.filter((p) => WIDE_SLUGS.includes(p.slug))
  const normales = PRESTATIONS.filter((p) => !WIDE_SLUGS.includes(p.slug))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody }}>
        <HeroMarine
          kicker="Nos prestations"
          title="Le sport des enfants, sous toutes ses formes"
          sub={<>De la baby gym dès 10 mois au sport ado, en passant par les mercredis sportifs, les stages et les anniversaires :
            au Kid Sport Club de Rochecorbon, chaque enfant trouve son activité.</>}
        />

        {/* Mosaïque image-first */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 70px' }}>
          <div className="ksc-mosaic">
            {[...larges, ...normales].map((p) => {
              const wide = WIDE_SLUGS.includes(p.slug)
              return (
                <a
                  key={p.slug}
                  href={`/nos-prestations/${p.slug}`}
                  className={`ksc-card ksc-reveal${wide ? ' ksc-mosaic-wide' : ''}`}
                  style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      style={{ width: '100%', aspectRatio: wide ? '16 / 9' : '4 / 3', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Voile hover (l'overlay s'intensifie légèrement) */}
                    <div className="ksc-img-boost" aria-hidden="true" />
                    {/* Overlay dégradé bas (overlay d'IMAGE) + titre/badge posés sur l'image */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 10, padding: '18px 20px', background: 'linear-gradient(transparent, rgba(8,22,70,.82))' }}>
                      <span className="ksc-age-badge ksc-age-badge--dark">{p.age}</span>
                      <h2 style={{ ...display, fontSize: 24, fontWeight: 800, lineHeight: 1.15, color: '#fff', margin: 0 }}>{p.titre}</h2>
                    </div>
                  </div>
                  {/* Zone texte réduite : accroche + lien */}
                  <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    <p style={{ color: '#525c75', lineHeight: 1.55, margin: 0, flex: 1 }}>{p.accroche}</p>
                    <span className="ksc-link-arrow" style={{ fontSize: 15 }}>
                      Découvrir
                      <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1px', marginLeft: 6 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </a>
              )
            })}
          </div>
        </section>

        <WaveDivider colorTop={KSC.cream} colorBottom={KSC.white} />

        {/* Fit' Parents/Enfants : moment intégré aux cours, PAS une prestation (pas de carte dans la grille). */}
        <section style={{ background: KSC.white, padding: '48px 24px 70px' }}>
          <div className="ksc-reveal" style={{ maxWidth: 1200, margin: '0 auto', background: KSC.cream2, borderLeft: `4px solid ${KSC.magenta}`, borderRadius: KSC.radiusCard, padding: '26px 30px' }}>
            <h2 style={{ ...display, fontSize: 20, fontWeight: 700, color: KSC.marine, margin: '0 0 10px' }}>Fit&rsquo; Parents/Enfants — intégré à nos cours</h2>
            <p style={{ color: '#404a63', lineHeight: 1.65, margin: 0 }}>
              Un moment de sport à partager en famille. Parents et enfants bougent ensemble à travers des exercices ludiques et complices — une manière différente de se retrouver, entre jeu et activité physique.
            </p>
          </div>
        </section>

        <WaveDivider colorTop={KSC.white} colorBottom={KSC.marine} />

        {/* Bande CTA pré-footer (textes existants de la page) */}
        <CtaBand
          title={<>Prêt à inscrire votre <Underline>enfant&nbsp;?</Underline></>}
          sub="Première séance d’essai pour découvrir le club."
        >
          <InscriptionCTA />
          <a href="/seance-essai" className="ksc-btn ksc-btn--cream">Réserver une séance d’essai</a>
        </CtaBand>
      </main>
      <SiteFooter />
    </>
  )
}
