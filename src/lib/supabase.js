import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase centralisé.
 *
 * Les variables sont injectées au build par Vite depuis le fichier .env
 * (préfixées par VITE_ pour être exposées au frontend).
 *
 * La "publishable key" est sûre côté navigateur — la sécurité réelle est
 * assurée par les Row Level Security policies configurées dans Supabase.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    "⚠️  Variables Supabase manquantes. Créez un fichier .env à la racine avec VITE_SUPABASE_URL et VITE_SUPABASE_KEY."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const POST_IMAGES_BUCKET = "post-images";
