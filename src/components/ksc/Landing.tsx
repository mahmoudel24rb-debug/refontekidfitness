import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Plus, Star } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AvisAvatar from './AvisAvatar'
import LeadForm from './LeadForm'
import StickyCtaBar from './StickyCtaBar'
import TerrainLines from './TerrainLines'
import WaveDivider from './WaveDivider'
import Underline from './Underline'
import Section from './Section'
import Container from './Container'
import StatsBand from './StatsBand'
import EditorialSplit from './EditorialSplit'
import InclusionsChecklist from './InclusionsChecklist'
import LandingAgeGroups from './LandingAgeGroups'
import LandingGallery from './LandingGallery'
import LandingPlanningStrip from './LandingPlanningStrip'
import LandingTeam from './LandingTeam'
import LandingTarifs from './LandingTarifs'
import LandingPlace from './LandingPlace'
import PullQuote from './PullQuote'
import { landingBySlug } from '@/data/landings'
import { HOME } from '@/data/home'
import { faqParQuestions, getAvis, getFaq, getParametres, getPrestations } from '@/lib/contenu'

// Landing Meta Ads — deux gabarits pilotés par data/landings.ts :
// - 'lead' : capture du lead SUR la page (formulaire hero + formulaire final),
//   répété via ancres + sticky bar mobile. Pas de nav, pas de CTA concurrent.
// - 'catalogue' : les 7 prestations en blocs, CTA par bloc -> calendrier CRM.
// Enrichissement structurel : chaque page enchaîne des blocs de contenu déjà
// validé (stats, spotlight, tranches, planning, galerie, avis mis en scène,
// équipe, tarifs, lieu). ZÉRO copy neuf. noindex géré au niveau page ; hors
// sitemap.
export default async function Landing({ slug }: { slug: string }) {
  const l = landingBySlug(slug)
  if (!l) return null
  const [prestations, avis, faq, { coordonnees, crmInscriptionUrl }] = await Promise.all([
    getPrestations(),
    getAvis(),
    getFaq(),
    getParametres(),
  ])
  const isLead = l.variant === 'lead'
  const cible = isLead ? '#lead-form' : '#prestations'
  // CTA du header : ancré vers l'objectif de la page. Libellé court (le
  // formCtaLabel est repris s'il tient, sinon un libellé généralisé).
  const headerCta = isLead ? (l.formCtaLabel && l.formCtaLabel.length <= 18 ? l.formCtaLabel : 'Réserver') : 'S’inscrire'
  const stickyLabel = isLead ? (l.formCtaLabel ?? l.ctaLabel) : 'Choisir une prestation'
  const stickyTargets = isLead ? ['#lead-form', '#lead-form-final'] : ['#prestations']
  const pullQuoteCta = isLead ? (l.formCtaLabel ?? l.ctaLabel) : 'Choisir une prestation'
  const spotlight = l.spotlightSlug
    ? prestations.find((p) => p.slug === l.spotlightSlug)
    : undefined
  const faqItems = l.faq && l.faq.length > 0 ? faqParQuestions(faq, l.faq) : []

  return (
    <div className="bg-cream pb-16 text-ink lg:pb-0">
      {/* Barre de marque minimale : logo + appel. Aucun lien de fuite. */}
      <header className="bg-cream">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-6 py-3.5">
          <Link href="/" aria-label="Kid Sport Club, accueil" className="block shrink-0">
            <Image src="/assets/ksc-logo.png" alt="Kid Sport Club" width={640} height={427} className="block h-12 w-auto" />
          </Link>
          <Button asChild size="sm">
            <a href={cible}>{headerCta}</a>
          </Button>
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

      {/* Bienvenue (catalogue) — EditorialSplit HOME.bienvenue, sans CTA de fuite */}
      {l.bienvenue && (
        <EditorialSplit
          tone="cream"
          title={`${HOME.bienvenue.titreLigne1} ${HOME.bienvenue.titreLigne2}`}
          texte={HOME.bienvenue.texte}
          image="/assets/ksc/stages-mercredi.webp"
          imageAlt="Enfants en activité au Kid Sport Club"
        />
      )}

      {/* Spotlight prestation (lead anniversaire/stage) */}
      {spotlight && (
        <EditorialSplit
          tone="cream"
          reverse
          title={spotlight.accroche}
          texte={spotlight.intro}
          bullets={l.slug === 'stage-vacances' ? spotlight.benefices : undefined}
          image={spotlight.image}
          imageAlt={spotlight.titre}
        />
      )}

      {/* Ce qui est inclus (anniversaire) */}
      {l.inclusions && (
        <InclusionsChecklist
          tone="white"
          items={l.inclusions.items}
          image={l.inclusions.image}
          imageAlt="Table d’anniversaire dressée au Kid Sport Club"
        />
      )}

      {/* Tranches d'âge (essai, prestations) */}
      {l.tranches && <LandingAgeGroups tone="white" />}

      {/* Catalogue de prestations — CTA par bloc -> calendrier CRM */}
      {!isLead && (
        <section id="prestations" className="mx-auto max-w-[1120px] scroll-mt-6 px-6 pt-16 pb-6">
          <h2 className="mb-10 text-center font-heading text-[clamp(26px,3.4vw,38px)] font-extrabold text-marine">
            Choisissez votre <Underline>prestation</Underline>
          </h2>
          <div className="flex flex-col gap-8">
            {prestations.map((p, i) => (
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
                      <a href={crmInscriptionUrl} data-crm="placeholder">S’inscrire</a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Bande de chiffres (StatsBand marine) */}
      {l.stats && l.stats.length > 0 && <StatsBand stats={l.stats} />}

      {/* Catalogue de tarifs complet (prestations) */}
      {l.tarifsEtendus && <LandingTarifs tone="cream" />}

      {/* Comment ça se passe — étapes numérotées */}
      {l.etapes && l.etapes.length > 0 && (
        <Section tone="white">
          <Container>
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
          </Container>
        </Section>
      )}

      {/* Tarif réel */}
      {l.tarif && (
        <Section tone="cream" className="py-12 md:py-12">
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
        </Section>
      )}

      {/* --- Bas de page : l'ordre galerie/planning et la position de la
          citation diffèrent entre lead et catalogue (cf. séquences du plan). --- */}
      {isLead ? (
        <>
          {l.pullQuote && (
            <PullQuote tone="cream2" avisIndex={l.pullQuote.avisIndex} extrait={l.pullQuote.extrait} href={cible} ctaLabel={pullQuoteCta} />
          )}
          {l.galerie && l.galerie.length > 0 && <LandingGallery tone="white" images={l.galerie} />}
          {l.planning && <LandingPlanningStrip tone="cream2" />}
          {l.equipe && <LandingTeam tone="cream" />}
        </>
      ) : (
        <>
          {l.planning && <LandingPlanningStrip tone="cream2" />}
          {l.galerie && l.galerie.length > 0 && <LandingGallery tone="white" images={l.galerie} />}
          {l.equipe && <LandingTeam tone="cream" />}
          {l.pullQuote && (
            <PullQuote tone="white" avisIndex={l.pullQuote.avisIndex} extrait={l.pullQuote.extrait} href={cible} ctaLabel={pullQuoteCta} />
          )}
        </>
      )}

      {/* Vrais avis parents */}
      {l.avis && (
        <Section tone="cream2">
          <Container>
            <p className="mb-2 text-center text-sm font-bold uppercase tracking-[.06em] text-magenta">Ils nous font confiance</p>
            <h2 className="mb-9 text-center font-heading text-[clamp(24px,3vw,34px)] font-extrabold text-marine">
              Avis de <Underline>parents</Underline>
            </h2>
            {/* 6 avis : 3 colonnes x 2 rangées sur grand écran, 2 colonnes en tablette. */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {avis.map((a, index) => (
                <figure key={a.texte.slice(0, 40)} className="flex flex-col gap-4 rounded-lg border border-border bg-card p-7 shadow-sm">
                  <div className="flex gap-1" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className="fill-magenta text-magenta" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-relaxed">«&nbsp;{a.texte}&nbsp;»</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 text-sm font-semibold text-marine">
                    <AvisAvatar index={index} photo={a.photo} size={36} />
                    {a.auteur}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Mini-FAQ */}
      {faqItems.length > 0 && (
        <Section tone="cream">
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
        </Section>
      )}

      {/* Où nous trouver */}
      {l.lieu && <LandingPlace tone="white" />}

      {/* Formulaire final complet (variant lead) : remplace l'ancien CTA-ancre. */}
      {isLead && l.formFinal ? (
        <>
          <WaveDivider colorTop="var(--card)" colorBottom="var(--ksc-marine)" />
          <section className="relative overflow-hidden bg-marine px-6 py-16 text-cream">
            <TerrainLines />
            <Container className="relative">
              <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <h2 className="mb-3.5 font-heading text-[clamp(26px,3.4vw,38px)] font-extrabold text-cream">
                    Prêt à <Underline>réserver&nbsp;?</Underline>
                  </h2>
                  <p className="mb-6 text-[17px] text-cream/80">
                    30 secondes suffisent, notre équipe vous rappelle très vite.
                  </p>
                  {l.heroBullets && (
                    <ul className="mb-7 flex flex-col gap-2.5">
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
                  <Button asChild variant="outlineCream">
                    <a href={coordonnees.telephoneHref}>{coordonnees.telephone}</a>
                  </Button>
                </div>
                <div>
                  <LeadForm
                    formId="lead-form-final"
                    source={`landing-${l.slug}-final`}
                    landing={l.slug}
                    ctaLabel={l.formCtaLabel ?? l.ctaLabel}
                    withEmail
                  />
                </div>
              </div>
            </Container>
          </section>
        </>
      ) : (
        !isLead && (
          // CTA final du catalogue : renvoie vers l'objectif unique de la page.
          <Section tone="cream" className="pt-2 pb-[72px] md:pb-[72px]">
            <div className="relative mx-auto max-w-[1120px] overflow-hidden rounded-lg bg-marine px-6 py-12 text-center text-cream">
              <TerrainLines />
              <div className="relative">
                <h2 className="mb-3.5 font-heading text-[clamp(26px,3.4vw,38px)] font-extrabold text-cream">
                  Prêt à <Underline>réserver&nbsp;?</Underline>
                </h2>
                <p className="mb-7 text-[17px] text-cream/80">Choisissez votre prestation, ou appelez-nous.</p>
                <div className="flex flex-wrap justify-center gap-3.5">
                  <Button asChild>
                    <a href={cible}>Choisir une prestation</a>
                  </Button>
                  <Button asChild variant="outlineCream">
                    <a href={coordonnees.telephoneHref}>{coordonnees.telephone}</a>
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        )
      )}

      <StickyCtaBar
        href={cible}
        label={stickyLabel}
        targets={stickyTargets}
        telephoneHref={coordonnees.telephoneHref}
      />
    </div>
  )
}
