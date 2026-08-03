import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ancre lisible à partir d'un libellé : minuscules, accents retirés,
 * « & » remplacé par « et », espaces en tirets.
 * Ex. : « Kid Gym & Dance » -> kid-gym-et-dance, « Fit’ Family » -> fit-family.
 * Utilisé pour les ancres des disciplines (fiche + sous-menu + chips du hub) :
 * la même fonction doit être appelée des deux côtés du lien.
 */
export function slugifie(texte: string) {
  return texte
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/&/g, ' et ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
