import React from 'react'

// Soulignement « swash » signature : petit trait manuscrit magenta (SVG, 3px)
// sous le dernier mot des H2 de section. Usage :
//   <h2>Avis de <Underline>parents</Underline></h2>
// Sobre : uniquement les H2 de section, jamais les titres de cartes.
export default function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 10"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute left-[2%] -bottom-[0.28em] h-[0.22em] w-[96%]"
      >
        <path
          d="M3 7.5 Q 32 2.5 62 5 T 117 4"
          stroke="var(--ksc-magenta)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
