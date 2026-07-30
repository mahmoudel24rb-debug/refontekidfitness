This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Payload CMS 3 — mode fallback (aucune base pour l'instant)

Le contenu éditorial est administrable via Payload 3, **mais aucune base n'est
provisionnée aujourd'hui**. Conséquences, à connaître avant de tester :

- **Sans `DATABASE_URL`, le site fonctionne exactement comme avant** : `npm run
  build`, `npx tsc --noEmit`, `npm run lint` et les 31 pages prérendues sont
  identiques, sans aucune variable d'environnement.
- **`/admin` ne fonctionne PAS sans base : c'est attendu.** L'écran de connexion
  a besoin de la table `users` ; il renverra une erreur de connexion Postgres
  tant que `DATABASE_URL` n'est pas posée. Ce n'est pas une régression.
- Les pages lisent `src/lib/contenu.ts` : chaque fetcher n'appelle Payload que si
  une URL de base est définie, dans un `try/catch`, et **retombe sur les fichiers
  `src/data/*`** si la base est absente, injoignable ou si la collection est
  vide. Ces fichiers restent la source de secours permanente et la source des
  seeds (`scripts/seed-ksc.mjs`, non destructif).
- Les pages concernées sont en ISR (`revalidate = 60`).

Détails, liste des collections et **checklist du jour où la base Neon arrive** :
voir `DOCUMENTATION.md` § 11. Variables d'environnement : `.env.example`.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
