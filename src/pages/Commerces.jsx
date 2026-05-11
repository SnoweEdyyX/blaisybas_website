import { Clock } from "lucide-react";
import PageHero from "../components/ui/PageHero.jsx";
import { COMMERCES } from "../data/commerces.js";

export default function Commerces() {
  return (
    <>
      <PageHero label="Vivre & consommer local" title="Commerces" italic="& artisans" />

      <section style={{ padding: "60px 32px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            className="display-font"
            style={{
              fontSize: 22,
              fontStyle: "italic",
              color: "var(--text-muted)",
              maxWidth: 700,
              marginBottom: 48,
              lineHeight: 1.5,
            }}
          >
            Soutenir les commerces de proximité, c'est faire vivre notre village au
            quotidien.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {COMMERCES.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="hover-lift"
                  style={{
                    background: "var(--surface)",
                    padding: 32,
                    border: "1px solid var(--border)",
                    cursor: "pointer",
                  }}
                >
                  <Icon size={28} color="var(--accent)" strokeWidth={1.4} />
                  <div
                    className="ui-font"
                    style={{
                      fontSize: 10,
                      letterSpacing: ".25em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginTop: 16,
                      fontWeight: 700,
                    }}
                  >
                    {c.type}
                  </div>
                  <h3
                    className="display-font"
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      margin: "8px 0 16px",
                      letterSpacing: "-.02em",
                      lineHeight: 1.1,
                    }}
                  >
                    {c.name}
                  </h3>
                  <div
                    className="ui-font"
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Clock size={12} /> {c.hours}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
