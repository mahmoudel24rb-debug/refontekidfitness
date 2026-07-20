import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/button'
import InscriptionCTA from './InscriptionCTA'
import TerrainLines from './TerrainLines'
import Underline from './Underline'
import { landingBySlug } from '@/data/landings'

// Gabarit Landing (conversion-first, sans navigation pour limiter les fuites).
// Barre de marque minimale (logo + tél + CTA), hero marine + lignes de terrain,
// réassurance, bénéfices, preuve, CTA final marine. noindex géré au niveau page.
export default function Landing({ slug }: { slug: string }) {
  const l = landingBySlug(slug)
  if (!l) return null
  return (
    <div className="bg-cream text-ink">
      {/* Barre de marque minimale */}
      <header className="bg-cream">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5">
          <a href="/" aria-label="Kid Sport Club — accueil" className="block shrink-0">
            <Image src="/assets/ksc-logo.png" alt="Kid Sport Club" width={640} height={427} className="block h-12 w-auto" />
          </a>
          <div className="flex items-center gap-4">
            <a href="tel:+33247444143" className="text-[15px] font-bold text-marine">02 47 44 41 43</a>
            <InscriptionCTA label={l.ctaLabel} size="sm" />
          </div>
        </div>
      </header>

      {/* Hero marine + lignes de terrain */}
      <section className="relative overflow-hidden bg-marine px-6 pt-14 pb-[72px] text-cream">
        <TerrainLines />
        <div className="relative mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[.05em] text-magenta-light">{l.eyebrow}</p>
            <h1 className="mb-5 font-heading text-[clamp(32px,4.6vw,50px)] font-extrabold leading-[1.08] text-cream">{l.h1}</h1>
            <p className="mb-[30px] max-w-[520px] text-[19px] leading-relaxed text-cream/80">{l.sousTitre}</p>
            <div className="flex flex-wrap gap-3.5">
              <InscriptionCTA label={l.ctaLabel} />
              <Button asChild variant="outlineCream">
                <a href="/contact">Nous contacter</a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
            <Image src={l.image} alt={l.h1} fill sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Bandeau réassurance — pills sur surface marine secondaire */}
      <div className="bg-navy text-cream">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-center gap-2.5 px-6 py-4">
          {l.reassurance.map((r) => (
            <span key={r} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-bold text-cream">{r}</span>
          ))}
        </div>
      </div>

      {/* Bénéfices — cartes à Check */}
      <section className="mx-auto max-w-[1120px] px-6 pt-16 pb-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {l.points.map((pt) => (
            <div key={pt.titre} className="rounded-lg border border-border bg-card p-8 shadow-sm">
              <span className="mb-4 grid size-10 place-items-center rounded-full bg-magenta text-white">
                <Check size={20} strokeWidth={3} aria-hidden="true" />
              </span>
              <h2 className="mb-3 font-heading text-xl font-bold text-marine">{pt.titre}</h2>
              <p className="leading-relaxed text-ink">{pt.texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preuve sociale — rendue uniquement si un vrai avis client est renseigné */}
      {l.preuve && (
        <section className="mx-auto max-w-[820px] px-6 pt-10 pb-5 text-center">
          <p className="mb-3.5 text-[clamp(20px,2.6vw,26px)] font-bold leading-normal text-marine">«&nbsp;{l.preuve.texte}&nbsp;»</p>
          <p className="font-bold text-magenta">{l.preuve.auteur}</p>
        </section>
      )}

      {/* CTA final — marine + lignes de terrain */}
      <section className="px-6 pt-5 pb-[90px]">
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-lg bg-marine px-6 py-14 text-center text-cream">
          <TerrainLines />
          <div className="relative">
            <h2 className="mb-3.5 font-heading text-[clamp(26px,3.4vw,38px)] font-extrabold text-cream">Prêt à <Underline>réserver&nbsp;?</Underline></h2>
            <p className="mb-7 text-[17px] text-cream/80">Réservez en quelques clics ou contactez-nous, on vous rappelle.</p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <InscriptionCTA label={l.ctaLabel} />
              <Button asChild variant="outlineCream">
                <a href="tel:+33247444143">02 47 44 41 43</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pied minimal (légal) */}
      <footer className="bg-cream-2 px-6 py-6 text-center text-sm">
        <p className="mb-2 font-bold text-marine">Kid Sport Club — 1 Quai de la Loire, 37210 Rochecorbon</p>
        <p className="text-muted-foreground">
          <a href="/mentions-legales" className="text-muted-foreground hover:text-marine">Mentions légales</a> ·{' '}
          <a href="/confidentialite" className="text-muted-foreground hover:text-marine">Confidentialité</a> ·{' '}
          <a href="/cgv" className="text-muted-foreground hover:text-marine">CGV</a>
        </p>
      </footer>
    </div>
  )
}
