import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Badge pill KSC — unifie les 4+ variantes de badges du site :
// age (tranches d'âge sur fond clair), ageDark (fond marine),
// brand (mise en avant magenta), neutral (défaut).
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-bold leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        age: "bg-royal/10 text-royal",
        ageDark: "bg-white/15 text-white",
        brand: "bg-magenta text-white shadow-md",
        neutral: "bg-white text-marine border border-border",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
)

function Badge({
  className,
  variant = "neutral",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
