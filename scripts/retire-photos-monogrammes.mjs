/* Retire les photos-monogrammes Google des avis (retour aux avatars illustrés
   de la charte) et harmonise « Kid Fitness » -> « Kid Sport Club » dans l'avis
   d'Émilie (même pratique que le récap client sur l'avis de Marion).
   NON DESTRUCTIF : updates ciblés loggés, rejouable.
   Usage : npm run payload -- run scripts/retire-photos-monogrammes.mjs */
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const payload = await getPayload({ config })
const { docs } = await payload.find({ collection: 'avis', limit: 100 })
let maj = 0
for (const d of docs) {
  const data = {}
  if (d.photo) data.photo = ''
  if (typeof d.texte === 'string' && d.texte.includes('Kid Fitness offre')) {
    data.texte = d.texte.replace('Kid Fitness offre', 'Kid Sport Club offre')
  }
  if (Object.keys(data).length > 0) {
    await payload.update({ collection: 'avis', id: d.id, data })
    console.log(`- MAJ « ${d.auteur} » :`, Object.keys(data).join(', '))
    maj++
  }
}
console.log(`Terminé : ${maj} mise(s) à jour sur ${docs.length} avis.`)
process.exit(0)
