import React from 'react'

import { cn } from '@/lib/utils'

// Conteneur centré : 1200px par défaut, 1480px en `wide` (héros, grilles larges).
type ContainerProps = React.ComponentProps<'div'> & {
  wide?: boolean
}

export default function Container({ wide = false, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('mx-auto w-full', wide ? 'max-w-[1480px]' : 'max-w-[1200px]', className)}
      {...props}
    />
  )
}
