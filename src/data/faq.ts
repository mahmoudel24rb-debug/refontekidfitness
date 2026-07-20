// Q/R de la FAQ (page /faq) — textes du récap client, recopiés au caractère près.
// Le JSON-LD FAQPage sérialise `q`/`r` bruts : ne jamais altérer ces chaînes.
export type FaqItem = {
  q: string
  r: string
  // Rend le libellé « page tarifs » de la réponse cliquable (→ /tarifs) dans le
  // composant. Le texte `r` reste brut (le lien n'existe que dans le rendu, pas
  // dans le JSON-LD).
  lienTarifs?: boolean
}

export const FAQ: FaqItem[] = [
  { q: 'À partir de quel âge mon enfant peut-il commencer ?', r: "Dès 10 mois, avec nos cours adaptés aux tout-petits, jusqu’à 14 ans." },
  { q: 'Puis-je assister à une séance d’essai avant de m’inscrire ?', r: "Oui, la séance d’essai est gratuite. Elle se réserve directement auprès de notre équipe, qui vous recontacte pour fixer le créneau." },
  { q: 'Comment s’inscrire à un cours à l’année ?', r: "L’inscription se fait en ligne ou directement auprès de notre équipe, qui vous accompagne dans le choix de la formule adaptée à votre enfant." },
  { q: 'Quels sont vos tarifs ?', r: "Nos formules démarrent à 29,90 €/mois (1 cours/semaine, engagement 10 mois). Nous proposons aussi une formule illimitée, une carte de 10 séances, ainsi que des tarifs spécifiques pour les Mercredis Sportifs, les stages vacances et les anniversaires. Le détail complet est disponible sur notre page tarifs.", lienTarifs: true },
  { q: 'Les Mercredis Sportifs, qu’est-ce que c’est exactement ?', r: "Une journée sportive et encadrée, tous les mercredis de l’année scolaire (hors vacances d’été), pour 95 €/mois." },
  { q: 'Proposez-vous des stages pendant les vacances scolaires ?', r: "Oui, à la journée (35 €) ou à la semaine (150 €), avec des activités sportives variées encadrées par notre équipe." },
  { q: 'Comment organiser l’anniversaire de mon enfant chez vous ?', r: "Formule de 2h pour un maximum de 10 enfants, à 250 €. Le gâteau, la décoration et les boissons sont inclus — vous n’avez rien à prévoir." },
  { q: 'Le club est-il uniquement à Rochecorbon ?', r: "Oui, Kid Sport Club est basé exclusivement à Rochecorbon (1 Quai de la Loire, 37210 Rochecorbon)." },
]
