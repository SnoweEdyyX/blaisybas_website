# 🚀 Guide de déploiement

## Vercel + Supabase (recommandé)

### Pré-requis
- ✅ Compte GitHub
- ✅ Projet Supabase configuré (tables + bucket + politiques)
- ✅ Vos clés Supabase notées quelque part

### Étape 1 — Pousser le code sur GitHub

⚠️ **Important** : le fichier `.env` est dans `.gitignore` et ne sera **PAS** envoyé sur GitHub. C'est volontaire et sécurisé. On configurera les variables directement sur Vercel.

**Méthode A — Upload web (la plus simple)**
1. Sur github.com, créez un nouveau dépôt (Public, sans README)
2. Cliquez sur "uploading an existing file"
3. Glissez-déposez **tout le contenu** du dossier décompressé (pas le dossier lui-même)
4. Cliquez sur "Commit changes"

**Méthode B — Avec git**
```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/blaisybas_website.git
git push -u origin main
```

### Étape 2 — Importer sur Vercel

1. Allez sur [vercel.com](https://vercel.com) → connexion via GitHub
2. **Add New → Project**
3. Sélectionnez votre dépôt
4. **Avant de cliquer Deploy**, dépliez la section **Environment Variables**

### Étape 3 — Ajouter les variables d'environnement

Dans la section **Environment Variables**, ajoutez :

| Name | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://votre-projet.supabase.co` |
| `VITE_SUPABASE_KEY` | `sb_publishable_xxxxxxxxxxxxxx` |

Cochez bien **Production, Preview, Development** pour chacune.

### Étape 4 — Deploy !

Cliquez sur **Deploy**. Attendez ~1 minute.

🎉 Votre site est live sur `https://votre-projet.vercel.app`

### Étape 5 — Mises à jour automatiques

À chaque `git push`, Vercel redéploie automatiquement.

Pour modifier les variables d'environnement plus tard :
**Settings → Environment Variables → Edit**, puis Redeploy.

---

## Netlify (alternative)

Identique à Vercel, le fichier `netlify.toml` est déjà inclus.

1. [netlify.com](https://netlify.com) → Sign up with GitHub
2. **Add new site → Import from Git → GitHub → votre dépôt**
3. Dans **Site settings → Environment variables**, ajoutez les deux variables Supabase
4. **Deploy**

---

## Domaine personnalisé (optionnel, ~8€/an)

1. Achetez un domaine sur [OVH](https://ovh.com), [Gandi](https://gandi.net) ou [Namecheap](https://namecheap.com)
2. Dans Vercel : **Settings → Domains → Add**
3. Suivez les instructions DNS

---

## ⚠️ Sécurité Supabase

### Ce qui est sûr d'exposer publiquement
- ✅ `VITE_SUPABASE_URL` — c'est juste une URL
- ✅ `VITE_SUPABASE_KEY` (publishable / anon) — conçue pour le frontend

### Ce qui NE DOIT JAMAIS être dans le code frontend
- ❌ `service_role` key ou `secret` key — admin total sur la BDD
- ❌ Mot de passe de la base de données

### Les politiques RLS sont votre sécurité
Toute la sécurité repose sur les **Row Level Security policies** configurées dans Supabase.
Pour l'instant, les politiques permettent à tout le monde d'écrire dans `posts` et `reports`.
C'est suffisant pour démarrer car l'authentification se fait côté frontend.

Pour durcir plus tard (optionnel) :
- Migrer vers Supabase Auth pour vraiment authentifier les associations
- Modifier les politiques pour n'autoriser INSERT/UPDATE qu'aux users authentifiés

---

## 📊 Limites des offres gratuites

### Vercel (Hobby)
- 100 Go de bande passante / mois
- Déploiements illimités
- HTTPS automatique
- CDN mondial

### Supabase (Free)
- 500 Mo base de données
- 1 Go stockage photos
- 5 Go bande passante / mois
- 50 000 utilisateurs auth

Pour un site de village, vous êtes à des années-lumière des limites.

---

## 🆘 Problèmes courants

### "Failed to fetch" dans la console
→ Variables d'environnement mal configurées sur Vercel. Vérifiez Settings → Environment Variables et redéployez.

### Images qui ne s'affichent pas
→ Vérifiez que le bucket `post-images` est bien **Public** dans Supabase Storage.

### "Row violates RLS policy"
→ Les politiques RLS sont mal configurées. Vérifiez dans Supabase → Authentication → Policies que les 4 politiques (SELECT, INSERT, UPDATE, DELETE) existent bien sur les tables `posts` et `reports`.
