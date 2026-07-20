import React from 'react'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Champ de formulaire KSC (Label + Input ou Textarea) — dédouble les champs
// copiés-collés de ContactKSC / SeanceEssai.
type FormFieldProps = {
  id: string
  label: string
  as?: 'input' | 'textarea'
  type?: string
  required?: boolean
  placeholder?: string
  rows?: number
  className?: string
}

const fieldClasses = 'rounded-xl border-[1.5px] border-input bg-[#fdfcf7] px-4'

export default function FormField({
  id,
  label,
  as = 'input',
  type = 'text',
  required = false,
  placeholder,
  rows,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Label htmlFor={id} className="text-sm font-semibold text-marine">
        {label}
      </Label>
      {as === 'textarea' ? (
        <Textarea
          id={id}
          name={id}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={cn(fieldClasses, 'min-h-[140px]')}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className={cn(fieldClasses, 'h-[52px]')}
        />
      )}
    </div>
  )
}
