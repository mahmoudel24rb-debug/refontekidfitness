import React from 'react'
import { MapPin } from 'lucide-react'

import { FOOTER_NAV, LEGAL_NAV } from '@/data/nav'
import { PRESTATIONS } from '@/data/prestations'
import { COORDONNEES, HORAIRES } from '@/data/site'
import { cn } from '@/lib/utils'
import TerrainLines from './TerrainLines'

// Footer KSC partagé — Tailwind intégral (l'ex-section §9 d'overrides.css
// est purgée). Fond marine secondaire (navy), lignes de terrain en filigrane,
// liens crème 85 % -> magenta clair au hover, barre légale plus sombre,
// badge de localisation Rochecorbon au-dessus de la barre légale.
const linkCls = 'self-start text-[15px] text-cream/85 transition-colors duration-150 hover:text-magenta-light'
const colTitleCls = 'mb-1.5 font-heading text-[17px] font-bold text-cream'

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-cream">
      <TerrainLines opacity={0.045} />
      <div className="relative mx-auto grid max-w-[1320px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-6 pt-16 pb-7">
        <div className="flex flex-col gap-4">
          <span className="font-heading text-2xl font-extrabold text-cream">Kid Sport Club</span>
          {/* text-xs : parité avec le rendu actuel (taille héritée du body 12px
              de framer.css) — à réévaluer à la purge Framer (phase 3d). */}
          <p className="max-w-[280px] text-xs leading-[1.6] text-cream/85">
            Le club de sport des enfants de 10 mois à 14 ans, à Rochecorbon : bouger, grandir, s’épanouir.
          </p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com" aria-label="Facebook" className={cn(linkCls, 'font-bold')}>
              Facebook
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram" className={cn(linkCls, 'font-bold')}>
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={colTitleCls}>Navigation</span>
          {FOOTER_NAV.map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={colTitleCls}>Nos activités</span>
          {PRESTATIONS.map((p) => (
            <a key={p.slug} href={`/nos-prestations/${p.slug}`} className={linkCls}>
              {p.titre}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={colTitleCls}>Infos</span>
          <a href="/contact" className={linkCls}>
            {COORDONNEES.adresse}
          </a>
          <a href={COORDONNEES.telephoneHref} className={linkCls}>
            {COORDONNEES.telephone}
          </a>
          <a href={COORDONNEES.emailHref} className={linkCls}>
            {COORDONNEES.email}
          </a>
          {HORAIRES.split(' · ').map((ligne) => (
            <span key={ligne} className="self-start text-[15px] text-cream/85">{ligne}</span>
          ))}
        </div>
      </div>

      {/* Badge localisation (info existante), au-dessus de la barre légale */}
      <div className="relative mx-auto flex max-w-[1320px] justify-center px-6 pb-[26px]">
        <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-cream/60">
          <MapPin size={15} aria-hidden="true" />
          Club à Rochecorbon, bord de Loire
        </span>
      </div>

      <div className="relative bg-[#0a1a4f] px-6 py-[18px] text-center text-[13px] text-cream/75">
        <div className="mb-2 flex flex-wrap justify-center gap-4">
          {LEGAL_NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-cream/85 transition-colors duration-150 hover:text-magenta-light"
            >
              {l.label}
            </a>
          ))}
        </div>
        © 2026 Kid Sport Club Rochecorbon. Tous droits réservés. Réalisé par DGL Agency.
      </div>
    </footer>
  )
}
