import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Lock, LogIn, AlertCircle } from "lucide-react";
import { useAdmin } from "../../hooks/useAdmin.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAdmin, loading } = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Si déjà connecté, rediriger vers le dashboard
  if (!loading && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const result = await login(email, password);
      if (result.ok) {
        navigate("/admin");
      } else {
        setError(result.error || "Erreur de connexion");
      }
    } catch (err) {
      setError("Une erreur inattendue est survenue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
      className="grain"
    >
      <div
        style={{
          maxWidth: 440,
          width: "100%",
          background: "var(--surface)",
          padding: 48,
          border: "1px solid var(--border)",
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src="/blason.png"
            alt="Blaisy-Bas"
            style={{ width: 56, height: 64, objectFit: "contain", marginBottom: 16 }}
          />
          <div
            className="ui-font"
            style={{
              fontSize: 10,
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "var(--accent)",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Espace administrateur
          </div>
          <h1
            className="display-font"
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-.02em",
              margin: "0 0 12px",
              lineHeight: 1,
            }}
          >
            Connexion
          </h1>
          <p
            className="display-font"
            style={{
              fontSize: 17,
              fontStyle: "italic",
              color: "var(--text-muted)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Réservé aux administrateurs du site
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            required
            autoFocus
          />

          <div style={{ height: 16 }} />

          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <div
              style={{
                marginTop: 16,
                padding: 14,
                background: "rgba(220, 38, 38, 0.1)",
                border: "1px solid var(--danger)",
                color: "var(--danger)",
                fontSize: 13,
                fontFamily: "'Inter Tight', sans-serif",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
            style={{
              width: "100%",
              justifyContent: "center",
              marginTop: 24,
              opacity: submitting ? 0.6 : 1,
            }}
          >
            {submitting ? (
              "Connexion en cours…"
            ) : (
              <>
                <LogIn size={14} /> Se connecter
              </>
            )}
          </button>
        </form>

        <div
          className="ui-font"
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            marginTop: 24,
            textAlign: "center",
            letterSpacing: ".03em",
          }}
        >
          Mot de passe oublié ? Contactez l'administrateur principal.
        </div>
      </div>
    </div>
  );
}
