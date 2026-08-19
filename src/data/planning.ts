// Planning de la rentrée de septembre 2026 — données du récap client, recopiées
// telles quelles. Activités enfants uniquement : les créneaux internes
// (« Dispo Kid / IPMS ») et l'activité adulte « Pole Dance » ont été volontairement
// omis à la demande du client — ne pas les ajouter.
// `duree` : minutes, pour la hauteur du bloc dans le calendrier de la semaine.
// Absente = 60 minutes (valeur par défaut du champ Payload homonyme).
export type Creneau = { heure: string; activite: string; age?: string; duree?: number }
export type SallePlanning = { salle: string; creneaux: Creneau[] }
export type JourPlanning = { jour: string; salles: SallePlanning[] }

export const PLANNING: JourPlanning[] = [
  {
    jour: 'Lundi',
    salles: [
      {
        salle: 'Salle Kid',
        creneaux: [
          { heure: '10h30', activite: 'Baby Gym', age: '10-36 mois' },
          { heure: '17h', activite: 'Cross Boxe', age: '3-5 ans' },
          { heure: '18h', activite: 'Multisport', age: '6-14 ans' },
        ],
      },
    ],
  },
  {
    jour: 'Mardi',
    salles: [
      {
        salle: 'Salle Kid',
        creneaux: [
          { heure: '16h15', activite: 'Baby Gym', age: '10-36 mois' },
          { heure: '17h15', activite: 'Gym Dance', age: '3-5 ans' },
          { heure: '18h', activite: 'Fit Family', age: '6-14 ans' },
        ],
      },
    ],
  },
  {
    jour: 'Mercredi',
    salles: [
      {
        salle: 'Salle Fitness',
        creneaux: [
          { heure: '10h', activite: 'Pompom' },
          { heure: '10h45', activite: 'Zumba' },
        ],
      },
      {
        salle: 'Salle Kid',
        creneaux: [
          { heure: '11h', activite: 'Gym Dance', age: '3-5 ans' },
          { heure: '14h', activite: 'Gym Accro', age: '6-14 ans' },
          { heure: '15h45', activite: 'Baby Gym', age: '10-36 mois' },
        ],
      },
      {
        salle: 'Salle Cross',
        creneaux: [{ heure: '15h', activite: 'Cross Boxe', age: '6-14 ans' }],
      },
      {
        salle: 'Bulle',
        creneaux: [{ heure: '14h', activite: 'Multisports', age: '3-5 ans' }],
      },
    ],
  },
  {
    jour: 'Jeudi',
    salles: [
      {
        salle: 'Salle Kid',
        creneaux: [{ heure: '10h30', activite: 'Baby Gym', age: '10-36 mois' }],
      },
      {
        salle: 'Salle Cross',
        creneaux: [
          { heure: '17h15', activite: 'Cross Boxe', age: '3-5 ans' },
          { heure: '18h', activite: 'Multisports', age: '6-14 ans' },
        ],
      },
    ],
  },
  {
    jour: 'Vendredi',
    salles: [
      {
        salle: 'Salle Kid',
        creneaux: [{ heure: '10h30', activite: 'Baby Gym', age: '10-36 mois' }],
      },
      {
        salle: 'Salle Cross',
        creneaux: [
          { heure: '17h15', activite: 'Multisports', age: '3-5 ans' },
          { heure: '18h', activite: 'Cross Boxe', age: '6-14 ans' },
        ],
      },
    ],
  },
  {
    jour: 'Samedi',
    salles: [
      {
        salle: 'Salle Kid',
        creneaux: [
          { heure: '9h30', activite: 'Baby Gym', age: '10-36 mois' },
          { heure: '10h30', activite: 'Baby Gym', age: '10-36 mois' },
          { heure: '11h30', activite: 'Gym Dance', age: '3-5 ans' },
        ],
      },
      {
        salle: 'Salle Cross',
        creneaux: [
          { heure: '9h30', activite: 'Pompom Girl', age: '6-14 ans' },
          { heure: '10h30', activite: 'Fit Family', age: '6-14 ans' },
        ],
      },
      {
        salle: 'Bulle',
        creneaux: [{ heure: '9h30', activite: 'Multisports', age: '3-5 ans' }],
      },
    ],
  },
]
