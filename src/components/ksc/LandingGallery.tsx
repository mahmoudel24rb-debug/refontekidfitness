import React from 'react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import Section from './Section'
import Container from './Container'
import SectionHeading from './SectionHeading'

// Mosaïque asymétrique de photos réelles du club : la 1re image occupe 2×2,
// les suivantes 1×1. Grille 2 colonnes (mobile) / 4 colonnes (desktop),
// next/image en `fill` — pas de carrousel. Titre neutre « En images ».
export type GalleryImage = { src: string; alt: string }

export default function LandingGallery({
  images,
  tone = 'white',
}: {
  images: GalleryImage[]
  tone?: 'cream' | 'cream2' | 'white'
}) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading underline className="mb-9 text-center">
          En images
        </SectionHeading>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={img.src}
              className={cn(
                'relative aspect-square overflow-hidden rounded-lg border border-border bg-cream-2',
                i === 0 && 'col-span-2 row-span-2',
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={i === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 25vw, 50vw'}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
