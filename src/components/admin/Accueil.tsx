import React from 'react'
import type { ServerProps } from 'payload'
import { Link } from '@payloadcms/ui'
import {
  BadgeEuro,
  CalendarDays,
  ExternalLink,
  Image as IconeImage,
  LifeBuoy,
  PenLine,
  RefreshCw,
  Settings,
  Volleyball,
  type LucideIcon,
} from 'lucide-react'

// Accueil de l'admin (admin.components.beforeDashboard), affiché au-dessus des
// cartes de collections : salutation, raccourcis vers les tâches courantes et
// conseils. Composant serveur. Styles : src/app/(payload)/custom.css (.ksc-*).

type Raccourci = {
  titre: string
  detail?: string
  href: string
  Icone: LucideIcon
  nouvelOnglet?: boolean
}

const RACCOURCIS: Raccourci[] = [
  { titre: 'Modifier le planning', href: '/admin/collections/planning', Icone: CalendarDays },
  { titre: 'Les tarifs', href: '/admin/collections/tarifs', Icone: BadgeEuro },
  { titre: 'Écrire un article', href: '/admin/collections/articles/create', Icone: PenLine },
  { titre: 'Les activités et les cours', href: '/admin/collections/prestations', Icone: Volleyball },
  {
    titre: 'Paramètres du site',
    detail: 'Coordonnées, horaires, liens de réservation',
    href: '/admin/globals/parametres',
    Icone: Settings,
  },
  { titre: 'Voir le site', href: '/', Icone: ExternalLink, nouvelOnglet: true },
]

const CONSEILS: { texte: string; Icone: LucideIcon }[] = [
  { texte: 'Chaque enregistrement met le site à jour immédiatement', Icone: RefreshCw },
  { texte: 'Les images : ajoutez un texte alternatif', Icone: IconeImage },
  { texte: 'Besoin d’aide : contacter DGL Agency', Icone: LifeBuoy },
]

export function Accueil({ user }: Pick<ServerProps, 'user'>) {
  // Nom du compte, sinon la partie de l'email avant « @ ».
  const nom = user?.nom?.trim() || user?.email?.split('@')[0] || ''

  return (
    <section className="ksc-accueil" aria-labelledby="ksc-accueil-titre">
      <div className="ksc-accueil__carte">
        <h1 id="ksc-accueil-titre" className="ksc-accueil__titre">
          {nom ? `Bonjour ${nom}` : 'Bonjour'}
        </h1>
        <ul className="ksc-raccourcis">
          {RACCOURCIS.map(({ titre, detail, href, Icone, nouvelOnglet }) => (
            <li key={href}>
              <Link
                className="ksc-raccourci"
                href={href}
                prefetch={false}
                {...(nouvelOnglet ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="ksc-raccourci__icone" aria-hidden="true">
                  <Icone />
                </span>
                <span className="ksc-raccourci__texte">
                  <span className="ksc-raccourci__titre">{titre}</span>
                  {detail && <span className="ksc-raccourci__detail">{detail}</span>}
                  {nouvelOnglet && <span className="sr-only"> (nouvel onglet)</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <ul className="ksc-conseils" aria-label="Conseils">
        {CONSEILS.map(({ texte, Icone }) => (
          <li key={texte} className="ksc-conseil">
            <Icone aria-hidden="true" />
            <span>{texte}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
