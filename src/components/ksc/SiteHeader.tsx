'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, Plus } from 'lucide-react'
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { NAV } from '@/data/nav'
import { cn } from '@/lib/utils'
import InscriptionCTA from './InscriptionCTA'

// Header KSC partagé. Charte : fond crème, logo, nav, CTA magenta.
// Dimensions validées client — ne pas les changer : conteneur max-w 1480,
// padding 18px/44px desktop (20px latéral mobile), logo h-60px, gap nav 32,
// gap CTA 22. Sticky opaque + ombre au scroll. Breakpoint mobile : lg (1024).
// Desktop : navigation-menu Radix (sous-menu Prestations au hover/focus
// clavier, clic = navigation vers le hub). Mobile : burger -> sheet à droite
// (fermeture Esc/overlay native Radix, scroll lock inclus).

// Lien nav : marine semi-gras, soulignement magenta animé (scaleX) au
// hover/focus, lien actif magenta (aria-current) — ex-§8 d'overrides.css.
const navLinkCls =
  'relative whitespace-nowrap text-base font-semibold text-marine transition-colors ' +
  'after:absolute after:inset-x-0 after:-bottom-[5px] after:h-0.5 after:rounded-full after:bg-magenta ' +
  'after:origin-left after:scale-x-0 after:transition-transform after:duration-150 ' +
  'hover:after:scale-x-100 focus-visible:after:scale-x-100 ' +
  'aria-[current=page]:text-magenta aria-[current=page]:after:scale-x-100'

// Neutralise le style « pill » par défaut du NavigationMenuLink shadcn
// (fond muted au hover/focus) : ici le feedback est le soulignement magenta.
// `text-base` : la base shadcn impose text-sm (14px) alors que le déclencheur à
// sous-menu, qui n'est pas un NavigationMenuLink, reste à 16px. Ces classes sont
// passées en `className` du NavigationMenuLink (et non sur le <a> enfant) pour
// que `cn`/twMerge les fusionne réellement : en asChild, Radix se contente de
// concaténer les deux chaînes et c'est alors text-sm qui l'emporte.
const navLinkResetCls =
  'rounded-none p-0 text-base bg-transparent hover:bg-transparent focus:bg-transparent'

