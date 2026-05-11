import {
  MapPin, Phone, Mail, Clock, FileText, Building2, Calendar, AlertTriangle, ArrowRight,
} from "lucide-react";
import PageHero from "../components/ui/PageHero.jsx";
import { VILLAGE } from "../data/village.js";

const CONTACT_ROWS = [
  [MapPin, "Adresse", `${VILLAGE.mairie.address}\n${VILLAGE.postcode} ${VILLAGE.name}`],
  [Phone, "Téléphone", VILLAGE.mairie.phone],
  [Mail, "Courriel", VILLAGE.mairie.email],
];

const DEMARCHES = [
  [FileText, "État civil", "Actes de naissance, mariage, décès"],
  [Building2, "Urbanisme", "Permis de construire, déclarations"],
  [Calendar, "Rendez-vous", "Prise de RDV avec le maire ou les adjoints"],
  [AlertTriangle, "Signalement", "Voirie, éclairage, propreté"],
];

export default function Mairie() {
  return (
    <>
      <PageHero label="Vie municipale" title="La" italic="Mairie" />
      <ContactSection />
      <ConseilSection />
      <DemarchesSection />
    </>
  );
}

function ContactSection() {
  return (
    <section style={{ padding: "60px 32px 100px" }}>
      <div
        className="hero-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
        }}
      >
        <div>
          <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 160 }}>
            <span>Contact</span>
          </div>
          <h2
            className="display-font"
            style={{
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-.03em",
              margin: "0 0 32px",
              lineHeight: 1,
            }}
          >
            Vous accueillir{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>au mieux</span>
          </h2>

          {CONTACT_ROWS.map(([Icon, label, value]) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 20,
                padding: "20px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <Icon size={20} color="var(--accent)" strokeWidth={1.5} />
              <div>
                <div
                  className="ui-font"
                  style={{
                    fontSize: 10,
                    letterSpacing: ".25em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
                <div style={{ fontSize: 16, marginTop: 6, whiteSpace: "pre-line" }}>
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "var(--surface)",
            padding: 48,
            border: "1px solid var(--border)",
          }}
        >
          <Clock size={32} color="var(--accent)" strokeWidth={1.4} />
          <h3
            className="display-font"
            style={{
              fontSize: 32,
              fontWeight: 700,
              margin: "16px 0 32px",
              letterSpacing: "-.02em",
            }}
          >
            Horaires{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>d'ouverture</span>
          </h3>
          {VILLAGE.mairie.hours.map(([j, h]) => (
            <div
              key={j}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                opacity: h === "Fermée" ? 0.4 : 1,
              }}
            >
              <span
                className="ui-font"
                style={{
                  fontSize: 13,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {j}
              </span>
              <span style={{ fontSize: 14 }}>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConseilSection() {
  return (
    <section style={{ padding: "80px 32px", backgroundColor: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 220 }}>
          <span>L'équipe</span>
        </div>
        <h2
          className="display-font"
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-.03em",
            margin: "0 0 56px",
            lineHeight: 1,
          }}
        >
          Conseil{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>municipal</span>
        </h2>

        <div
          style={{
            background: "var(--surface)",
            padding: 48,
            border: "1px solid var(--border)",
            marginBottom: 32,
          }}
        >
          <div
            className="ui-font"
            style={{
              fontSize: 10,
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Maire de {VILLAGE.name}
          </div>
          <div
            className="display-font"
            style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-.02em" }}
          >
            {VILLAGE.mayor.name}
          </div>
          <div
            className="display-font"
            style={{
              fontSize: 18,
              fontStyle: "italic",
              color: "var(--text-muted)",
              marginTop: 8,
            }}
          >
            Élu en {VILLAGE.mayor.since} — {VILLAGE.mayor.term.toLowerCase()}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {["1er Adjoint", "2ème Adjointe", "3ème Adjoint"].map((titre, i) => (
            <div
              key={i}
              style={{
                background: "var(--surface)",
                padding: 24,
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="ui-font"
                style={{
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                {titre}
              </div>
              <div
                className="display-font"
                style={{ fontSize: 20, fontWeight: 600, marginTop: 8 }}
              >
                Nom à compléter
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                Délégation à définir
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: 14,
            color: "var(--text-muted)",
            marginTop: 32,
            fontStyle: "italic",
          }}
        >
          Le conseil municipal compte 11 membres au total. Les comptes rendus des séances
          sont consultables en mairie.
        </p>
      </div>
    </section>
  );
}

function DemarchesSection() {
  return (
    <section style={{ padding: "100px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 200 }}>
          <span>En ligne</span>
        </div>
        <h2
          className="display-font"
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-.03em",
            margin: "0 0 56px",
            lineHeight: 1,
          }}
        >
          Démarches{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>simplifiées</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {DEMARCHES.map(([Icon, t, d]) => (
            <div
              key={t}
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
                className="display-font"
                style={{ fontSize: 22, fontWeight: 600, marginTop: 20 }}
              >
                {t}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  marginTop: 8,
                  lineHeight: 1.5,
                }}
              >
                {d}
              </div>
              <div
                className="ui-font"
                style={{
                  marginTop: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Accéder <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
