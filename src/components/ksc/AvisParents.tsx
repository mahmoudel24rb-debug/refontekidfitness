import React from 'react'
import { Star } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { classesCarte } from '@/lib/grilleCartes'
import AvisAvatar from './AvisAvatar'
import Kicker from './Kicker'
import SectionHeading from './SectionHeading'
import { getAvis } from '@/lib/contenu'

export default async function AvisParents() {
  const avis = await getAvis()
  return (
    <section className="bg-cream-2 px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 text-center">
          <Kicker className="mb-2.5">Ils nous font confiance</Kicker>
          <SectionHeading underline className="text-[clamp(26px,3.5vw,40px)]">
            Avis de parents
          </SectionHeading>
        </div>
        {/* 6 avis Google : 3 colonnes x 2 rangées sur grand écran. Flux centré
            pour que toute dernière rangée incomplète reste centrée. */}
        <div className="flex flex-wrap justify-center gap-6">
          {avis.map((a, i) => (
            <Card key={i} className={cn('gap-0 p-8', classesCarte(avis.length, 3, 6))}>
              <div role="img" aria-label="5 étoiles sur 5" className="mb-4 flex gap-1">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} aria-hidden="true" className="size-4 fill-magenta text-magenta" />
                ))}
              </div>
              <blockquote className="mb-[18px] flex-1 text-[15.5px] leading-relaxed text-ink">
                « {a.texte} »
              </blockquote>
              {/* Pied de carte : photo du parent (ou avatar illustré) + nom */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <AvisAvatar auteur={a.auteur} index={i} photo={a.photo} />
                <p className="text-sm font-bold text-marine">{a.auteur}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