// Liens du panneau mobile (sheet).
const mobileLinkCls = 'block py-3 text-[17px] font-semibold text-marine aria-[current=page]:text-magenta'
const mobileSubLinkCls = 'py-2 text-[15px] font-semibold text-marine aria-[current=page]:text-magenta'

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  // Sous-menu desktop contrôlé : Radix l'ouvre au hover, on ajoute l'ouverture
  // au focus clavier (le déclencheur est un lien, Entrée = navigation).
  const [openMenu, setOpenMenu] = useState('')
  // Panneau à 2 volets : tranche d'âge survolée (ou focalisée au clavier) dont
  // les activités s'affichent dans le volet droit.
  const [hoveredSub, setHoveredSub] = useState('')
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`))
  const current = (href: string): 'page' | undefined => (isActive(href) ? 'page' : undefined)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn('sticky top-0 z-50 bg-cream transition-shadow duration-150', scrolled && 'shadow-sm')}>
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-8 px-5 py-[18px] lg:gap-14 lg:px-11">
        <Link href="/" aria-label="Kid Sport Club, accueil" className="block shrink-0">
          <Image
            src="/assets/ksc-logo.png"
            alt="Kid Sport Club"
            width={640}
            height={427}
            priority
            className="block h-[60px] w-auto"
          />
        </Link>

        {/* Nav desktop */}
        <NavigationMenu
          viewport={false}
          delayDuration={0}
          value={openMenu}
          // À la fermeture, la tranche survolée est oubliée : le panneau
          // rouvre toujours vierge (pas de tranche surlignée, pas de volet
          // droit), au lieu de rejouer le dernier survol.
          onValueChange={(v) => {
            setOpenMenu(v)
            if (!v) setHoveredSub('')
          }}
          className="hidden lg:flex"
        >
          <NavigationMenuList className="gap-8">
            {NAV.map((item) => {
              // Volet droit : UNIQUEMENT la tranche réellement survolée ou
              // focalisée. Aucune présélection : tant que le visiteur n'a
              // survolé aucune tranche, le panneau n'affiche que le volet
              // gauche et rien n'est surligné.
              const detaillees = item.sub?.filter((s) => s.disciplines?.length) ?? []
              const detail = detaillees.find((s) => s.href === hoveredSub)
              const detailHref = detail?.href
              return (
              <NavigationMenuItem key={item.href} value={item.href}>
                {item.sub ? (
                  <>
                    {/* Déclencheur = vrai lien (asChild) : hover/focus ouvre le
                        sous-menu, clic/Entrée navigue vers le hub prestations. */}
                    <NavigationMenuPrimitive.Trigger asChild onFocus={() => setOpenMenu(item.href)}>
                      <a
                        href={item.href}
                        aria-current={current(item.href)}
                        className={cn(navLinkCls, 'inline-flex items-center gap-1.5')}
                      >
                        {item.label}
                        <ChevronDown className="size-3" aria-hidden="true" />
                      </a>
                    </NavigationMenuPrimitive.Trigger>
                    {/* pt-3 = pont de survol entre le lien et le panneau.
                        Panneau à 2 volets : les activités à gauche, les
                        activités détaillées de la tranche survolée à droite.
                        Sans tranche survolée, le volet droit n'existe pas et le
                        panneau se réduit à la largeur du volet gauche. */}
                    <NavigationMenuPrimitive.Content className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
                      <div
                        className={cn(
                          'flex max-w-[calc(100vw-40px)] rounded-lg border border-border bg-white shadow-md',
                          detail ? 'w-[720px]' : 'w-[330px]',
                        )}
                      >
                        <ul
                          className={cn(
                            'flex flex-col items-start gap-2.5 p-4',
                            detail ? 'w-[46%] shrink-0 border-r border-border' : 'w-full',
                          )}
                        >
                          {item.sub.map((s) => (
                            <li key={s.href}>
                              <NavigationMenuLink
                                asChild
                                className={cn(
                                  navLinkCls,
                                  navLinkResetCls,
                                  'text-[15px] font-bold',
                                  s.disciplines && s.href === detailHref && 'text-magenta',
                                )}
                              >
                                <a
                                  href={s.href}
                                  aria-current={current(s.href)}
                                  onMouseEnter={() => s.disciplines && setHoveredSub(s.href)}
                                  onFocus={() => s.disciplines && setHoveredSub(s.href)}
                                >
                                  {s.label}
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                        {/* Volet droit : activités de la tranche survolée. */}
                        {detail && (
                        <div className="min-w-0 flex-1 bg-cream/60 p-4">
                          <p className="mb-2.5 px-1 text-[11px] font-extrabold uppercase tracking-[.06em] text-muted-foreground">
                            {detail.label}
                          </p>
                          {/* Libellés longs (« Accueil Assistantes Maternelles ») :
                              le `whitespace-nowrap` de navLinkCls est neutralisé par
                              `whitespace-normal` (twMerge fusionne bien le groupe
                              whitespace-*), les colonnes sont en minmax(0,1fr) et
                              le lien passe en `block` pour que le texte s'y replie. */}
                          <ul className="grid grid-cols-[repeat(2,minmax(0,1fr))] gap-x-6 gap-y-2">
                            {(detail.disciplines ?? []).map((d) => (
                              <li key={d.href} className="min-w-0">
                                <NavigationMenuLink
                                  asChild
                                  className={cn(
                                    navLinkCls,
                                    navLinkResetCls,
                                    'block whitespace-normal text-[13.5px] font-semibold leading-snug',
                                  )}
                                >
                                  <a href={d.href}>{d.label}</a>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                        )}
                      </div>
                    </NavigationMenuPrimitive.Content>
                  </>
                ) : (
                  <NavigationMenuLink asChild className={cn(navLinkCls, navLinkResetCls)}>
                    <a href={item.href} aria-current={current(item.href)}>
                      {item.label}
                    </a>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTAs desktop */}
        <div className="hidden items-center gap-[22px] lg:flex">
          <a href="/seance-essai" aria-current={current('/seance-essai')} className={cn(navLinkCls, 'font-bold')}>
            Séance d’essai
          </a>
          <InscriptionCTA size="sm" />
        </div>

        {/* Burger mobile -> sheet à droite */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Menu"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full text-marine transition-colors duration-150 hover:bg-cream-2 lg:hidden"
            >
              <Menu className="size-7" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" aria-describedby={undefined} className="gap-0 overflow-y-auto bg-cream p-6 pt-12">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-1" aria-label="Navigation principale">
              {NAV.map((item) => (
                <div key={item.href}>
                  <a href={item.href} aria-current={current(item.href)} className={mobileLinkCls}>
                    {item.label}
                  </a>
                  {item.sub && (
                    <div className="mb-2 flex flex-col border-l-2 border-magenta pl-4">
                      {item.sub.map((s) => (
                        // La ligne est `relative` pour recevoir le chevron : le
                        // NOM reste un lien direct vers la fiche de la tranche,
                        // le TOGGLE est un <summary> distinct posé à sa droite
                        // (les deux ne doivent pas se disputer le même tap).
                        <div key={s.href} className="relative">
                          <a
                            href={s.href}
                            aria-current={current(s.href)}
                            className={cn(mobileSubLinkCls, 'block', s.disciplines?.length && 'pr-11')}
                          >
                            {s.label}
                          </a>
                          {/* Activités de la tranche : repliées par défaut.
                              Idiome maison details/summary (cf. Faq.tsx), pas de
                              dépendance supplémentaire. Le <summary> est bien le
                              premier enfant du <details> (HTML valide) et n'est
                              superposé à la ligne que visuellement ; la liste,
                              elle, se déplie dans le flux, sous la ligne. */}
                          {s.disciplines && s.disciplines.length > 0 && (
                            <details className="group">
                              <summary
                                aria-label={`Afficher les activités ${s.label}`}
                                className="absolute right-0 top-0 flex h-[38px] w-10 cursor-pointer list-none items-center justify-center rounded-full text-magenta [&::-webkit-details-marker]:hidden"
                              >
                                <Plus
                                  aria-hidden="true"
                                  className="size-[18px] transition-transform group-open:rotate-45"
                                />
                              </summary>
                              <ul className="mb-1 flex flex-col pl-3.5">
                                {s.disciplines.map((d) => (
                                  <li key={d.href}>
                                    <a
                                      href={d.href}
                                      className="block py-1 text-[14px] font-medium text-muted-foreground"
                                    >
                                      {d.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href="/seance-essai"
                aria-current={current('/seance-essai')}
                className="block py-3 text-base font-bold text-marine aria-[current=page]:text-magenta"
              >
                Séance d’essai
              </a>
              <InscriptionCTA className="mt-2 w-full" />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
