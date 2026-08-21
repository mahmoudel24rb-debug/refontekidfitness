// Largeurs de carte pour les grilles en « flux centré ».
//
// Une grille CSS ne centre jamais sa dernière rangée : avec 5 cartes sur 3
// colonnes, les 2 restantes se collent à gauche et laissent un trou. On
// remplace donc `grid` par `flex flex-wrap justify-center` et on donne à chaque
// carte une largeur calculée qui tient compte du gap.
//
// Module PUR (aucun React, aucun DOM).

/** Nombre de colonnes retenu pour n cartes, plafonné à cmax (et jamais < 2). */
function colonnes(n: number, cmax: 2 | 3): 2 | 3 {
  // Rangées pleines : on garde le maximum du design.
  if (n % cmax === 0) return cmax
  // Nombre pair qui tient en deux rangées égales (4 cartes sur 3 max -> 2 x 2).
  if (n % 2 === 0 && n / 2 <= cmax) {
    const c = n / 2
    return c >= 3 ? 3 : 2
  }
  // Sinon on reste au maximum : justify-center centre la dernière rangée.
  return cmax
}

/**
 * Classes Tailwind de largeur d'une carte dans une grille flex centrée.
 *
 * Les chaînes sont écrites en dur (Tailwind ne compile pas les classes
 * construites dynamiquement).
 *
 * @param n Nombre total de cartes de la grille.
 * @param cmax Colonnes maximales prévues par le design.
 * @param gap Valeur de l'utilitaire gap du conteneur (5 = 20px, 6 = 24px).
 */
export function classesCarte(n: number, cmax: 2 | 3, gap: 5 | 6 = 6): string {
  const c = colonnes(n, cmax)
  if (c === 3) {
    return gap === 6
      ? 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
      : 'w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]'
  }
  return gap === 6 ? 'w-full sm:w-[calc(50%-12px)]' : 'w-full sm:w-[calc(50%-10px)]'
}
