import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Bouton pill KSC — remplace .ksc-btn et les boutons Framer.
// Sobriété : hover = couleur/ombre uniquement (jamais de translateY/scale).
// NB : `size` est déclaré AVANT `variant` pour que le `p-0` du variant `link`
// l'emporte sur le padding de taille via tailwind-merge (dernier gagnant).
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border-2 font-bold leading-none whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-150 outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "px-[30px] py-[15px] text-base",
        sm: "px-7 py-3.5 text-[15px]",
      },
      variant: {
        primary:
          "bg-magenta border-magenta text-white hover:bg-magenta-hover hover:border-magenta-hover hover:shadow-md",
        outline:
          "border-marine text-marine bg-transparent hover:bg-marine hover:text-cream",
        outlineCream:
          "border-cream text-cream bg-transparent hover:bg-cream hover:text-marine",
        light: "bg-white border-white text-marine hover:shadow-md",
        link: "border-0 p-0 text-magenta hover:text-magenta-hover",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
