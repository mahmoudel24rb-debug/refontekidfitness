import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'

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

const CREME = 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)'

function Groupe({ titre, items }: { titre: string; items: Tarif[] }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 'clamp(24px,3vw,32px)', fontWeight: 800, color: '#081646', margin: '0 0 24px' }}>{titre}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 20 }}>
        {items.map((t) => (
          <div key={t.titre} style={{ background: '#fff', border: '1px solid #ececec', borderRadius: 16, padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 10, boxShadow: '0 6px 22px rgba(8,22,70,.05)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#081646', margin: 0, lineHeight: 1.3 }}>{t.titre}</h3>
            <p style={{ fontSize: 26, fontWeight: 800, color: '#e6007e', margin: 0 }}>{t.prix}</p>
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
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif' }}>
        <section style={{ background: CREME, padding: '72px 24px', textAlign: 'center' }}>
          <p style={{ color: '#e6007e', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 14px' }}>Tarifs</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, color: '#081646', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 18px' }}>
            Nos tarifs, en toute transparence
          </h1>
          <p style={{ color: '#404a63', fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 auto' }}>
            Abonnements aux cours et prestations du Kid Sport Club de Rochecorbon. Une première séance d’essai pour découvrir le club.
          </p>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 40px' }}>
          <Groupe titre="Abonnements" items={ABONNEMENTS} />
          <Groupe titre="Prestations" items={PRESTATIONS_TARIFS} />

          <p style={{ color: '#525c75', fontSize: 14, fontStyle: 'italic', margin: '8px 0 0' }}>
            Les réservations en ligne sont confirmées par notre équipe.
          </p>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 90px' }}>
          <div style={{ textAlign: 'center', background: CREME, borderRadius: 20, padding: '54px 24px' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, color: '#081646', margin: '0 0 14px' }}>Prêt à inscrire votre enfant ?</h2>
            <p style={{ color: '#404a63', fontSize: 17, margin: '0 0 28px' }}>Rejoignez le club ou venez d’abord tester une séance.</p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <InscriptionCTA />
              <a href="/seance-essai" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, fontSize: 16, textDecoration: 'none', color: '#081646', border: '2px solid #081646' }}>Réserver une séance d’essai</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
