import { Link } from "react-router-dom";
import {
  Megaphone, Newspaper, Calendar, Building2, TreePine,
  Image as ImageIcon, Store, Users, ArrowRight, CheckCircle2, Clock,
} from "lucide-react";
import { useAdmin } from "../../hooks/useAdmin.js";

const SECTIONS = [
  {
    path: "/admin/banner",
    label: "Bandeau d'alerte",
    icon: Megaphone,
    description: "Message d'information affiché en haut du site",
    color: "#1e40af",
    ready: true,
  },
  {
    path: "/admin/news",
    label: "Actualités",
    icon: Newspaper,
    description: "Cartes de news affichées sur la page d'accueil",
    color: "#c2410c",
    ready: false,
  },
  {
    path: "/admin/events",
    label: "Agenda",
    icon: Calendar,
    description: "Événements à venir au village",
    color: "#7c2d12",
    ready: false,
  },
  {
    path: "/admin/mairie",
    label: "Mairie",
    icon: Building2,
    description: "Maire, adjoints, horaires, contact",
    color: "#365314",
    ready: false,
  },
  {
    path: "/admin/village",
    label: "Le Village",
    icon: TreePine,
    description: "Histoire, chiffres-clés, blason",
    color: "#a16207",
    ready: false,
  },
  {
    path: "/admin/gallery",
    label: "Galerie",
    icon: ImageIcon,
    description: "Photos du village",
    color: "#831843",
    ready: false,
  },
  {
    path: "/admin/commerces",
    label: "Commerces & Artisans",
    icon: Store,
    description: "Annuaire des commerces locaux",
    color: "#064e3b",
    ready: false,
  },
  {
    path: "/admin/associations",
    label: "Associations",
    icon: Users,
    description: "Liste, couleurs, mots de passe",
    color: "#7c3aed",
    ready: false,
  },
];

export default function AdminDashboard() {
  const { user } = useAdmin();

  return (
    <div style={{ maxWidth: 1200 }}>
      <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 240 }}>
        <span>Tableau de bord</span>
      </div>
      <h1
        className="display-font"
        style={{
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: "-.03em",
          margin: "0 0 8px",
          lineHeight: 1,
        }}
      >
        Bonjour <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
          {user?.email?.split("@")[0] || "admin"}
        </span>
      </h1>
      <p
        className="display-font"
        style={{
          fontSize: 20,
          fontStyle: "italic",
          color: "var(--text-muted)",
          margin: "0 0 48px",
          lineHeight: 1.4,
        }}
      >
        Bienvenue dans l'espace d'administration du site. Choisissez une section à
        modifier ci-dessous.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const Wrapper = s.ready ? Link : "div";
          const wrapperProps = s.ready ? { to: s.path } : {};

          return (
            <Wrapper
              key={s.path}
              {...wrapperProps}
              className={s.ready ? "hover-lift" : ""}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: 28,
                position: "relative",
                overflow: "hidden",
                cursor: s.ready ? "pointer" : "default",
                opacity: s.ready ? 1 : 0.5,
                display: "block",
                transition: "all .25s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 4,
                  height: "100%",
                  background: s.color,
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <Icon size={28} color={s.color} strokeWidth={1.4} />
                {s.ready ? (
                  <CheckCircle2 size={16} color={s.color} />
                ) : (
                  <span
                    className="ui-font"
                    style={{
                      fontSize: 9,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Clock size={10} /> Bientôt
                  </span>
                )}
              </div>
              <h3
                className="display-font"
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  margin: "0 0 6px",
                  letterSpacing: "-.02em",
                }}
              >
                {s.label}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  margin: 0,
                  minHeight: 42,
                }}
              >
                {s.description}
              </p>
              {s.ready && (
                <div
                  className="ui-font"
                  style={{
                    marginTop: 20,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: ".15em",
                    textTransform: "uppercase",
                    color: s.color,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Gérer <ArrowRight size={12} />
                </div>
              )}
            </Wrapper>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 48,
          padding: 24,
          background: "var(--bg-alt)",
          border: "1px solid var(--border)",
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 13,
          color: "var(--text-muted)",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "var(--accent)", letterSpacing: ".05em" }}>
          ℹ️ Information
        </strong>{" "}
        — Les sections marquées "Bientôt" seront disponibles dans les prochaines
        mises à jour. Le bandeau d'alerte est déjà fonctionnel : modifiez son texte
        et toute personne visitant le site verra immédiatement le changement.
      </div>
    </div>
  );
}
