import { useState, useCallback } from "react";
import { ASSOCIATIONS } from "../data/associations.js";

/**
 * Hook d'authentification pour les associations.
 *
 * ⚠️ Cette implémentation est volontairement SIMPLE pour la démo :
 *    - mots de passe en clair dans associations.js
 *    - état dans le state React (non persisté)
 *
 * 🚀 En production :
 *    - utiliser un vrai système d'auth (JWT, OAuth, Supabase Auth)
 *    - hash + salt des mots de passe côté serveur
 *    - sessions sécurisées (httpOnly cookies)
 */
export function useAssocAuth() {
  const [loggedAssoc, setLoggedAssoc] = useState(null);

  const login = useCallback((assocId, password) => {
    const assoc = ASSOCIATIONS.find((a) => a.id === assocId);
    if (!assoc) return { ok: false, error: "Association introuvable" };
    if (assoc.pwd !== password) return { ok: false, error: "Mot de passe incorrect" };
    setLoggedAssoc(assoc);
    return { ok: true, assoc };
  }, []);

  const logout = useCallback(() => setLoggedAssoc(null), []);

  return { loggedAssoc, login, logout, isLogged: !!loggedAssoc };
}
