import { ArrowRight } from "lucide-react";

/**
 * Carte d'actualité utilisée sur l'accueil et la page actualités.
 */
export default function NewsCard({ news, featured = false }) {
  return (
    <article
      className="hover-lift fade-up"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: news.image,
          height: featured ? 240 : 180,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            background: "rgba(0,0,0,.7)",
            color: "#fff",
            padding: "6px 12px",
            fontFamily: "Inter Tight, sans-serif",
            fontSize: 10,
            letterSpacing: ".15em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {news.category}
        </div>
      </div>
      <div style={{ padding: 28, flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          className="ui-font"
          style={{
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: ".1em",
            marginBottom: 12,
          }}
        >
          {news.date}
        </div>
        <h3
          className="display-font"
          style={{
            fontSize: featured ? 26 : 22,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {news.title}
        </h3>
        <p
          className="display-font"
          style={{
            fontSize: 16,
            color: "var(--text-muted)",
            marginTop: 12,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {news.excerpt}
        </p>
        <div
          className="ui-font"
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".15em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          Lire la suite <ArrowRight size={12} />
        </div>
      </div>
    </article>
  );
}
