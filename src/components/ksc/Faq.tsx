import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

// Q/R du récap client — recopiées telles quelles (la réponse « inscription » a été
// validée sans le jargon interne du doc client).
export const FAQ = [
  { q: 'À partir de quel âge mon enfant peut-il commencer ?', r: "Dès 10 mois, avec nos cours adaptés aux tout-petits, jusqu’à 14 ans." },
  { q: 'Puis-je assister à une séance d’essai avant de m’inscrire ?', r: "Oui, la séance d’essai est gratuite. Elle se réserve directement auprès de notre équipe, qui vous recontacte pour fixer le créneau." },
  { q: 'Comment s’inscrire à un cours à l’année ?', r: "L’inscription se fait en ligne ou directement auprès de notre équipe, qui vous accompagne dans le choix de la formule adaptée à votre enfant." },
  { q: 'Quels sont vos tarifs ?', r: "Nos formules démarrent à 29,90 €/mois (1 cours/semaine, engagement 10 mois). Nous proposons aussi une formule illimitée, une carte de 10 séances, ainsi que des tarifs spécifiques pour les Mercredis Sportifs, les stages vacances et les anniversaires. Le détail complet est disponible sur notre page tarifs." },
  { q: 'Les Mercredis Sportifs, qu’est-ce que c’est exactement ?', r: "Une journée sportive et encadrée, tous les mercredis de l’année scolaire (hors vacances d’été), pour 95 €/mois." },
  { q: 'Proposez-vous des stages pendant les vacances scolaires ?', r: "Oui, à la journée (35 €) ou à la semaine (150 €), avec des activités sportives variées encadrées par notre équipe." },
  { q: 'Comment organiser l’anniversaire de mon enfant chez vous ?', r: "Formule de 2h pour un maximum de 10 enfants, à 250 €. Le gâteau, la décoration et les boissons sont inclus — vous n’avez rien à prévoir." },
  { q: 'Le club est-il uniquement à Rochecorbon ?', r: "Oui, Kid Sport Club est basé exclusivement à Rochecorbon (1 Quai de la Loire, 37210 Rochecorbon)." },
]

// Rend « page tarifs » cliquable (lien /tarifs) — le JSON-LD garde le texte brut.
function Reponse({ texte }: { texte: string }) {
  const marqueur = 'page tarifs'
  const i = texte.indexOf(marqueur)
  if (i === -1) return <>{texte}</>
  return (
    <>
      {texte.slice(0, i)}
      <a href="/tarifs" style={{ color: '#e6007e', fontWeight: 700 }}>page tarifs</a>
      {texte.slice(i + marqueur.length)}
    </>
  )
}

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
              <p style={{ margin: '14px 0 0', lineHeight: 1.7, fontSize: 16 }}><Reponse texte={f.r} /></p>
            </details>
          ))}
        </section>

        <section style={{ textAlign: 'center', padding: '20px 24px 80px' }}>
          <p style={{ fontSize: 17, margin: '0 0 22px' }}>Une autre question ? Venez nous voir ou contactez-nous.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/seance-essai" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, fontSize: 16, textDecoration: 'none', color: '#fff', background: '#e6007e', border: '2px solid #e6007e' }}>Réserver une séance d’essai</a>
            <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 30px', borderRadius: 70, fontWeight: 700, textDecoration: 'none', color: '#081646', border: '2px solid #081646' }}>Nous contacter</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
