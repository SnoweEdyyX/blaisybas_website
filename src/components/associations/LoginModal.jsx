import { useState } from "react";
import { Lock, LogIn } from "lucide-react";

/**
 * Modal de connexion pour une association.
 *
 * @param assoc - L'association à laquelle se connecter (objet ASSOCIATIONS[i])
 * @param onClose - Callback fermeture
 * @param onLogin - Callback (assoc, pwd) → { ok, error? }
 */
export default function LoginModal({ assoc, onClose, onLogin }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const result = onLogin(assoc.id, pwd);
    if (!result.ok) setError(result.error || "Erreur de connexion");
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.7)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg)",
          padding: 48,
          maxWidth: 480,
          width: "100%",
          border: `2px solid ${assoc.color}`,
        }}
      >
        <Lock size={32} color={assoc.color} strokeWidth={1.4} />
        <h3
          className="display-font"
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: "16px 0 8px",
            letterSpacing: "-.02em",
          }}
        >
          Espace réservé
        </h3>
        <p
          className="display-font"
          style={{
            fontSize: 18,
            color: "var(--text-muted)",
            marginBottom: 32,
            lineHeight: 1.4,
          }}
        >
          Connexion pour les administrateurs de <b>{assoc.name}</b>
        </p>

        <label>Mot de passe</label>
        <input
          type="password"
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="••••••••"
          autoFocus
        />

        {error && (
          <div
            style={{
              color: "var(--danger)",
              fontSize: 13,
              marginTop: 12,
              fontFamily: "Inter Tight, sans-serif",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="btn-primary"
          style={{ marginTop: 24, width: "100%", justifyContent: "center" }}
        >
          <LogIn size={14} /> Se connecter
        </button>

        <div
          className="ui-font"
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          Mot de passe oublié ? Contactez la mairie.
        </div>

        <div
          className="ui-font"
          style={{
            fontSize: 10,
            color: "var(--text-muted)",
            marginTop: 24,
            padding: 12,
            background: "var(--bg-alt)",
            letterSpacing: ".05em",
          }}
        >
          <b>Démonstration</b> · mot de passe :{" "}
          <code
            style={{
              background: "var(--bg)",
              padding: "2px 6px",
              border: "1px solid var(--border)",
            }}
          >
            {assoc.pwd}
          </code>
        </div>
      </div>
    </div>
  );
}
