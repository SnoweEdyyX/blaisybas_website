import { Link } from "react-router-dom";
import {
  ArrowRight, Building2, AlertTriangle, Users, Camera, Store, Mail, Send,
} from "lucide-react";
import { NEWS } from "../data/news.js";
import { EVENTS } from "../data/events.js";
import NewsCard from "../components/ui/NewsCard.jsx";
import EventRow from "../components/ui/EventRow.jsx";
import SectionTitle from "../components/ui/SectionTitle.jsx";

const QUICK_LINKS = [
  ["Mairie", Building2, "/mairie"],
  ["Signaler", AlertTriangle, "/signalement"],
  ["Associations", Users, "/associations"],
  ["Galerie", Camera, "/galerie"],
  ["Commerces", Store, "/commerces"],
  ["Contact", Mail, "/contact"],
];

const STATS = [
  ["647", "Blaisois·es"],
  ["13,4", "km² de territoire"],
  ["410", "m d'altitude"],
  ["1097", "Première mention"],
];

export default function Accueil() {
  return (
    <>
      <HeroSection />
      <NewsSection />
      <EventsAndServicesSection />
    </>
  );
}

function HeroSection() {
  return (
    <section
      className="grain"
      style={{
        position: "relative",
        padding: "80px 32px 100px",
        backgroundColor: "var(--bg)",
        overflow: "hidden",
      }}
    >
      <svg
        style={{
          position: "absolute",
          top: -100,
          right: -200,
          width: 800,
          height: 800,
          opacity: 0.06,
          pointerEvents: "none",
        }}
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--accent)" strokeWidth=".3" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="var(--accent)" strokeWidth=".3" />
        <circle cx="100" cy="100" r="40" fill="none" stroke="var(--accent)" strokeWidth=".3" />
      </svg>

      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        <div className="ornament-line fade-up" style={{ marginBottom: 32, maxWidth: 400 }}>
          <span>Bourgogne-Franche-Comté</span>
        </div>

        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <h1
              className="display-font fade-up"
              style={{
                fontSize: "clamp(48px, 8vw, 120px)",
                fontWeight: 700,
                lineHeight: 0.95,
                margin: 0,
                letterSpacing: "-.04em",
                animationDelay: ".1s",
              }}
            >
              Blaisy<span style={{ color: "var(--accent)" }}>-</span>Bas
            </h1>
            <p
              className="display-font fade-up"
              style={{
                fontSize: "clamp(20px, 2.4vw, 32px)",
                fontStyle: "italic",
                color: "var(--text-muted)",
                marginTop: 16,
                fontWeight: 400,
                lineHeight: 1.3,
                maxWidth: 600,
                animationDelay: ".25s",
              }}
            >
              Un village de caractère niché dans la vallée de l'Oze, à 23 km au nord-ouest
              de Dijon.
            </p>

            <div
              className="fade-up"
              style={{
                display: "flex",
                gap: 16,
                marginTop: 48,
                flexWrap: "wrap",
                animationDelay: ".4s",
              }}
            >
              <Link to="/village" className="btn-primary">
                Découvrir le village <ArrowRight size={14} />
              </Link>
              <Link to="/actualites" className="btn-outline">
                Dernières actualités
              </Link>
            </div>

            <div
              className="fade-up"
              style={{
                display: "flex",
                gap: 48,
                marginTop: 64,
                flexWrap: "wrap",
                animationDelay: ".55s",
                paddingTop: 32,
                borderTop: "1px solid var(--border)",
              }}
            >
              {STATS.map(([n, l]) => (
                <div key={l}>
                  <div
                    className="display-font"
                    style={{
                      fontSize: 36,
                      fontWeight: 700,
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    {n}
                  </div>
                  <div
                    className="ui-font"
                    style={{
                      fontSize: 10,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      marginTop: 6,
                      fontWeight: 500,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up float-anim" style={{ textAlign: "center", animationDelay: ".3s" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src="/blason.svg"
                alt="Blason de Blaisy-Bas"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  height: "auto",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,.15))",
                }}
              />
              <div
                className="ui-font"
                style={{
                  fontSize: 9,
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: 16,
                }}
              >
                D'azur au léopard d'or, armé et lampassé de gueules, surmonté d'une colombe fondante tenant en son bec la Sainte Ampoule, le tout d'argent.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section style={{ padding: "100px 32px", backgroundColor: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <SectionTitle label="La Gazette" title="À la une" italic="cette semaine" marginBottom={0} />
          </div>
          <Link to="/actualites" className="btn-outline">
            Toutes les actualités →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {NEWS.slice(0, 3).map((n, i) => (
            <NewsCard key={n.id} news={n} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsAndServicesSection() {
  return (
    <section style={{ padding: "100px 32px" }}>
      <div
        className="hero-grid"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 60,
        }}
      >
        {/* Agenda */}
        <div>
          <SectionTitle label="Agenda" title="Prochainement" italic="au village" marginBottom={40} />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {EVENTS.slice(0, 4).map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
          <Link to="/agenda" className="btn-outline" style={{ marginTop: 32 }}>
            Voir l'agenda complet →
          </Link>
        </div>

        {/* Services + Newsletter */}
        <div>
          <SectionTitle label="Services" title="Accès" italic="direct" marginBottom={40} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {QUICK_LINKS.map(([label, Icon, path]) => (
              <Link
                key={path}
                to={path}
                className="hover-lift"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "32px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 16,
                }}
              >
                <Icon size={22} color="var(--accent)" strokeWidth={1.5} />
                <div className="display-font" style={{ fontSize: 20, fontWeight: 600 }}>
                  {label}
                </div>
              </Link>
            ))}
          </div>

          <NewsletterBox />
        </div>
      </div>
    </section>
  );
}

function NewsletterBox() {
  return (
    <div
      style={{
        marginTop: 32,
        padding: 32,
        backgroundColor: "var(--blue)",
        color: "#fff",
      }}
    >
      <div
        className="ui-font"
        style={{
          fontSize: 10,
          letterSpacing: ".3em",
          textTransform: "uppercase",
          opacity: 0.7,
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        Newsletter
      </div>
      <div
        className="display-font"
        style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.2, marginBottom: 16 }}
      >
        Restez connecté au village
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          placeholder="votre@email.fr"
          style={{
            background: "rgba(255,255,255,.15)",
            border: "1px solid rgba(255,255,255,.3)",
            color: "#fff",
          }}
        />
        <button
          aria-label="S'inscrire"
          style={{
            background: "#fff",
            color: "var(--blue)",
            border: "none",
            padding: "0 16px",
            cursor: "pointer",
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
