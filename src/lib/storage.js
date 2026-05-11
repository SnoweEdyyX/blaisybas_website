import { supabase, POST_IMAGES_BUCKET } from "./supabase.js";

/**
 * Couche de stockage — version Supabase.
 *
 * Toutes les fonctions sont async et parlent à la vraie BDD.
 * Les publications sont visibles par tous les visiteurs (politique RLS publique).
 */

// ─── PRÉFÉRENCES UTILISATEUR (toujours en local) ────────────
const LS_PREFIX = "blaisy:";
export function getTheme() {
  return localStorage.getItem(`${LS_PREFIX}theme`) || "light";
}
export function setTheme(theme) {
  localStorage.setItem(`${LS_PREFIX}theme`, theme);
}

// ─── POSTS D'ASSOCIATIONS ───────────────────────────────────
export async function getPosts(assocId) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("assoc_id", assocId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement posts:", error);
    return [];
  }
  return data || [];
}

export async function getAllPosts(assocIds) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .in("assoc_id", assocIds)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement tous posts:", error);
    return {};
  }

  // Regrouper par assoc_id pour compatibilité avec le code existant
  const result = {};
  assocIds.forEach((id) => (result[id] = []));
  (data || []).forEach((p) => {
    if (!result[p.assoc_id]) result[p.assoc_id] = [];
    result[p.assoc_id].push(p);
  });
  return result;
}

export async function addPost(assocId, { title, content }) {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ assoc_id: assocId, title, content }])
    .select()
    .single();

  if (error) {
    console.error("Erreur création post:", error);
    throw error;
  }
  return data;
}

export async function updatePost(postId, { title, content }) {
  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq("id", postId)
    .select()
    .single();

  if (error) {
    console.error("Erreur modification post:", error);
    throw error;
  }
  return data;
}

export async function deletePost(postId) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) {
    console.error("Erreur suppression post:", error);
    throw error;
  }
}

// ─── UPLOAD D'IMAGES ────────────────────────────────────────
/**
 * Upload une image dans le bucket post-images.
 * Retourne l'URL publique de l'image.
 */
export async function uploadImage(file, assocId) {
  // Générer un nom unique : assocId/timestamp-randomstring.ext
  const ext = file.name.split(".").pop().toLowerCase();
  const fileName = `${assocId}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(POST_IMAGES_BUCKET)
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Erreur upload image:", uploadError);
    throw uploadError;
  }

  // Récupérer l'URL publique
  const { data } = supabase.storage
    .from(POST_IMAGES_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// ─── SIGNALEMENTS CITOYENS ──────────────────────────────────
export async function addReport({ type, location, description, name }) {
  const { data, error } = await supabase
    .from("reports")
    .insert([
      {
        type,
        location,
        description,
        reporter_name: name || null,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erreur création signalement:", error);
    throw error;
  }
  return data;
}

export async function getReports() {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erreur chargement signalements:", error);
    return [];
  }
  return data || [];
}
