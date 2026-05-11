import { useState } from "react";
import { Megaphone, X } from "lucide-react";

/**
 * Bandeau d'alerte affiché en haut de page.
 * En production, le message viendrait d'un endpoint (CMS, JSON statique...).
 */
export default function AlertBanner({ message }) {
  const [visible, setVisible] = useState(true);
  if (!visible || !message) return null;

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
      <span>{message}</span>
      <button
        onClick={() => setVisible(false)}
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
