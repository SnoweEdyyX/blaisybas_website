import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Megaphone, Save, ChevronLeft, Check, X } from "lucide-react";
import { getAlertBanner, setAlertBanner } from "../../lib/admin-storage.js";

export default function AdminBanner() {
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedJustNow, setSavedJustNow] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAlertBanner();
        setEnabled(data.enabled);
        setMessage(data.message || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setAlertBanner({ enabled, message: message.trim() });
      setSavedJustNow(true);
      setTimeout(() => setSavedJustNow(false), 3000);
    } catch (err) {
      alert("Erreur lors de la sauvegarde : " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          color: "var(--text-muted)",
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 14,
        }}
      >
        Chargement…
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <Link
        to="/admin"
        className="ui-font"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 11,
          letterSpacing: ".15em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          fontWeight: 600,
          marginBottom: 24,
        }}
      >
        <ChevronLeft size={14} /> Retour au dashboard
      </Link>

      <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 240 }}>
        <span>Communication</span>
      </div>
      <h1
        className="display-font"
        style={{
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: "-.03em",
          margin: "0 0 8px",
          lineHeight: 1,
        }}
      >
        Bandeau <span style={{ fontStyle: "italic", color: "var(--accent)" }}>d'alerte</span>
      </h1>
      <p
        className="display-font"
        style={{
          fontSize: 18,
          fontStyle: "italic",
          color: "var(--text-muted)",
          margin: "0 0 40px",
          lineHeight: 1.4,
        }}
      >
        Le message affiché en haut de toutes les pages du site. Utilisé pour les
        informations urgentes (travaux, coupures, alertes météo, etc.).
      </p>

      {/* Aperçu live */}
      <div style={{ marginBottom: 32 }}>
        <div
          className="ui-font"
          style={{
            fontSize: 10,
            letterSpacing: ".25em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          Aperçu en direct
        </div>
        {enabled && message ? (
          <div
            style={{
              backgroundColor: "var(--blue)",
              color: "#fff",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 14,
              fontFamily: "'Inter Tight', system-ui, sans-serif",
              letterSpacing: ".02em",
            }}
          >
            <Megaphone size={16} />
            <span>{message}</span>
          </div>
        ) : (
          <div
            style={{
              padding: "20px",
              border: "1px dashed var(--border)",
              color: "var(--text-muted)",
              fontSize: 13,
              fontStyle: "italic",
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {!enabled
              ? "Le bandeau est désactivé — il ne sera pas affiché sur le site."
              : "Aucun message — ajoutez un texte ci-dessous pour activer le bandeau."}
          </div>
        )}
      </div>

      {/* Formulaire */}
      <div
        style={{
          background: "var(--surface)",
          padding: 32,
          border: "1px solid var(--border)",
        }}
      >
        {/* Toggle activé */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0",
            borderBottom: "1px solid var(--border)",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              className="ui-font"
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".05em",
                color: "var(--text)",
                marginBottom: 4,
              }}
            >
              Bandeau actif
            </div>
            <div
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                fontStyle: "italic",
              }}
            >
              Activez ou désactivez l'affichage sur le site
            </div>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            style={{
              background: enabled ? "var(--accent)" : "var(--border)",
              border: "none",
              width: 52,
              height: 28,
              borderRadius: 14,
              cursor: "pointer",
              position: "relative",
              transition: "all .2s",
            }}
            aria-label={enabled ? "Désactiver" : "Activer"}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: enabled ? 27 : 3,
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#fff",
                transition: "all .2s",
                boxShadow: "0 2px 4px rgba(0,0,0,.2)",
              }}
            />
          </button>
        </div>

        {/* Champ message */}
        <label>Message à afficher</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Info municipale · Coupure d'eau prévue rue du Presbytère mercredi 13 mai de 9h à 12h"
          style={{ resize: "vertical", lineHeight: 1.5, fontFamily: "'Inter Tight', sans-serif" }}
        />
        <div
          className="ui-font"
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            marginTop: 8,
            letterSpacing: ".03em",
          }}
        >
          💡 Astuce : commencez par "Info municipale ·" ou "⚠️ Alerte ·" pour
          structurer le message.
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary"
          style={{ marginTop: 32, opacity: saving ? 0.6 : 1 }}
        >
          {saving ? (
            "Enregistrement…"
          ) : savedJustNow ? (
            <>
              <Check size={14} /> Enregistré !
            </>
          ) : (
            <>
              <Save size={14} /> Enregistrer
            </>
          )}
        </button>
      </div>
    </div>
  );
}
