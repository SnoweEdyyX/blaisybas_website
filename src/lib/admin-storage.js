import { supabase } from "./supabase.js";

/**
 * Couche d'accès aux paramètres du site (clé/valeur).
 * Utilisée pour : bandeau d'alerte, futures configs admin.
 */

// ─── SITE SETTINGS (clé/valeur générique) ─────────────────
export async function getSetting(key) {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  if (error) {
    console.error(`Erreur getSetting(${key}):`, error);
    return null;
  }
  return data?.value || null;
}

export async function setSetting(key, value) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// ─── BANDEAU D'ALERTE (helper dédié) ──────────────────────
export async function getAlertBanner() {
  const setting = await getSetting("alert_banner");
  return setting || { enabled: false, message: "" };
}

export async function setAlertBanner({ enabled, message }) {
  await setSetting("alert_banner", { enabled, message });
}
