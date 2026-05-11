import { Send } from "lucide-react";
import PageHero from "../components/ui/PageHero.jsx";
import { VILLAGE } from "../data/village.js";

export default function Contact() {
  return (
    <>
      <PageHero label="Nous écrire" title="Contact" />

      <section style={{ padding: "60px 32px 100px" }}>
        <div
          className="hero-grid"
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
          }}
        >
          <div>
            <h3
              className="display-font"
              style={{
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "-.02em",
                margin: "0 0 24px",
              }}
            >
              Mairie de {VILLAGE.name}
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
              {VILLAGE.mairie.address}
              <br />
              {VILLAGE.postcode} {VILLAGE.name}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7 }}>
              <b>Téléphone :</b> {VILLAGE.mairie.phone}
              <br />
              <b>Courriel :</b> {VILLAGE.mairie.email}
            </p>
            <div
              className="ui-font"
              style={{
                marginTop: 32,
                padding: 20,
                background: "var(--bg-alt)",
                border: "1px solid var(--border)",
                fontSize: 12,
                letterSpacing: ".05em",
                color: "var(--text-muted)",
              }}
            >
              <b style={{ color: "var(--accent)" }}>NOTE</b> · Ce site est un projet
              citoyen non officiel, créé par un habitant passionné par son village.
            </div>
          </div>

          <div
            style={{
              background: "var(--surface)",
              padding: 32,
              border: "1px solid var(--border)",
            }}
          >
            <label>Nom & prénom</label>
            <input placeholder="Jean Dupont" />
            <div style={{ height: 16 }} />
            <label>Courriel</label>
            <input type="email" placeholder="vous@email.fr" />
            <div style={{ height: 16 }} />
            <label>Message</label>
            <textarea
              rows={5}
              style={{ resize: "vertical" }}
              placeholder="Votre message…"
            />
            <button className="btn-primary" style={{ marginTop: 24 }}>
              <Send size={14} /> Envoyer
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
