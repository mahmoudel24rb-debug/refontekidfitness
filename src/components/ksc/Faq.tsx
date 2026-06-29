import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import InscriptionCTA from './InscriptionCTA'

export const FAQ = [
  { q: 'À partir de quel âge mon enfant peut-il commencer ?', r: "Dès 10 mois avec la baby gym (séances parent-enfant), puis des cours adaptés à chaque tranche d'âge jusqu'à 14 ans." },
  { q: 'Peut-on essayer avant de s’inscrire ?', r: "Oui ! Nous proposons une séance d'essai pour découvrir le club, rencontrer l'équipe et trouver l'activité qui convient le mieux à votre enfant." },
  { q: 'Mon enfant n’a jamais fait de sport, est-ce un problème ?', r: "Pas du tout. Tout est basé sur le jeu et l'éveil moteur, au rythme de chacun. L'objectif est le plaisir de bouger, pas la performance." },
  { q: 'Comment se passe l’encadrement et la sécurité ?', r: "Les enfants sont répartis en groupes par âge, encadrés par une équipe diplômée, avec du matériel adapté et un espace sécurisé." },
  { q: 'Proposez-vous des stages pendant les vacances ?', r: "Oui, des stages sportifs multi-activités pendant toutes les vacances scolaires, ainsi que les mercredis (8h00 – 17h30)." },
  { q: 'Peut-on organiser un anniversaire au club ?', r: "Oui, nous proposons une formule anniversaire clé en main : jeux et parcours sportifs encadrés, espace privatisé et goûter." },
  { q: 'Comment s’inscrire et régler ?', r: "Inscriptions à l'année pour les cours, et à la carte pour les stages et anniversaires. L'inscription et le paiement en ligne seront bientôt disponibles ; en attendant, contactez-nous." },
  { q: 'Où se trouve le club et quels sont les horaires ?', r: "Au 1 Quai de la Loire, 37210 Rochecorbon (près de Tours). Du lundi au vendredi 9h30–12h30 et 16h00–19h30, le samedi 9h30–17h30." },
]

export default function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.r } })),
  }
  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: '#fff', fontFamily: '"Inter", sans-serif', color: '#404a63' }}>
        <section style={{ background: 'var(--token-6a7314fd-fc42-4b6f-a276-ad0adb001906, #fbf9f0)', padding: '72px 24px', textAlign: 'center' }}>
          <p style={{ color: '#e6007e', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 14, margin: '0 0 14px' }}>FAQ</p>
          <h1 style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 800, color: '#081646', letterSpacing: '-0.02em', margin: 0 }}>Vos questions, nos réponses</h1>
        </section>

        <section style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 30px' }}>
          {FAQ.map((f) => (
            <details key={f.q} style={{ borderBottom: '1px solid #eceae2', padding: '20px 0' }}>
              <summary style={{ cursor: 'pointer', listStyle: 'none', fontSize: 19, fontWeight: 700, color: '#081646', display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                {f.q}<span aria-hidden style={{ color: '#e6007e' }}>+</span>
              </summary>
              <p style={{ margin: '14px 0 0', lineHeight: 1.7, fontSize: 16 }}>{f.r}</p>
            </details>
          ))}
        </section>

        <section style={{ textAlign: 'center', padding: '20px 24px 80px' }}>
          <p style={{ fontSize: 17, margin: '0 0 22px' }}>Une autre question ? Venez nous voir ou contactez-nous.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <InscriptionCTA label="Réserver une séance d’essai" />
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, textDecoration: 'none', color: '#081646', border: '2px solid #081646' }}>Nous contacter</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
