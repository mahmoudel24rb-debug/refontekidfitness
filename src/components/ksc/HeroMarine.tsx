import React from 'react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Kicker from './Kicker'
import TerrainLines from './TerrainLines'

// Hero intérieur unifié : bande marine unie + lignes de terrain (signature),
// kicker magenta clair, titre display crème, sous-titre crème 80 %.
//
// Deux variantes :
// - centrée (par défaut) : kicker + h1 + sous-titre + children (CTAs) ;
// - image : grid 2 colonnes >= lg, texte à gauche, photo à droite dans un
//   cadre rounded-xl incliné -2deg (0 en mobile), ombre marine profonde,
//   badge d'âge flottant sur le coin haut-gauche de la photo.
// Tout est en flux normal (grid, hauteurs auto — aucune hauteur fixe).
//
// NB coexistence : tant que framer.css (non layeré) vit, ses règles globales
// `h1..h6,p{margin:0}` priment sur les utilities Tailwind (layerées) —
// les marges posées sur des <p> portent donc le modificateur `!`.

// Paddings de section réellement utilisés par les pages actuelles (valeurs
// héritées de la v2, passées en prop par les pages non migrées). Typage fermé :
// la valeur doit exister ici pour que la classe soit générée par Tailwind (JIT).
// Les pages migrées (phases 4-5) normaliseront ces valeurs.
const SECTION_PADDING = {
  '78px 24px': 'px-6 py-[78px]',
  '72px 24px': 'px-6 py-[72px]',
  '64px 24px 72px': 'px-6 pt-16 pb-[72px]',
  '72px 24px 84px': 'px-6 pt-[72px] pb-[84px]',
  '72px 24px 128px': 'px-6 pt-[72px] pb-32',
} as const

// Largeurs de contenu de la variante centrée (même principe que ci-dessus).
const CONTENT_WIDTH = {
  640: 'max-w-[640px]',
  760: 'max-w-[760px]',
  820: 'max-w-[820px]',
} as const

type Props = {
  kicker?: React.ReactNode
  title: React.ReactNode
  sub?: React.ReactNode
  children?: React.ReactNode // boutons / badges optionnels
  padding?: keyof typeof SECTION_PADDING
  maxWidth?: keyof typeof CONTENT_WIDTH
  image?: string
  imageAlt?: string
  badge?: React.ReactNode // pill d'âge posée sur la photo (variante image)
}

export default function HeroMarine({
  kicker: kick,
  title,
  sub,
  children,
  padding = '78px 24px',
  maxWidth = 820,
  image,
  imageAlt,
  badge,
}: Props) {
  if (image) {
    return (
      <section className={cn('relative overflow-hidden bg-marine text-cream', SECTION_PADDING[padding])}>
        <TerrainLines />
        <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            {kick && (
              <Kicker dark className="mb-3.5!">
                {kick}
              </Kicker>
            )}
            <h1 className="font-heading text-[clamp(36px,4.5vw,60px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-cream">
              {title}
            </h1>
            {sub && <p className="mt-[18px]! max-w-[560px] text-[19px] leading-[1.65] text-cream/80">{sub}</p>}
            {children && <div className="mt-[30px] flex flex-wrap gap-3.5">{children}</div>}
          </div>
          <div className="relative lg:-rotate-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_24px_48px_rgba(4,10,34,0.45)]">
              <Image
                src={image}
                alt={imageAlt ?? ''}
                fill
                sizes="(min-width: 1280px) 545px, (min-width: 1024px) 45vw, calc(100vw - 48px)"
                className="object-cover"
              />
            </div>
            {badge && (
              // Pill blanche sur la photo (lisibilité sur image, cf. charte v2).
              <Badge variant="ageDark" className="absolute top-[18px] left-[18px] bg-white text-marine shadow-md">
                {badge}
              </Badge>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={cn('relative overflow-hidden bg-marine text-center text-cream', SECTION_PADDING[padding])}
    >
      <TerrainLines />
      <div className={cn('relative mx-auto', CONTENT_WIDTH[maxWidth])}>
        {kick && (
          <Kicker dark className="mb-3.5!">
            {kick}
          </Kicker>
        )}
        <h1 className="font-heading text-[clamp(32px,5vw,54px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-cream">
          {title}
        </h1>
        {sub && <p className="mx-auto! mt-4! max-w-[720px] text-lg leading-[1.65] text-cream/80">{sub}</p>}
        {children && <div className="mt-[30px] flex flex-wrap justify-center gap-3.5">{children}</div>}
      </div>
    </section>
  )
}
