import { ChevronRight, Clock, MapPin } from "lucide-react";

/**
 * Ligne d'événement réutilisable (accueil + agenda).
 */
export default function EventRow({ event, big = false, animationDelay = 0 }) {
  return (
    <div
      className="hover-lift"
      style={{
        display: "grid",
        gridTemplateColumns: big ? "100px 1fr auto" : "80px 1fr auto",
        gap: big ? 32 : 24,
        alignItems: "center",
        padding: big ? "32px 0" : "24px 0",
        borderBottom: "1px solid var(--border)",
        cursor: "pointer",
        animation: animationDelay ? `fadeUp .6s ease ${animationDelay}s backwards` : "none",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          className="display-font"
          style={{
            fontSize: big ? 56 : 42,
            fontWeight: 700,
            color: "var(--accent)",
            lineHeight: 1,
            letterSpacing: big ? "-.04em" : 0,
          }}
        >
          {event.day}
        </div>
        <div
          className="ui-font"
          style={{
            fontSize: big ? 11 : 10,
            letterSpacing: big ? ".3em" : ".25em",
            color: "var(--text-muted)",
            marginTop: big ? 6 : 4,
            fontWeight: 600,
          }}
        >
          {event.month}
        </div>
      </div>
      <div>
        <div
          className="ui-font"
          style={{
            fontSize: 10,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: big ? 8 : 6,
            fontWeight: big ? 700 : 600,
          }}
        >
          {event.category}
        </div>
        <div
          className="display-font"
          style={{
            fontSize: big ? 30 : 22,
            fontWeight: 600,
            lineHeight: big ? 1.1 : 1.2,
            letterSpacing: big ? "-.02em" : 0,
          }}
        >
          {event.title}
        </div>
        {big ? (
          <div
            className="ui-font"
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              marginTop: 10,
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <span>
              <Clock size={12} style={{ display: "inline", marginRight: 6, verticalAlign: -1 }} />
              {event.time}
            </span>
            <span>
              <MapPin size={12} style={{ display: "inline", marginRight: 6, verticalAlign: -1 }} />
              {event.place}
            </span>
          </div>
        ) : (
          <div className="ui-font" style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
            {event.time} · {event.place}
          </div>
        )}
      </div>
      <ChevronRight size={big ? 24 : 20} color="var(--text-muted)" />
    </div>
  );
}
