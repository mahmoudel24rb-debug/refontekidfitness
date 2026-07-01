import sharp from 'sharp'
import fs from 'node:fs'

const SRC = 'c:/Users/dglco/Documents/refonte parc beauregard/refonte kid fitness/zip kid fitness/'
const OUT = 'public/assets/ksc/'
fs.mkdirSync(OUT, { recursive: true })

// source (dans le zip) -> nom de destination (webp)
const MAP = [
  ['image accueil 3.png', 'hero.webp'],
  // prestations
  ['garderie.jpg', 'garderie.webp'],
  ['stages sportifs.png', 'stages-vacances.webp'],
  ['anniversaire sportif.png', 'anniversaire.webp'],
  ['10-36 mois.png', 'cours-10-36-mois.webp'],
  ['3-5 ans.png', 'cours-3-5-ans.webp'],
  ['6-10 ans.png', 'cours-6-10-ans.webp'],
  ['11-14 ans.png', 'cours-11-14-ans.webp'],
  // activités (home)
  ['baby spa.png', 'baby-spa.webp'],
  ['parents enfants.png', 'fit-parents-enfants.webp'],
  ['stages du mercredi.png', 'stages-mercredi.webp'],
  ['collectivités et maternelle.png', 'collectivites.webp'],
  ['anniversaire.png', 'anniversaire-gateau.webp'],
  ['garderie ou stages vacances.jpg', 'esprit-equipe.webp'],
]

let ok = 0
for (const [src, dst] of MAP) {
  const p = SRC + src
  if (!fs.existsSync(p)) { console.log('MANQUE:', src); continue }
  const w = dst === 'hero.webp' ? 1600 : 1200
  const info = await sharp(p).rotate().resize(w, null, { withoutEnlargement: true }).webp({ quality: 82 }).toFile(OUT + dst)
  console.log(`${dst.padEnd(26)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)}Ko`)
  ok++
}
console.log('---', ok, 'images converties dans', OUT)
