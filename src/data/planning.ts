// Planning de la rentrée de septembre 2026 — données du récap client, recopiées
// telles quelles. Activités enfants uniquement : les créneaux internes
// (« Dispo Kid / IPMS ») et l'activité adulte « Pole Dance » ont été volontairement
// omis à la demande du client — ne pas les ajouter.
// `duree` : minutes, pour la hauteur du bloc dans le calendrier de la semaine.
// Absente = 60 minutes (valeur par défaut du champ Payload homonyme).
// Retour client n5 : durée réelle de chaque cours, renseignée créneau par
// créneau (45 min pour Baby Gym, Gym Dance, Cross Boxe, Pompom, Pompom Girl et
// Zumba ; 1h pour Multisports, Fit Family et Gym Accro).
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
          { heure: '10h30', activite: 'Baby Gym', age: '10-36 mois', duree: 45 },
          { heure: '17h', activite: 'Cross Boxe', age: '3-5 ans', duree: 45 },
          { heure: '18h', activite: 'Multisports', age: '6-14 ans', duree: 60 },
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
          { heure: '16h15', activite: 'Baby Gym', age: '10-36 mois', duree: 45 },
          { heure: '17h15', activite: 'Gym Dance', age: '3-5 ans', duree: 45 },
          { heure: '18h', activite: 'Fit Family', age: '6-14 ans', duree: 60 },
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
          { heure: '10h', activite: 'Pompom', duree: 45 },
          { heure: '10h45', activite: 'Zumba', duree: 45 },
        ],
      },
      {
        salle: 'Salle Kid',
        creneaux: [
          { heure: '11h', activite: 'Gym Dance', age: '3-5 ans', duree: 45 },
          { heure: '14h', activite: 'Gym Accro', age: '6-14 ans', duree: 60 },
          { heure: '15h45', activite: 'Baby Gym', age: '10-36 mois', duree: 45 },
        ],
      },
      {
        salle: 'Salle Cross',
        creneaux: [{ heure: '15h', activite: 'Cross Boxe', age: '6-14 ans', duree: 45 }],
      },
      {
        salle: 'Bulle',
        creneaux: [{ heure: '14h', activite: 'Multisports', age: '3-5 ans', duree: 60 }],
      },
    ],
  },
  {
    jour: 'Jeudi',
    salles: [
      {
        salle: 'Salle Kid',
        creneaux: [{ heure: '10h30', activite: 'Baby Gym', age: '10-36 mois', duree: 45 }],
      },
      {
        salle: 'Salle Cross',
        creneaux: [
          { heure: '17h15', activite: 'Cross Boxe', age: '3-5 ans', duree: 45 },
          { heure: '18h', activite: 'Multisports', age: '6-14 ans', duree: 60 },
        ],
      },
    ],
  },
  {
    jour: 'Vendredi',
    salles: [
      {
        salle: 'Salle Kid',
        creneaux: [{ heure: '10h30', activite: 'Baby Gym', age: '10-36 mois', duree: 45 }],
      },
      {
        salle: 'Salle Cross',
        creneaux: [
          { heure: '17h15', activite: 'Multisports', age: '3-5 ans', duree: 60 },
          { heure: '18h', activite: 'Cross Boxe', age: '6-14 ans', duree: 45 },
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
          { heure: '9h30', activite: 'Baby Gym', age: '10-36 mois', duree: 45 },
          { heure: '10h30', activite: 'Baby Gym', age: '10-36 mois', duree: 45 },
          { heure: '11h30', activite: 'Gym Dance', age: '3-5 ans', duree: 45 },
        ],
      },
      {
        salle: 'Salle Cross',
        creneaux: [
          { heure: '9h30', activite: 'Pompom Girl', age: '6-14 ans', duree: 45 },
          { heure: '10h30', activite: 'Fit Family', age: '6-14 ans', duree: 60 },
        ],
      },
      {
        salle: 'Bulle',
        creneaux: [{ heure: '9h30', activite: 'Multisports', age: '3-5 ans', duree: 60 }],
      },
    ],
  },
]
