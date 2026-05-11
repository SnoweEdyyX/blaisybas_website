# Blaisy-Bas — Site non officiel

Site web non officiel de la commune de Blaisy-Bas (Côte-d'Or, 21540).

## Stack technique

- **React 18** + **Vite** — UI rapide et build optimisé
- **React Router 6** — vraies URLs avec navigation côté client
- **Supabase** — base de données PostgreSQL + stockage photos
- **Tiptap** — éditeur riche WYSIWYG pour les publications
- **Lucide React** — icônes

## Installation locale

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer Supabase
# Copiez .env.example en .env et remplissez avec vos clés
cp .env.example .env

# 3. Lancer en développement
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

## Configuration Supabase

Vous avez besoin de deux variables dans le fichier `.env` :

```
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_KEY=sb_publishable_xxxxxxxxxxxxxx
```

Récupérez-les sur https://supabase.com → votre projet → Settings → API.

⚠️ N'utilisez **JAMAIS** la `secret_key` ou `service_role` côté frontend. Toujours la `publishable` (ou `anon` legacy).

## Structure du projet

```
src/
├── main.jsx                      # Bootstrap React + Router
├── App.jsx                       # Routeur principal + état global
│
├── data/                         # Données seed
│   ├── associations.js
│   ├── news.js, events.js, ...
│
├── lib/
│   ├── supabase.js               # Client Supabase
│   └── storage.js                # API de stockage (posts, reports, images)
│
├── hooks/
│   ├── useTheme.js               # Mode sombre / clair
│   ├── useAssocAuth.js           # Auth association
│   └── usePosts.js               # Cache des publications
│
├── components/
│   ├── layout/                   # Header, Footer, AlertBanner
│   ├── ui/                       # Composants réutilisables
│   └── associations/
│       ├── LoginModal.jsx
│       ├── PostEditor.jsx        # Formulaire avec Tiptap
│       ├── PostItem.jsx          # Affichage admin
│       ├── RichEditor.jsx        # Éditeur WYSIWYG Tiptap
│       └── RichViewer.jsx        # Lecture seule du contenu
│
├── pages/                        # Une page = un fichier
│   └── ...
│
└── styles/
    └── global.css                # Variables CSS + utilitaires
```

## Mots de passe de démo (associations)

| Association | Mot de passe |
|---|---|
| Tennis Club | `tennis2025` |
| Comité de Jumelage | `jumelage2025` |
| Comité de la Foire | `foire2025` |
| Harmonie | `musique2025` |
| Amis du Patrimoine | `patrimoine2025` |

⚠️ Pour la production, modifiez ces mots de passe dans `src/data/associations.js`.

## Fonctionnalités

### Pour les visiteurs
- 🏛️ Page d'accueil avec actualités et événements
- 📜 Histoire et infos du village
- 📞 Mairie : horaires, contact, conseil municipal
- 📰 Actualités, agenda, galerie
- 🛍️ Annuaire des commerces
- ⚠️ Signalement citoyen (voirie, éclairage, etc.)
- 🌙 Mode sombre / clair (préférence sauvegardée)

### Pour les associations (espace réservé)
- 🔐 Connexion par mot de passe
- ✏️ Éditeur de publication WYSIWYG (gras, italique, couleurs, tailles, alignement)
- 🖼️ Upload de photos directement dans l'éditeur
- 📹 Intégration de vidéos YouTube
- 🔗 Liens cliquables
- 📋 Listes à puces et numérotées
- 💬 Citations stylées
- ✅ Édition / suppression de ses publications

## Build & déploiement

```bash
npm run build      # Génère dist/
npm run preview    # Sert dist/ en local
```

Voir `DEPLOIEMENT.md` pour le déploiement sur Vercel/Netlify avec Supabase.
