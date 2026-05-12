import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase.js";

/**
 * Hook d'authentification administrateur.
 *
 * Utilise Supabase Auth + vérifie que l'utilisateur est bien
 * dans la table `admins` (sinon login refusé).
 */
export function useAdmin() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur connecté est bien dans la table admins
  const checkAdminStatus = useCallback(async (userId) => {
    if (!userId) {
      setIsAdmin(false);
      return false;
    }
    const { data, error } = await supabase
      .from("admins")
      .select("user_id, display_name")
      .eq("user_id", userId)
      .maybeSingle();

    if (error || !data) {
      setIsAdmin(false);
      return false;
    }
    setIsAdmin(true);
    return true;
  }, []);

  // Au chargement : vérifier s'il y a déjà une session
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session) {
        await checkAdminStatus(data.session.user.id);
      }
      setLoading(false);
    });

    // Écouter les changements de session (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
          await checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, [checkAdminStatus]);

  // Login
  const login = useCallback(
    async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { ok: false, error: error.message };
      }
      // Vérifier que c'est bien un admin
      const adminOk = await checkAdminStatus(data.user.id);
      if (!adminOk) {
        await supabase.auth.signOut();
        return {
          ok: false,
          error: "Ce compte n'a pas les droits administrateur.",
        };
      }
      return { ok: true };
    },
    [checkAdminStatus]
  );

  // Logout
  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return {
    session,
    user: session?.user,
    isAdmin: isAdmin && !!session,
    isLoggedIn: !!session,
    loading,
    login,
    logout,
  };
}
