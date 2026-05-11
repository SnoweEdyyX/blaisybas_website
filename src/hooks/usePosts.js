import { useState, useEffect, useCallback } from "react";
import * as storage from "../lib/storage.js";
import { ASSOCIATIONS } from "../data/associations.js";

/**
 * Hook qui maintient tous les posts de toutes les associations en mémoire.
 * Les données viennent de Supabase.
 */
export function useAllPosts() {
  const [allPosts, setAllPosts] = useState({});
  const [loading, setLoading] = useState(true);

  const reloadAll = useCallback(async () => {
    setLoading(true);
    const ids = ASSOCIATIONS.map((a) => a.id);
    const data = await storage.getAllPosts(ids);
    setAllPosts(data);
    setLoading(false);
  }, []);

  const reloadOne = useCallback(async (assocId) => {
    const posts = await storage.getPosts(assocId);
    setAllPosts((prev) => ({ ...prev, [assocId]: posts }));
  }, []);

  useEffect(() => {
    reloadAll();
  }, [reloadAll]);

  return { allPosts, loading, reloadOne, reloadAll };
}
