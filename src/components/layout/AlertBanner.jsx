import { useState, useEffect } from "react";
import { Megaphone, X } from "lucide-react";
import { getAlertBanner } from "../../lib/admin-storage.js";

/**
 * Bandeau d'alerte affiché en haut du site.
 * Récupère son contenu depuis Supabase (table site_settings).
 * Modifiable via l'espace admin.
 */
export default function AlertBanner() {
  const [data, setData] = useState(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const banner = await getAlertBanner();
        setData(banner);
      } catch (err) {
        console.error("Erreur chargement bandeau:", err);
      }
    })();
  }, []);

  // Ne rien afficher tant que les données ne sont pas chargées,
  // si le bandeau est désactivé, ou si le visiteur a fermé
  if (!data || !data.enabled || !data.message || closed) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--blue)",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        fontSize: 14,
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        letterSpacing: ".02em",
        position: "relative",
        zIndex: 100,
      }}
    >
      <Megaphone size={16} />
      <span>{data.message}</span>
      <button
        onClick={() => setClosed(true)}
        aria-label="Fermer l'alerte"
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          padding: 4,
          marginLeft: 8,
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
