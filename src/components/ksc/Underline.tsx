import React from 'react'

// Soulignement « swash » signature : petit trait manuscrit magenta (SVG, 3px)
// sous le dernier mot des H2 de section. Usage :
//   <h2>Avis de <Underline>parents</Underline></h2>
// Sobre : uniquement les H2 de section, jamais les titres de cartes.
export default function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span className="ksc-underline">
      {children}
      <svg aria-hidden="true" viewBox="0 0 120 10" preserveAspectRatio="none" fill="none">
        <path
          d="M3 7.5 Q 32 2.5 62 5 T 117 4"
          stroke="#e6007e"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}
