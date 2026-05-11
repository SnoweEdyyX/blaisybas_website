/**
 * Titre de section avec ornement + version italique en accent.
 */
export default function SectionTitle({ label, title, italic, marginBottom = 56 }) {
  return (
    <>
      <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 240 }}>
        <span>{label}</span>
      </div>
      <h2
        className="display-font"
        style={{
          fontSize: "clamp(32px, 5vw, 64px)",
          fontWeight: 700,
          margin: `0 0 ${marginBottom}px`,
          letterSpacing: "-.03em",
          lineHeight: 1,
        }}
      >
        {title}{" "}
        {italic && (
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>{italic}</span>
        )}
      </h2>
    </>
  );
}
