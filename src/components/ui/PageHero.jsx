/**
 * Hero réutilisable en tête de page.
 *
 * Usage : <PageHero label="Catégorie" title="Titre" italic="en italique" />
 */
export default function PageHero({ label, title, italic }) {
  return (
    <section
      className="grain"
      style={{
        padding: "80px 32px 60px",
        borderBottom: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="ornament-line fade-up" style={{ marginBottom: 24, maxWidth: 280 }}>
          <span>{label}</span>
        </div>
        <h1
          className="display-font fade-up"
          style={{
            fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 700,
            letterSpacing: "-.04em",
            lineHeight: 0.95,
            margin: 0,
            animationDelay: ".1s",
          }}
        >
          {title}{" "}
          {italic && (
            <span style={{ fontStyle: "italic", color: "var(--accent)" }}>{italic}</span>
          )}
        </h1>
      </div>
    </section>
  );
}
