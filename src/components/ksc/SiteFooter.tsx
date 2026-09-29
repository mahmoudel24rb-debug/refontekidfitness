import { MapPin } from 'lucide-react'

import { FOOTER_NAV, LEGAL_NAV } from '@/data/nav'
import { getParametres, getPrestations } from '@/lib/contenu'
import TerrainLines from './TerrainLines'

// Footer KSC partagé — Tailwind intégral (l'ex-section §9 d'overrides.css
// est purgée). Fond marine secondaire (navy), lignes de terrain en filigrane,
// liens crème 85 % -> magenta clair au hover, barre légale plus sombre,
// badge de localisation Rochecorbon au-dessus de la barre légale.
const linkCls = 'self-start text-[15px] text-cream/85 transition-colors duration-150 hover:text-magenta-light'
const colTitleCls = 'mb-1.5 font-heading text-[17px] font-bold text-cream'
// Pastille ronde des réseaux sociaux : zone cliquable de 40 px, logo de 20 px,
// même survol que les liens du pied de page (magenta clair).
const socialCls =
  'grid size-10 place-items-center rounded-full bg-white/10 text-cream transition-colors duration-150 hover:text-magenta-light'
// Liens de la barre légale.
const legalCls = 'text-[13px] text-cream/85 transition-colors duration-150 hover:text-magenta-light'

// Logos officiels (tracés simple-icons), monochromes : couleur héritée du lien.
function LogoFacebook() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  )
}

function LogoInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
    </svg>
  )
}

export default async function SiteFooter() {
  const [prestations, { coordonnees, horaires }] = await Promise.all([
    getPrestations(),
    getParametres(),
  ])
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
            <a href="https://www.facebook.com" aria-label="Facebook" className={socialCls}>
              <LogoFacebook />
            </a>
            <a href="https://www.instagram.com" aria-label="Instagram" className={socialCls}>
              <LogoInstagram />
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
          {prestations.map((p) => (
            <a key={p.slug} href={`/nos-prestations/${p.slug}`} className={linkCls}>
              {p.titre}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className={colTitleCls}>Infos</span>
          <a href="/contact" className={linkCls}>
            {coordonnees.adresse}
          </a>
          <a href={coordonnees.telephoneHref} className={linkCls}>
            {coordonnees.telephone}
          </a>
          <a href={coordonnees.emailHref} className={linkCls}>
            {coordonnees.email}
          </a>
          {horaires.split(' · ').map((ligne) => (
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
            <a key={l.href} href={l.href} className={legalCls}>
              {l.label}
            </a>
          ))}
        </div>
        © 2026 Kid Sport Club Rochecorbon. Tous droits réservés. Réalisé par{' '}
        {/* Lien suivi (sans nofollow) : backlink vers le site de l'agence. */}
        <a
          href="https://dgl-agency.fr"
          target="_blank"
          rel="noopener"
          className="text-cream/85 underline underline-offset-2 transition-colors duration-150 hover:text-magenta-light"
        >
          DGL Agency
        </a>
        .
      </div>
    </footer>
  )
}
