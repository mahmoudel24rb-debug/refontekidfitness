import React from 'react'
import Underline from './Underline'
import { KSC, display, kicker } from './ui'

// Section « Avis de parents » (home) — 3 avis réels fournis dans le récap client,
// recopiés tels quels. Les noms n'ont pas été fournis : attribution neutre.
// Le mot 'garderie' est banni des textes du club, mais conservé ici car citation
// verbatim d'un parent (consigne client du récap).
const AVIS = [
  'Ma fille y est inscrite depuis début novembre pour la garderie du mercredi et elle ADORE ! Dans sa journée, elle a le droit de faire les cours du mercredi et/ou les activités proposées avec les animateurs. La journée peut être très sportive (pompom girls + zumba + cross training boxing + gym) ce qu’elle adore ou un peu plus tranquille avec aussi des activités et temps calme si elle est fatiguée. Les moniteurs sont à l’écoute et très gentils. Je recommande à 300.',
  'C’est la deuxième fois que j’ai inscrit mon fils pour les vacances, il est toujours content d’y aller, il ne veut pas repartir le soir. Je suis très satisfaite des services proposés ainsi que les animateurs qui ont su avoir les bons réflexes lors de la première inscription, lorsque mon fils s’est blessé. Les encadrants sont très agréables le matin comme le soir malgré les difficultés qu’ils peuvent rencontrer lors de leur journée avec mon enfant, ils restent tous très professionnels. Continuez ainsi. Cordialement.',
  'J’ai inscrit mon fils pour les activités de 3-5 ans, les cours sont adaptés et les encadrants d’une bienveillance qu’on apprécie en tant que parent. Le fait de pouvoir choisir ses créneaux en fonction des activités et de notre emploi du temps est un véritable plus. Si vous cherchez un endroit où votre enfant peut s’amuser, apprendre le sport collectif et s’épanouir, je vous recommande Kid Sport Club à Rochecorbon.',
]

// 5 étoiles pleines magenta — symbole SVG inline (pas d'emoji).
function Etoiles() {
  return (
    <div aria-label="5 étoiles sur 5" role="img" style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill={KSC.magenta}>
          <path d="M12 2l2.9 6.26 6.6.7-4.95 4.53 1.37 6.51L12 16.7 6.08 20l1.37-6.51L2.5 8.96l6.6-.7z" />
        </svg>
      ))}
    </div>
  )
}

export default function AvisParents() {
  return (
    <section style={{ background: KSC.cream2, fontFamily: KSC.fontBody, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ ...kicker, color: KSC.magenta, margin: '0 0 10px' }}>Ils nous font confiance</p>
          <h2 style={{ ...display, fontSize: 'clamp(26px,3.5vw,40px)', fontWeight: 800, color: KSC.marine, margin: 0 }}>Avis de <Underline>parents</Underline></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 26, alignItems: 'stretch' }}>
          {AVIS.map((texte, i) => (
            <figure key={i} className="ksc-card ksc-reveal" style={{ padding: '30px 30px 26px', margin: 0, display: 'flex', flexDirection: 'column' }}>
              <Etoiles />
              <blockquote style={{ margin: '0 0 18px', color: '#404a63', lineHeight: 1.65, fontSize: 15.5, flex: 1 }}>
                « {texte} »
              </blockquote>
              <figcaption style={{ color: KSC.marine, fontWeight: 700, fontSize: 14 }}>Parent d’un enfant du club</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
