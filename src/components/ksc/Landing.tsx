import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Plus, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import LeadForm from './LeadForm'
import StickyCtaBar from './StickyCtaBar'
import TerrainLines from './TerrainLines'
import Underline from './Underline'
import { landingBySlug } from '@/data/landings'
import { PRESTATIONS } from '@/data/prestations'
import { AVIS } from '@/data/avis'
import { FAQ } from '@/data/faq'
import { CRM_INSCRIPTION_URL } from '@/data/site'

// Landing Meta Ads — deux gabarits pilotés par data/landings.ts :
// - 'lead' : capture du lead SUR la page. UN objectif par page : le formulaire
//   (hero à droite, atteint en < 1 scroll sur mobile), répété via ancres + sticky
//   bar mobile. Pas de nav, pas de CTA concurrent (le tél reste : 2e canal).
// - 'catalogue' : les 7 prestations en blocs, CTA par bloc -> calendrier CRM.
// noindex géré au niveau page ; hors sitemap.
export default function Landing({ slug }: { slug: string }) {
  const l = landingBySlug(slug)
  if (!l) return null
  const isLead = l.variant === 'lead'
  const cible = isLead ? '#lead-form' : '#prestations'
  const faqItems = (l.faq ?? [])
    .map((q) => FAQ.find((item) => item.q === q))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <div className="bg-cream pb-16 text-ink lg:pb-0">
      {/* Barre de marque minimale : logo + appel. Aucun lien de fuite. */}
      <header className="bg-cream">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5">
          <Link href="/" aria-label="Kid Sport Club — accueil" className="block shrink-0">
            <Image src="/assets/ksc-logo.png" alt="Kid Sport Club" width={640} height={427} className="block h-12 w-auto" />
          </Link>
          <a href="tel:+33247444143" className="text-[15px] font-bold text-marine">02 47 44 41 43</a>
        </div>
      </header>

      {/* Hero marine : hook à gauche, FORMULAIRE à droite (variant lead). */}
      <section className="relative overflow-hidden bg-marine px-6 pt-12 pb-16 text-cream">
        <TerrainLines />
        <div className={`relative mx-auto grid max-w-[1120px] gap-10 ${isLead ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'items-center lg:grid-cols-2'}`}>
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[.05em] text-magenta-light">{l.eyebrow}</p>
            <h1 className="mb-4 font-heading text-[clamp(30px,4.4vw,48px)] font-extrabold leading-[1.08] text-cream">{l.h1}</h1>
            <p className="mb-6 max-w-[520px] text-[18px] leading-relaxed text-cream/80">{l.sousTitre}</p>

            {isLead && l.heroBullets && (
              <ul className="mb-6 flex flex-col gap-2.5">
                {l.heroBullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-magenta text-white">
                      <Check size={12} strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-cream">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Mini-preuve près de l'action (vrais avis plus bas dans la page). */}
            <div className="flex items-center gap-2.5">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-magenta-light text-magenta-light" />
                ))}
              </span>
              <span className="text-sm font-semibold text-cream/85">Des parents de Rochecorbon recommandent le club</span>
            </div>

            {!isLead && (
              <div className="mt-7 flex flex-wrap gap-3.5">
                <Button asChild>
                  <a href={cible}>Choisir une prestation</a>
                </Button>
              </div>
            )}
          </div>

          {isLead ? (
            <div className="lg:pl-4">
              <p className="mb-3 font-heading text-lg font-bold text-cream">{l.formCtaLabel ?? l.ctaLabel} :</p>
              <LeadForm source={`landing-${l.slug}`} landing={l.slug} ctaLabel={l.formCtaLabel ?? l.ctaLabel} compact />
            </div>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-md">
              <Image src={l.image} alt={l.h1} fill sizes="(min-width: 1024px) 50vw, calc(100vw - 48px)" className="object-cover" priority />
            </div>
          )}
        </div>
      </section>

      {/* Bandeau réassurance */}
      <div className="bg-navy text-cream">
        <div className="mx-auto flex max-w-[1120px] flex-wrap justify-center gap-2.5 px-6 py-4">
          {l.reassurance.map((r) => (
            <span key={r} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-bold text-cream">{r}</span>
          ))}
        </div>
      </div>

      {/* Catalogue de prestations — CTA par bloc -> calendrier CRM */}
      {!isLead && (
        <section id="prestations" className="mx-auto max-w-[1120px] scroll-mt-6 px-6 pt-16 pb-6">
          <h2 className="mb-10 text-center font-heading text-[clamp(26px,3.4vw,38px)] font-extrabold text-marine">
            Choisissez votre <Underline>prestation</Underline>
          </h2>
          <div className="flex flex-col gap-8">
            {PRESTATIONS.map((p, i) => (
              <article key={p.slug} className="grid overflow-hidden rounded-lg border border-border bg-card shadow-sm lg:grid-cols-[2fr_3fr]">
                <div className={`relative min-h-[220px] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image src={p.image} alt={p.titre} fill sizes="(min-width: 1024px) 40vw, calc(100vw - 48px)" className="object-cover" />
                  <Badge variant="neutral" className="absolute left-3 top-3 text-royal shadow-sm">{p.age}</Badge>
                </div>
                <div className="flex flex-col items-start gap-4 p-7 lg:p-9">
                  <h3 className="font-heading text-2xl font-bold text-marine">{p.titre}</h3>
                  <p className="leading-relaxed">{p.intro}</p>
                  <ul className="flex flex-col gap-2">
                    {p.benefices.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-magenta text-white">
                          <Check size={12} strokeWidth={3.5} aria-hidden="true" />
                        </span>
                        <span className="text-[15px]">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                    <p className="font-heading text-xl font-extrabold text-magenta">{p.prix}</p>
                    {/* Placeholder calendrier CRM — à brancher via CRM_INSCRIPTION_URL (data/site.ts). */}
                    <Button asChild size="sm">
                      <a href={CRM_INSCRIPTION_URL} data-crm="placeholder">S’inscrire</a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Comment ça se passe — étapes numérotées */}
      {l.etapes && l.etapes.length > 0 && (
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-[1120px]">
            <h2 className="mb-9 text-center font-heading text-[clamp(24px,3vw,34px)] font-extrabold text-marine">
              Comment ça se <Underline>passe</Underline>
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {l.etapes.map((e, i) => (
                <div key={e.titre} className="rounded-lg border border-border bg-cream p-7">
                  <span className="mb-4 grid size-10 place-items-center rounded-full bg-marine font-heading text-lg font-bold text-cream">{i + 1}</span>
                  <h3 className="mb-2.5 font-heading text-lg font-bold text-marine">{e.titre}</h3>
                  <p className="text-[15px] leading-relaxed">{e.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tarif réel */}
      {l.tarif && (
        <section className="px-6 py-12">
          <div className="relative mx-auto max-w-[720px] overflow-hidden rounded-lg bg-marine px-8 py-10 text-center text-cream">
            <TerrainLines opacity={0.05} />
            <div className="relative">
              <p className="mb-1.5 text-sm font-bold uppercase tracking-[.05em] text-magenta-light">Tarif</p>
              <p className="mb-4 font-heading text-[clamp(30px,4vw,40px)] font-extrabold text-cream">{l.tarif.prix}</p>
              <div className="mb-6 flex flex-wrap justify-center gap-2.5">
                {l.tarif.details.map((d) => (
                  <span key={d} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-bold">{d}</span>
                ))}
              </div>
              <Button asChild variant="light">
                <a href={cible}>{l.ctaLabel}</a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Vrais avis parents */}
      {l.avis && (
        <section className="bg-cream-2 px-6 py-14">
          <div className="mx-auto max-w-[1120px]">
            <p className="mb-2 text-center text-sm font-bold uppercase tracking-[.06em] text-magenta">Ils nous font confiance</p>
            <h2 className="mb-9 text-center font-heading text-[clamp(24px,3vw,34px)] font-extrabold text-marine">
              Avis de <Underline>parents</Underline>
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {AVIS.map((a) => (
                <figure key={a.slice(0, 40)} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-7 shadow-sm">
                  <div className="flex gap-1" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-magenta text-magenta" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-relaxed">«&nbsp;{a}&nbsp;»</blockquote>
                  <figcaption className="mt-auto text-sm font-semibold text-marine">Parent d’un enfant du club</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mini-FAQ */}
      {faqItems.length > 0 && (
        <section className="px-6 py-14">
          <div className="mx-auto max-w-[820px]">
            <h2 className="mb-8 text-center font-heading text-[clamp(24px,3vw,34px)] font-extrabold text-marine">
              Questions <Underline>fréquentes</Underline>
            </h2>
            {faqItems.map((item) => (
              <details key={item.q} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-[17px] font-bold text-marine [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus size={18} className="shrink-0 text-magenta transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="pb-5 leading-relaxed">{item.r}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA final : renvoie vers L'objectif unique de la page */}
      <section className="px-6 pt-2 pb-[72px]">
        <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-lg bg-marine px-6 py-12 text-center text-cream">
          <TerrainLines />
          <div className="relative">
            <h2 className="mb-3.5 font-heading text-[clamp(26px,3.4vw,38px)] font-extrabold text-cream">
              Prêt à <Underline>réserver&nbsp;?</Underline>
            </h2>
            <p className="mb-7 text-[17px] text-cream/80">
              {isLead ? '30 secondes suffisent — notre équipe vous rappelle très vite.' : 'Choisissez votre prestation, ou appelez-nous.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Button asChild>
                <a href={cible}>{isLead ? (l.formCtaLabel ?? l.ctaLabel) : 'Choisir une prestation'}</a>
              </Button>
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

      <StickyCtaBar href={cible} label={isLead ? (l.formCtaLabel ?? l.ctaLabel) : 'Choisir une prestation'} />
    </div>
  )
}
