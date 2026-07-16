import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import { KSC } from './ui'

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
      <a href="/tarifs" style={{ color: KSC.magenta, fontWeight: 700 }}>page tarifs</a>
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
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        <HeroMarine kicker="FAQ" title="Vos questions, nos réponses" padding="72px 24px" />

        <section style={{ maxWidth: 820, margin: '0 auto', padding: '56px 24px 30px' }}>
          {FAQ.map((f) => (
            <details key={f.q} className="ksc-faq-item ksc-reveal">
              <summary>
                {f.q}
                {/* Icône « + » qui pivote en « × » à l'ouverture (details[open]). */}
                <svg className="ksc-faq-icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              </summary>
              <p className="ksc-faq-answer"><Reponse texte={f.r} /></p>
            </details>
          ))}
        </section>

        <section style={{ textAlign: 'center', padding: '20px 24px 80px' }}>
          <p style={{ fontSize: 17, margin: '0 0 22px' }}>Une autre question ? Venez nous voir ou contactez-nous.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/seance-essai" className="ksc-btn ksc-btn--primary">Réserver une séance d’essai</a>
            <a href="/contact" className="ksc-btn ksc-btn--secondary">Nous contacter</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
