# MAN BOIS KINSHASA

Site e-commerce de bois d'œuvre à Kinshasa — Next.js 16, React 19, Tailwind CSS 4.

## Démarrage local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement sur Vercel

1. Poussez le projet sur GitHub
2. Importez le dépôt sur [vercel.com/new](https://vercel.com/new)
3. Vercel détecte automatiquement Next.js — cliquez **Deploy**
4. (Optionnel) Ajoutez la variable d'environnement :
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `243810000000` (votre numéro WhatsApp business)

```bash
# Ou via CLI
npm i -g vercel
vercel
```

## Administration

- URL : `/admin`
- Première visite : formulaire **« Prête à configurer »** (vous choisissez vos identifiants)
- Tableau de bord : catalogue, commandes, coordonnées, WhatsApp

## Fonctionnalités client

- Catalogue par catégories : **Charpente**, **Menuiserie**, **Coffrage**
- Filtres par essence (Iroko, Wenge, Padouk)
- Panier avec bouton **Commander sur WhatsApp** (message automatique)
- Langues : FR / Lingala / EN — thème clair/sombre
- Politique de confidentialité : `/confidentialite`

## Structure

```
data/categories.js    → Catégories bois
data/bois.js          → Catalogue produits
lib/whatsapp.ts         → Message et lien WhatsApp
vercel.json           → Config déploiement Vercel
.env.example          → Variables d'environnement
```
