import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import HeroMarine from './HeroMarine'
import TerrainLines from './TerrainLines'
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

function Groupe({ titre, items }: { titre: React.ReactNode; items: Tarif[] }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ ...display, fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, color: KSC.marine, margin: '0 0 24px' }}>{titre}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
        {items.map((t) => (
          <div key={t.titre} className="ksc-card ksc-reveal" style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h3 style={{ ...display, fontSize: 18, fontWeight: 700, color: KSC.marine, margin: 0, lineHeight: 1.3 }}>{t.titre}</h3>
            <p style={{ fontSize: 26, fontWeight: 800, color: KSC.magenta, margin: 0 }}>{t.prix}</p>
            <p style={{ fontSize: 14, color: '#525c75', margin: 0, lineHeight: 1.5 }}>{t.detail}</p>
          </div>
        ))}
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

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 40px' }}>
          <Groupe titre={<Underline>Abonnements</Underline>} items={ABONNEMENTS} />
          <Groupe titre={<Underline>Prestations</Underline>} items={PRESTATIONS_TARIFS} />

          <p style={{ color: '#525c75', fontSize: 14, fontStyle: 'italic', margin: '8px 0 0' }}>
            Les réservations en ligne sont confirmées par notre équipe.
          </p>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 90px' }}>
          {/* Bloc CTA marine + lignes de terrain */}
          <div className="ksc-reveal" style={{ position: 'relative', textAlign: 'center', background: KSC.marine, color: KSC.cream, borderRadius: KSC.radiusCard, padding: '54px 24px', overflow: 'hidden' }}>
            <TerrainLines />
            <div style={{ position: 'relative' }}>
              <h2 style={{ ...display, fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, margin: '0 0 14px' }}>Prêt à inscrire votre <Underline>enfant&nbsp;?</Underline></h2>
              <p style={{ color: 'rgba(251,249,240,.8)', fontSize: 17, margin: '0 0 28px' }}>Rejoignez le club ou venez d’abord tester une séance.</p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <InscriptionCTA />
                <a href="/seance-essai" className="ksc-btn ksc-btn--cream">Réserver une séance d’essai</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
