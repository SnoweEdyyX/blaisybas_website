import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Megaphone, Newspaper, Calendar, Building2,
  TreePine, Image as ImageIcon, Store, Users, LogOut, Home,
} from "lucide-react";
import { useAdmin } from "../../hooks/useAdmin.js";

const NAV_ITEMS = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/banner", label: "Bandeau d'alerte", icon: Megaphone },
  { path: "/admin/news", label: "Actualités", icon: Newspaper, disabled: true },
  { path: "/admin/events", label: "Agenda", icon: Calendar, disabled: true },
  { path: "/admin/mairie", label: "Mairie", icon: Building2, disabled: true },
  { path: "/admin/village", label: "Village", icon: TreePine, disabled: true },
  { path: "/admin/gallery", label: "Galerie", icon: ImageIcon, disabled: true },
  { path: "/admin/commerces", label: "Commerces", icon: Store, disabled: true },
  { path: "/admin/associations", label: "Associations", icon: Users, disabled: true },
];

export default function AdminLayout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdmin();

  const isActive = (path, exact) =>
    exact ? pathname === path : pathname.startsWith(path);

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
      className="admin-layout"
    >
      {/* Sidebar */}
      <aside
        style={{
          background: "var(--bg-alt)",
          borderRight: "1px solid var(--border)",
          padding: "32px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid var(--border)" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/blason.png" alt="" style={{ width: 32, height: 38, objectFit: "contain" }} />
            <div>
              <div className="display-font" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.02em" }}>
                Blaisy-Bas
              </div>
              <div
                className="ui-font"
                style={{
                  fontSize: 9,
                  letterSpacing: ".25em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginTop: 2,
                  fontWeight: 600,
                }}
              >
                Administration
              </div>
            </div>
          </Link>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map(({ path, label, icon: Icon, exact, disabled }) => {
            const active = isActive(path, exact);
            const baseStyle = {
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              letterSpacing: ".02em",
              borderRadius: 6,
              color: active ? "#fff" : disabled ? "var(--text-muted)" : "var(--text)",
              background: active ? "var(--accent)" : "transparent",
              opacity: disabled ? 0.4 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
              transition: "all .15s",
            };

            if (disabled) {
              return (
                <div key={path} style={baseStyle} title="Bientôt disponible">
                  <Icon size={16} strokeWidth={1.5} />
                  <span>{label}</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 9,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      opacity: 0.7,
                    }}
                  >
                    Bientôt
                  </span>
                </div>
              );
            }

            return (
              <Link key={path} to={path} style={baseStyle}>
                <Icon size={16} strokeWidth={1.5} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar : user + logout */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)" }}>
          <Link
            to="/"
            className="ui-font"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 0",
              fontSize: 11,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            <Home size={12} /> Voir le site
          </Link>

          <div
            className="ui-font"
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              marginBottom: 8,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {user?.email}
          </div>
          <button
            onClick={handleLogout}
            className="ui-font"
            style={{
              width: "100%",
              background: "transparent",
              border: "1px solid var(--border)",
              padding: "8px 12px",
              cursor: "pointer",
              color: "var(--text)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <LogOut size={12} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu */}
      <main style={{ padding: "40px 48px", overflow: "auto" }}>{children}</main>

      <style>{`
        @media (max-width: 768px) {
          .admin-layout { grid-template-columns: 1fr !important; }
          .admin-layout aside { display: none; }
        }
      `}</style>
    </div>
  );
}
