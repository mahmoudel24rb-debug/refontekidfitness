import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'
import { PRESTATIONS } from './prestations'

const GRADS = [
  'linear-gradient(135deg,#e6007e,#1060c8)',
  'linear-gradient(135deg,#1060c8,#081646)',
  'linear-gradient(135deg,#e6007e,#081646)',
  'linear-gradient(135deg,#1060c8,#e6007e)',
  'linear-gradient(135deg,#081646,#1060c8)',
  'linear-gradient(135deg,#081646,#e6007e)',
  'linear-gradient(135deg,#e6007e,#1060c8)',
]

export default function PrestationsHub() {
  return (
    <>
      <SiteHeader />
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif' }}>
        <section style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', padding: '72px 24px', textAlign: 'center' }}>
          <p style={{ color: '#e6007e', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 14px' }}>Nos prestations</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,54px)', fontWeight: 800, color: '#081646', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '0 0 18px' }}>
            Le sport des enfants, sous toutes ses formes
          </h1>
          <p style={{ color: '#404a63', fontSize: 18, lineHeight: 1.6, maxWidth: 720, margin: '0 auto' }}>
            De la baby gym dès 10 mois au sport ado, en passant par la garderie, les stages et les anniversaires :
            au Kid Sport Club de Rochecorbon, chaque enfant trouve son activité.
          </p>
        </section>

        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 90px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 26 }}>
            {PRESTATIONS.map((p, i) => (
              <a key={p.slug} href={`/nos-prestations/${p.slug}`}
                style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, overflow: 'hidden', textDecoration: 'none', color: 'inherit', border: '1px solid #ececec', background: '#fff', boxShadow: '0 6px 22px rgba(8,22,70,.05)' }}>
                <div style={{ background: GRADS[i % GRADS.length], height: 132, display: 'flex', alignItems: 'flex-end', padding: 20 }}>
                  <span style={{ background: 'rgba(255,255,255,.92)', color: '#081646', fontWeight: 700, fontSize: 13, padding: '5px 12px', borderRadius: 70 }}>{p.age}</span>
                </div>
                <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2 style={{ fontSize: 23, fontWeight: 800, color: '#081646', margin: '0 0 10px' }}>{p.titre}</h2>
                  <p style={{ color: '#525c75', lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>{p.accroche}</p>
                  <span style={{ color: '#e6007e', fontWeight: 700 }}>Découvrir →</span>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 64, background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', borderRadius: 20, padding: '54px 24px' }}>
            <h2 style={{ fontSize: 'clamp(26px,3.5vw,38px)', fontWeight: 800, color: '#081646', margin: '0 0 14px' }}>Prêt à inscrire votre enfant ?</h2>
            <p style={{ color: '#404a63', fontSize: 17, margin: '0 0 28px' }}>Première séance d’essai pour découvrir le club.</p>
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
