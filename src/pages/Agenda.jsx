import { useState } from "react";
import PageHero from "../components/ui/PageHero.jsx";
import EventRow from "../components/ui/EventRow.jsx";
import { EVENTS, EVENT_CATEGORIES } from "../data/events.js";

export default function Agenda() {
  const [filter, setFilter] = useState("Tous");

  const filtered =
    filter === "Tous" ? EVENTS : EVENTS.filter((e) => e.category === filter);

  return (
    <>
      <PageHero label="Tout ce qui se passe" title="Agenda" italic="du village" />

      <section style={{ padding: "40px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 48, flexWrap: "wrap" }}>
            {EVENT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="ui-font"
                style={{
                  background: filter === c ? "var(--text)" : "transparent",
                  color: filter === c ? "var(--bg)" : "var(--text)",
                  border: "1px solid var(--border)",
                  padding: "10px 20px",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .2s",
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {filtered.map((e, i) => (
              <EventRow key={e.id} event={e} big animationDelay={i * 0.08} />
            ))}
            {filtered.length === 0 && (
              <p
                className="display-font"
                style={{
                  fontSize: 20,
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                  padding: "60px 0",
                  textAlign: "center",
                }}
              >
                Aucun événement dans cette catégorie pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
