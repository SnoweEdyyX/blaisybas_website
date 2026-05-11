import {
  Mountain, TreePine, Users, Compass, Wind, Building2,
} from "lucide-react";
import PageHero from "../components/ui/PageHero.jsx";
import { VILLAGE } from "../data/village.js";

const STAT_BLOCKS = [
  [Mountain, "Altitude", "381 – 585 m", "Le bourg à 410 m"],
  [TreePine, "Superficie", "13,37 km²", "Bois & cultures"],
  [Users, "Population", "647 hab.", "Densité 52 hab./km²"],
  [Compass, "Localisation", "23 km", "au NO de Dijon"],
  [Wind, "Climat", "Océanique", "été tempéré (Cfb)"],
  [Building2, "Intercom.", "Ouche & Montagne", "Communauté de communes"],
];

export default function Village() {
  return (
    <>
      <PageHero label="Histoire & territoire" title="Le Village" italic="de Blaisy-Bas" />

      <IntroSection />
      <StatsSection />
      <BlasonSection />
    </>
  );
}

function IntroSection() {
  return (
    <section style={{ padding: "80px 32px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p
          className="display-font"
          style={{
            fontSize: 26,
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "var(--text-muted)",
            marginBottom: 48,
          }}
        >
          « Traversée par la rivière de l'Oze, Blaisy-Bas bénéficie d'un cadre de vie
          particulièrement agréable par son implantation, son exposition et son
          dynamisme. »
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.8, marginBottom: 24 }}>
          Niché entre forêts et plateaux calcaires, à mi-chemin entre Dijon et Sombernon,
          Blaisy-Bas appartient à la Communauté de communes <b>Ouche et Montagne</b>. Le
          village s'étend sur 13,37 km², offrant un paysage typique de la Côte-d'Or fait
          de bois, de prairies et de pierres claires.
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.8, marginBottom: 24 }}>
          Le toponyme <i>Blaisy</i> apparaît dès le Moyen Âge dans les chartes
          ecclésiastiques de Bourgogne. Les habitants, appelés{" "}
          <b>Blaisois et Blaisoises</b>, sont aujourd'hui 647 — un chiffre qui témoigne de
          la vitalité d'un village rural choisi par de nombreuses familles pour la qualité
          de vie qu'il offre à seulement vingt minutes de Dijon.
        </p>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section style={{ padding: "80px 32px", backgroundColor: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <h2
          className="display-font"
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-.03em",
            margin: "0 0 56px",
          }}
        >
          Le territoire <span style={{ fontStyle: "italic", color: "var(--accent)" }}>en chiffres</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 0,
          }}
        >
          {STAT_BLOCKS.map(([Icon, label, big, sub], i) => (
            <div
              key={i}
              style={{
                borderRight: i % 3 !== 2 ? "1px solid var(--border)" : "none",
                borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                padding: "40px 32px",
              }}
            >
              <Icon size={28} color="var(--accent)" strokeWidth={1.4} />
              <div
                className="ui-font"
                style={{
                  fontSize: 10,
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: 16,
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
              <div
                className="display-font"
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  marginTop: 8,
                  letterSpacing: "-.02em",
                }}
              >
                {big}
              </div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlasonSection() {
  return (
    <section style={{ padding: "100px 32px" }}>
      <div
        className="hero-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="/blason.png"
            alt="Blason"
            style={{ maxWidth: 280, width: "100%" }}
          />
        </div>
        <div>
          <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 180 }}>
            <span>Héraldique</span>
          </div>
          <h2
            className="display-font"
            style={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: "-.03em",
              margin: "0 0 24px",
              lineHeight: 1,
            }}
          >
            Le blason{" "}
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>communal</span>
          </h2>
          <p
            className="display-font"
            style={{
              fontSize: 22,
              fontStyle: "italic",
              color: "var(--text-muted)",
              marginBottom: 24,
              lineHeight: 1.4,
            }}
          >
            « {VILLAGE.blason.blazon} »
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.7 }}>
            Le bleu rappelle le fief seigneurial. La colombe symbolise l'esprit, la paix,
            et l'élévation. Le lion léopardé évoque la noblesse, la force du territoire et
            son ancrage bourguignon.
          </p>
        </div>
      </div>
    </section>
  );
}
