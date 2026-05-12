import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--blue)",
        color: "#fff",
        padding: "80px 32px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          opacity: 0.07,
          pointerEvents: "none",
        }}
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="#fff" strokeWidth=".5" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#fff" strokeWidth=".5" />
      </svg>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 56,
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <img
                src="/blason.svg"
                alt=""
                style={{ width: 50, filter: "" }}
              />
              <div>
                <div
                  className="display-font"
                  style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.02em" }}
                >
                  Blaisy-Bas
                </div>
                <div
                  className="ui-font"
                  style={{
                    fontSize: 10,
                    letterSpacing: ".3em",
                    textTransform: "uppercase",
                    opacity: 0.6,
                    fontWeight: 500,
                  }}
                >
                  Côte-d'Or · 21540
                </div>
              </div>
            </div>
            <p
              className="display-font"
              style={{
                fontSize: 18,
                fontStyle: "italic",
                opacity: 0.8,
                lineHeight: 1.5,
                maxWidth: 400,
              }}
            >
              Un village où il fait bon vivre, entre patrimoine et nature, à vingt minutes
              de Dijon.
            </p>
          </div>

          <FooterColumn
            title="Découvrir"
            links={[
              ["/village", "Le Village"],
              ["/mairie", "Mairie"],
              ["/actualites", "Actualités"],
            ]}
          />

          <FooterColumn
            title="Services"
            links={[
              ["/agenda", "Agenda"],
              ["/associations", "Associations"],
              ["/signalement", "Signaler"],
            ]}
          />

          <div>
            <div
              className="ui-font"
              style={{
                fontSize: 10,
                letterSpacing: ".25em",
                textTransform: "uppercase",
                opacity: 0.6,
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Contact
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, opacity: 0.8 }}>
              Rue du Presbytère
              <br />
              21540 Blaisy-Bas
              <br />
              03 80 33 21 04
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,.15)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            className="ui-font"
            style={{ fontSize: 11, opacity: 0.6, letterSpacing: ".05em" }}
          >
            © {new Date().getFullYear()} · Site non officiel, conçu avec passion pour les
            Blaisois·es
          </div>
          <div
            className="ui-font"
            style={{
              fontSize: 11,
              opacity: 0.6,
              letterSpacing: ".05em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Fait avec <Heart size={11} fill="currentColor" /> en Bourgogne
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <div
        className="ui-font"
        style={{
          fontSize: 10,
          letterSpacing: ".25em",
          textTransform: "uppercase",
          opacity: 0.6,
          marginBottom: 16,
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      {links.map(([path, label]) => (
        <Link
          key={path}
          to={path}
          className="ui-font underline-grow"
          style={{
            display: "block",
            padding: "6px 0",
            fontSize: 14,
            color: "#fff",
          }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
