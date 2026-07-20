import React from 'react'

import SiteHeader from '@/components/ksc/SiteHeader'
import SiteFooter from '@/components/ksc/SiteFooter'
import AvisParents from '@/components/ksc/AvisParents'
import ActusHome from '@/components/ksc/ActusHome'
import HomeHero from './HomeHero'
import Bienvenue from './Bienvenue'
import TranchesAge from './TranchesAge'
import Activites from './Activites'
import FaqHome from './FaqHome'

// Page d'accueil reconstruite (remplace le port Framer HomePage.tsx).
// Ordre identique à la home actuelle : héros, bienvenue, tranches d'âge,
// activités, FAQ, avis parents, actus, avec le chrome partagé (header/footer).
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
        <Bienvenue />
        <TranchesAge />
        <Activites />
        <FaqHome />
        <AvisParents />
        <ActusHome />
      </main>
      <SiteFooter />
    </>
  )
}
