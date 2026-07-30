/* Crée le premier utilisateur admin (une seule fois : ne fait rien si un user existe).
   Usage : npm run payload -- run scripts/create-admin.mjs
   Le mot de passe est lu depuis ADMIN_PASSWORD (env), l'email depuis ADMIN_EMAIL. */
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const payload = await getPayload({ config })
const { totalDocs } = await payload.count({ collection: 'users' })
if (totalDocs > 0) {
  console.log(`Déjà ${totalDocs} utilisateur(s), rien à faire`)
  process.exit(0)
}
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
if (!email || !password) {
  console.error('ADMIN_EMAIL et ADMIN_PASSWORD requis')
  process.exit(1)
}
await payload.create({ collection: 'users', data: { email, password, role: 'admin', nom: 'DGL Agency' } })
console.log(`Admin créé : ${email}`)
process.exit(0)
