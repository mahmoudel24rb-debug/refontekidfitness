import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Underline from './Underline'
import { KSC, display } from './ui'

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://kidsportclub.fr'

type Tarif = { titre: string; prix: string; detail: string }

const ABONNEMENTS: Tarif[] = [
  { titre: '1 cours / semaine', prix: '29,90 €/mois', detail: 'Engagement 10 mois' },
  { titre: '1 cours / semaine, sans engagement', prix: '39,90 €/mois', detail: '+10 €/mois' },
  { titre: 'Illimité', prix: '49,90 €/mois', detail: 'Engagement 10 mois' },
  { titre: 'Illimité, sans engagement', prix: '59,90 €/mois', detail: '+10 €/mois' },
  { titre: 'Carte 10 séances', prix: '190 €', detail: 'Payable en 1 fois, nominative, valable 6 mois' },
]

const PRESTATIONS_TARIFS: Tarif[] = [
  { titre: 'Mercredis Sportifs', prix: '95 €/mois', detail: 'Tous les mercredis, sur 10 mois (hors vacances d’été)' },
  { titre: 'Stages vacances', prix: '35 €/jour ou 150 €/semaine', detail: 'Pendant les vacances scolaires' },
  { titre: 'Anniversaire', prix: '250 € / 2h', detail: 'Max 10 enfants, gâteau + déco + boissons inclus' },
]

// Carte « Illimité » (49,90) mise en avant : bordure magenta, badge chevauchant,
// légère scale desktop (classe .ksc-tarif-featured, PAS de hauteur fixe).
const FEATURED_TITRE = 'Illimité'

function Groupe({ titre, items }: { titre: React.ReactNode; items: Tarif[] }) {
  return (
    <div>
      <h2 style={{ ...display, fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, color: KSC.marine, margin: '0 0 30px' }}>{titre}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
        {items.map((t) => {
          const featured = t.titre === FEATURED_TITRE
          return (
            <div
              key={t.titre}
              className={`ksc-card ksc-reveal${featured ? ' ksc-tarif-featured' : ''}`}
              style={{
                padding: '28px 28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'flex-start',
                ...(featured ? { position: 'relative', overflow: 'visible', border: `2px solid ${KSC.magenta}`, background: KSC.white } : {}),
              }}
            >
              {featured && <span className="ksc-tarif-badge">La plus choisie</span>}
              <h3 style={{ ...display, fontSize: 18, fontWeight: 700, color: KSC.marine, margin: 0, lineHeight: 1.3 }}>{t.titre}</h3>
              <p style={{ ...display, fontSize: 'clamp(32px,3vw,38px)', fontWeight: 800, color: KSC.magenta, margin: 0, lineHeight: 1.15 }}>{t.prix}</p>
              <span style={{ background: KSC.cream2, color: '#525c75', fontSize: 13, fontWeight: 600, lineHeight: 1.4, padding: '6px 13px', borderRadius: KSC.radiusPill }}>{t.detail}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TarifsKSC() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Tarifs', item: `${SITE}/tarifs` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody }}>
        <HeroMarine
          kicker="Tarifs"
          title="Nos tarifs, en toute transparence"
          sub="Abonnements aux cours et prestations du Kid Sport Club de Rochecorbon. Une première séance d’essai pour découvrir le club."
          padding="72px 24px"
        />

        {/* Abonnements — fond crème */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 70px' }}>
          <Groupe titre={<Underline>Abonnements</Underline>} items={ABONNEMENTS} />
        </section>

        <WaveDivider colorTop={KSC.cream} colorBottom={KSC.white} />

        {/* Prestations — fond blanc */}
        <section style={{ background: KSC.white, padding: '48px 24px 70px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Groupe titre={<Underline>Prestations</Underline>} items={PRESTATIONS_TARIFS} />
            <p style={{ color: '#525c75', fontSize: 14, fontStyle: 'italic', margin: '26px 0 0' }}>
              Les réservations en ligne sont confirmées par notre équipe.
            </p>
          </div>
        </section>

        <WaveDivider colorTop={KSC.white} colorBottom={KSC.marine} />

        {/* Bande CTA pré-footer (textes existants de la page) */}
        <CtaBand
          title={<>Prêt à inscrire votre <Underline>enfant&nbsp;?</Underline></>}
          sub="Rejoignez le club ou venez d’abord tester une séance."
        >
          <InscriptionCTA />
          <a href="/seance-essai" className="ksc-btn ksc-btn--cream">Réserver une séance d’essai</a>
        </CtaBand>
      </main>
      <SiteFooter />
    </>
  )
}
