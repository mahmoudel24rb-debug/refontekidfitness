import PlanningKSC from '@/components/ksc/PlanningKSC'

// ISR : créneaux administrables (collection `planning`).
// Sans base, le contenu prérendu est celui des fichiers src/data.
export const revalidate = 60

export const metadata = {
  title: 'Planning des cours | Kid Sport Club Rochecorbon',
  description:
    "Le planning des cours du Kid Sport Club à Rochecorbon : Baby Gym, Gym Dance, Multisports, Cross Boxe, Fit Family… Rentrée de septembre 2026.",
  alternates: { canonical: '/planning' },
}

export default function Page() {
  return <PlanningKSC />
}
