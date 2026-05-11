import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const LINKS = [
  ["/", "Accueil"],
  ["/village", "Le Village"],
  ["/mairie", "Mairie"],
  ["/actualites", "Actualités"],
  ["/agenda", "Agenda"],
  ["/galerie", "Galerie"],
  ["/associations", "Associations"],
  ["/commerces", "Commerces"],
  ["/contact", "Contact"],
];

export default function Header({ isDark, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 90,
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo + nom */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{ display: "flex", alignItems: "center", gap: 14 }}
        >
          <img
            src="/blason.png"
            alt="Blason Blaisy-Bas"
            style={{
              width: 42,
              height: 50,
              objectFit: "contain",
              filter: isDark ? "brightness(1.1)" : "none",
            }}
          />
          <div>
            <div
              className="display-font"
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-.02em",
                lineHeight: 1,
              }}
            >
              Blaisy-Bas
            </div>
            <div
              className="ui-font"
              style={{
                fontSize: 9.5,
                letterSpacing: ".25em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: 4,
                fontWeight: 500,
              }}
            >
              Côte-d'Or · 21540
            </div>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: 4 }}
        >
          {LINKS.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              className="ui-font underline-grow"
              style={{
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: isActive(path) ? 700 : 500,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: isActive(path) ? "var(--accent)" : "var(--text)",
              }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Changer de thème"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              padding: 8,
              cursor: "pointer",
              color: "var(--text)",
              marginLeft: 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>

        {/* Burger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          className="mobile-burger"
          style={{
            background: "none",
            border: "1px solid var(--border)",
            padding: 10,
            cursor: "pointer",
            color: "var(--text)",
            display: "none",
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            backgroundColor: "var(--surface)",
            borderTop: "1px solid var(--border)",
            padding: "16px 32px",
          }}
        >
          {LINKS.map(([path, label]) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="ui-font"
              style={{
                display: "block",
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 13,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                fontWeight: isActive(path) ? 700 : 500,
                color: isActive(path) ? "var(--accent)" : "var(--text)",
              }}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="ui-font"
            style={{
              marginTop: 12,
              padding: "12px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            {isDark ? (
              <>
                <Sun size={14} /> Mode clair
              </>
            ) : (
              <>
                <Moon size={14} /> Mode sombre
              </>
            )}
          </button>
        </div>
      )}
    </header>
  );
}
