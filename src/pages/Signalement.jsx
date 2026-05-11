import { useState } from "react";
import { Check, Send } from "lucide-react";
import PageHero from "../components/ui/PageHero.jsx";
import * as storage from "../lib/storage.js";

const PROBLEM_TYPES = [
  ["voirie", "Voirie / nid-de-poule"],
  ["eclairage", "Éclairage public"],
  ["proprete", "Propreté / dépôt sauvage"],
  ["mobilier", "Mobilier urbain"],
  ["espaces-verts", "Espaces verts"],
  ["autre", "Autre"],
];

export default function Signalement() {
  const [type, setType] = useState("voirie");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!location.trim() || !description.trim()) return;
    await storage.addReport({ type, location, description, name });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLocation("");
      setDescription("");
      setName("");
    }, 4000);
  };

  return (
    <>
      <PageHero label="Citoyens acteurs" title="Signaler" italic="un problème" />

      <section style={{ padding: "60px 32px 100px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            className="display-font"
            style={{
              fontSize: 20,
              fontStyle: "italic",
              color: "var(--text-muted)",
              marginBottom: 48,
              lineHeight: 1.5,
            }}
          >
            Nid-de-poule, éclairage public défaillant, dépôt sauvage, mobilier urbain
            endommagé… Aidez-nous à entretenir notre cadre de vie.
          </p>

          {submitted ? (
            <div
              style={{
                background: "var(--blue)",
                color: "#fff",
                padding: 48,
                textAlign: "center",
              }}
            >
              <Check size={48} strokeWidth={1.5} style={{ marginBottom: 16 }} />
              <h3
                className="display-font"
                style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px" }}
              >
                Signalement envoyé
              </h3>
              <p>Merci, votre signalement a bien été transmis aux services municipaux.</p>
            </div>
          ) : (
            <div
              style={{
                background: "var(--surface)",
                padding: 48,
                border: "1px solid var(--border)",
              }}
            >
              <label>Type de problème</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                {PROBLEM_TYPES.map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>

              <div style={{ height: 20 }} />

              <label>Lieu précis *</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Rue, intersection, n° de poteau…"
              />

              <div style={{ height: 20 }} />

              <label>Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                style={{ resize: "vertical" }}
                placeholder="Décrivez le problème observé…"
              />

              <div style={{ height: 20 }} />

              <label>Votre nom (optionnel)</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Pour un suivi personnalisé"
              />

              <button
                onClick={handleSubmit}
                className="btn-primary"
                style={{ marginTop: 32 }}
              >
                <Send size={14} /> Envoyer le signalement
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
