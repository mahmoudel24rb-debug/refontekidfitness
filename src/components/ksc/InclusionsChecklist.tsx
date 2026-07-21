import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'

// « Ce qui est inclus » : photo + checklist à grandes coches magenta.
// Les items sont des chaînes validées (bénéfices prestations + réassurance).
export default function InclusionsChecklist({
  items,
  image,
  imageAlt,
  tone = 'white',
}: {
  items: string[]
  image: string
  imageAlt: string
  tone?: 'cream' | 'cream2' | 'white'
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading underline className="mb-9 text-center">
          Ce qui est inclus
        </SectionHeading>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width:1024px) 45vw, calc(100vw - 48px)"
              className="object-cover"
            />
          </div>
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3.5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-magenta text-white">
                  <Check size={16} strokeWidth={3.5} aria-hidden="true" />
                </span>
                <span className="text-[17px] font-semibold leading-snug text-marine">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
