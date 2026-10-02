import React from 'react'
import { Candy, Ghost, Icon, Lollipop, Sparkles } from 'lucide-react'

import { araignee, chauveSouris, chaudron, citrouille, toile } from './iconesHalloween'

// Décor de nuit d'Halloween du hero des landings à thème (stages de la
// Toussaint) : bande décorative au-dessus du titre, purement visuelle
// (aria-hidden). Icônes Lucide et Lucide Lab ; les éléments secondaires
// disparaissent sur les petits écrans pour ne pas surcharger.
export default function DecorHalloween() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mx-auto mb-4 h-[92px] max-w-[1120px] select-none sm:h-[112px]">
      {/* Toile et araignée suspendue, à gauche */}
      <Icon iconNode={toile} className="absolute -top-8 -left-8 size-[130px] text-white/15 sm:size-[150px]" strokeWidth={1.2} />
      <span className="absolute top-[-48px] left-[104px] h-[92px] w-px bg-[#cfc8e6]/50 sm:left-[118px] sm:h-[100px]" />
      <Icon iconNode={araignee} className="absolute top-[40px] left-[92px] size-6 text-[#cfc8e6] sm:top-[48px] sm:left-[106px]" strokeWidth={2.4} />

      {/* Fantôme et citrouilles */}
      <Ghost className="absolute bottom-0 left-[150px] hidden size-[52px] fill-[#2a2550] text-cream sm:block" strokeWidth={1.8} />
      <Icon iconNode={citrouille} className="absolute bottom-0 left-[150px] size-[54px] fill-[#7a2e0b] text-[#ff9a4d] sm:left-[222px] sm:size-[68px]" strokeWidth={1.7} />
      <Icon iconNode={citrouille} className="absolute bottom-0 left-[208px] size-[40px] fill-[#7a2e0b] text-[#ff9a4d] sm:left-[296px] sm:size-[48px]" strokeWidth={1.8} />
      <Icon iconNode={citrouille} className="absolute bottom-0 left-[350px] hidden size-[34px] fill-[#7a2e0b] text-[#ff9a4d] md:block" strokeWidth={2} />
      <Candy className="absolute bottom-1 left-[400px] hidden size-7 text-magenta-light md:block" strokeWidth={2} />
      <Sparkles className="absolute top-3 left-[46%] hidden size-6 text-[#ff9a4d] md:block" strokeWidth={2} />
      <Icon iconNode={chaudron} className="absolute bottom-0 left-[58%] hidden size-11 fill-[#1f1147] text-[#c4b5fd] lg:block" strokeWidth={1.8} />
      <Lollipop className="absolute right-[150px] bottom-1 hidden size-7 text-magenta-light lg:block" strokeWidth={2} />

      {/* Lune et chauves-souris, à droite */}
      <span className="absolute top-0 right-3 grid size-[72px] place-items-center rounded-full bg-cream/5 sm:right-6 sm:size-[96px]">
        <span className="grid size-[54px] place-items-center rounded-full bg-cream/10 sm:size-[74px]">
          <span className="relative block size-[40px] rounded-full bg-cream sm:size-[56px]">
            <span className="absolute top-[22%] left-[22%] size-[18%] rounded-full bg-[#ece5cf]" />
            <span className="absolute right-[18%] bottom-[22%] size-[24%] rounded-full bg-[#ece5cf]" />
          </span>
        </span>
      </span>
      <Icon iconNode={chauveSouris} className="absolute top-[26px] right-[30px] size-6 fill-marine text-marine sm:top-[34px] sm:right-[46px] sm:size-8" strokeWidth={1.6} />
      <Icon iconNode={chauveSouris} className="absolute top-2 right-[96px] size-9 fill-[#7c3aed] text-[#c4b5fd] sm:right-[136px] sm:size-12" strokeWidth={1.6} />
      <Icon iconNode={chauveSouris} className="absolute top-[58px] right-[124px] hidden size-7 fill-[#7c3aed] text-[#c4b5fd] sm:block sm:right-[180px]" strokeWidth={1.6} />
    </div>
  )
}
