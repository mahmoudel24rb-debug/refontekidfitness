import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'

const VALEURS = [
  { t: 'La psychomotricité', d: "Nos activités reposent sur l'apprentissage moteur : chaque jeu, chaque parcours aide l'enfant à développer son équilibre, sa coordination et sa confiance." },
  { t: 'Le plaisir avant tout', d: "On ne « fait pas du sport », on s'amuse. Le jeu est notre méthode : c'est en s'amusant que les enfants progressent et reviennent avec le sourire." },
  { t: 'La sécurité', d: "Espaces adaptés, matériel aux normes, encadrement diplômé et groupes par âge : un cadre où les parents déposent leur enfant en toute confiance." },
  { t: "L'esprit club", d: "Plus qu'une salle : un club où l'enfant a ses repères, ses copains et son sentiment d'appartenance, au bord de la Loire à Rochecorbon." },
]

export default function QuiSommesNous() {
  return (
    <>
      <SiteHeader />
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif', color: '#404a63' }}>
        <section style={{ background: 'linear-gradient(135deg,#e6007e,#1060c8)', color: '#fff', padding: '84px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <p style={{ fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, opacity: 0.9, margin: '0 0 14px' }}>Qui sommes-nous</p>
            <h1 style={{ fontSize: 'clamp(34px,5vw,56px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 18px' }}>Le club de sport des enfants</h1>
            <p style={{ fontSize: 19, lineHeight: 1.6, opacity: 0.95, margin: 0 }}>
              À Rochecorbon, le Kid Sport Club initie les enfants de 10 mois à 14 ans au sport et au mouvement,
              par le jeu, dans un cadre bienveillant et sécurisé.
            </p>
          </div>
        </section>

        <section style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px 40px' }}>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,36px)', fontWeight: 800, color: '#081646', margin: '0 0 18px' }}>Notre pédagogie</h2>
          <p style={{ fontSize: 18, lineHeight: 1.75, margin: '0 0 16px' }}>
            Le Kid Sport Club s'appuie sur la <strong>psychomotricité</strong> et l'<strong>apprentissage moteur</strong> : avant d'être une
            performance, le sport est un formidable outil de développement. À travers des parcours, des jeux collectifs et des activités
            adaptées à chaque âge, l'enfant gagne en motricité, en autonomie et en confiance.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, margin: 0 }}>
            De la baby gym parent-enfant dès 10 mois jusqu'au sport ado, chaque tranche d'âge a son programme, encadré par une équipe
            diplômée et passionnée.
          </p>
        </section>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22 }}>
            {VALEURS.map((v) => (
              <div key={v.t} style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', borderRadius: 16, padding: 30 }}>
                <h3 style={{ fontSize: 21, fontWeight: 800, color: '#081646', margin: '0 0 12px' }}>{v.t}</h3>
                <p style={{ lineHeight: 1.6, margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', padding: '70px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: '#081646', margin: '0 0 12px' }}>Notre équipe</h2>
          <p style={{ fontSize: 17, maxWidth: 640, margin: '0 auto 28px' }}>
            Des animateurs et coachs diplômés, formés à l'encadrement des enfants, qui mettent l'énergie et la bienveillance au cœur de chaque séance.
            <em> (Présentation de l'équipe à venir.)</em>
          </p>
          <InscriptionCTA label="Réserver une séance d’essai" />
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
