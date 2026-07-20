import React from 'react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import HeroMarine from './HeroMarine'
import CtaBand from './CtaBand'
import WaveDivider from './WaveDivider'
import Underline from './Underline'
import { KSC, display } from './ui'

// Pictogrammes SVG inline (pas d'emoji) — un par valeur, stroke currentColor.
const ICONES: Record<string, React.ReactNode> = {
  Bienveillance: (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  ),
  Sécurité: (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Plaisir: (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  Diversité: (
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <circle cx="17.5" cy="6.5" r="3.5" />
      <path d="M6.5 14l3.5 7h-7z" />
      <rect x="14" y="14" width="7" height="7" rx="3.5" />
    </svg>
  ),
}

// Valeurs — textes du récap client (recopiés tels quels).
const VALEURS = [
  { t: 'Bienveillance', d: 'chaque enfant progresse à son rythme, sans pression ni comparaison' },
  { t: 'Sécurité', d: 'un encadrement professionnel et des équipements adaptés à chaque tranche d’âge' },
  { t: 'Plaisir', d: 'le jeu et la découverte avant la performance' },
  { t: 'Diversité', d: 'une multitude d’activités pour que chaque enfant trouve ce qui lui correspond' },
]

// Équipe — textes du récap client. Monogrammes en attendant les photos ; photos à venir (client).
const EQUIPE = [
  {
    nom: 'Magatte Lam',
    initiales: 'ML',
    d: 'Coach à Kid Sport Club, Magatte apporte une énergie solaire à chaque séance. Toujours professionnelle, elle sait créer un cadre à la fois rassurant et stimulant pour que les enfants prennent plaisir à bouger.',
  },
  {
    nom: 'Emma Villecroze',
    initiales: 'EV',
    d: 'Diplômée depuis 2 ans, Emma accompagne les enfants avec douceur et professionnalisme. Attentive à chacun, elle veille à ce que chaque séance soit un moment de progrès et de plaisir partagé.',
  },
  {
    nom: 'Matéo Nozal',
    initiales: 'MN',
    d: 'Également coach à Fitness Beauregard (Hyrox / cours collectifs), Matéo intervient aussi auprès des enfants de Kid Sport Club, avec la même exigence bienveillante qui le caractérise.',
  },
]

// Monogramme SVG : cercle marine, initiales blanches (pas de photo pour l'instant).
function Monogramme({ initiales, nom }: { initiales: string; nom: string }) {
  return (
    <svg role="img" aria-label={nom} width="88" height="88" viewBox="0 0 88 88" style={{ display: 'block', margin: '0 auto 18px' }}>
      <circle cx="44" cy="44" r="44" fill={KSC.marine} />
      <text x="44" y="45" textAnchor="middle" dominantBaseline="central" fill="#fff" fontFamily="var(--font-body), Inter, sans-serif" fontWeight="800" fontSize="30">{initiales}</text>
    </svg>
  )
}

export default function QuiSommesNous() {
  return (
    <>
      <SiteHeader />
      <main style={{ background: KSC.cream, fontFamily: KSC.fontBody, color: '#404a63' }}>
        {/* Hero v2 : 2 colonnes avec la photo existante de la page */}
        <HeroMarine
          kicker="Qui sommes-nous"
          title="Le club de sport des enfants"
          sub={<>À Rochecorbon, le Kid Sport Club initie les enfants de 10 mois à 14 ans au sport et au mouvement,
            par le jeu, dans un cadre bienveillant et sécurisé.</>}
          image="/assets/ksc/stages-mercredi.webp"
          imageAlt="Enfants en activité au Kid Sport Club"
          badge="10 mois – 14 ans"
          padding="72px 24px 84px"
        />

        {/* Texte du récap client — recopié tel quel. */}
        <section className="ksc-reveal" style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px 64px' }}>
          <h2 style={{ ...display, fontSize: 'clamp(26px,3.5vw,36px)', fontWeight: 800, color: KSC.marine, margin: '0 0 18px' }}>Notre <Underline>pédagogie</Underline></h2>
          <p style={{ fontSize: 18, lineHeight: 1.75, margin: '0 0 16px' }}>
            Kid Sport Club est né de la volonté de proposer aux enfants de 10 mois à 14 ans un espace où le sport devient un vecteur d’épanouissement, de confiance en soi et de socialisation. Installé à Rochecorbon, le club accompagne chaque enfant à son rythme, de la découverte des premiers mouvements jusqu’à une pratique sportive plus structurée à l’adolescence.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, margin: 0 }}>
            Notre pédagogie s’appuie sur les principes de la psychomotricité : chaque activité est pensée pour développer la motricité, la coordination et la confiance en soi de l’enfant, dans un cadre ludique et sécurisant. Nous croyons qu’un enfant qui prend plaisir à bouger construit des bases solides pour toute sa vie.
          </p>
        </section>

        <WaveDivider colorTop={KSC.cream} colorBottom={KSC.white} />

        {/* Valeurs — fond blanc */}
        <section style={{ background: KSC.white, padding: '48px 24px 70px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 22 }}>
            {VALEURS.map((v) => (
              <div key={v.t} className="ksc-card ksc-reveal" style={{ padding: 30 }}>
                <span style={{ color: KSC.royal, display: 'inline-block', marginBottom: 12 }}>{ICONES[v.t]}</span>
                <h3 style={{ ...display, fontSize: 21, fontWeight: 700, color: KSC.marine, margin: '0 0 12px' }}>{v.t}</h3>
                <p style={{ lineHeight: 1.6, margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        <WaveDivider colorTop={KSC.white} colorBottom={KSC.cream2} />

        <section style={{ background: KSC.cream2, padding: '48px 24px 70px', textAlign: 'center' }}>
          <h2 style={{ ...display, fontSize: 'clamp(24px,3vw,34px)', fontWeight: 800, color: KSC.marine, margin: '0 0 12px' }}>Notre <Underline>équipe</Underline></h2>
          <p style={{ fontSize: 17, maxWidth: 640, margin: '0 auto 36px' }}>
            Des animateurs et coachs diplômés, formés à l&rsquo;encadrement des enfants, qui mettent l&rsquo;énergie et la bienveillance au cœur de chaque séance.
          </p>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 22, textAlign: 'center' }}>
            {EQUIPE.map((c) => (
              <div key={c.nom} className="ksc-card ksc-reveal" style={{ padding: '32px 28px' }}>
                <Monogramme initiales={c.initiales} nom={c.nom} />
                <h3 style={{ ...display, fontSize: 20, fontWeight: 700, color: KSC.marine, margin: '0 0 12px' }}>{c.nom}</h3>
                <p style={{ lineHeight: 1.65, margin: 0, fontSize: 15.5 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        <WaveDivider colorTop={KSC.cream2} colorBottom={KSC.marine} />

        {/* Bande CTA pré-footer (texte existant de la page : le bouton) */}
        <CtaBand>
          <a href="/seance-essai" className="ksc-btn ksc-btn--primary">Réserver une séance d’essai</a>
        </CtaBand>
      </main>
      <SiteFooter />
    </>
  )
}
