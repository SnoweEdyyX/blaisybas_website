import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import PageHero from "../components/ui/PageHero.jsx";
import LoginModal from "../components/associations/LoginModal.jsx";
import RichViewer from "../components/associations/RichViewer.jsx";
import { ASSOCIATIONS, getAssociation } from "../data/associations.js";

export default function Associations({ allPosts, onLogin }) {
  const navigate = useNavigate();
  const [loginAssoc, setLoginAssoc] = useState(null);

  const handleLogin = (assocId, pwd) => {
    const result = onLogin(assocId, pwd);
    if (result.ok) {
      setLoginAssoc(null);
      navigate("/espace-asso");
    }
    return result;
  };

  const recentPosts = [];
  Object.entries(allPosts).forEach(([id, posts]) => {
    posts.forEach((p) => recentPosts.push({ ...p, assocId: id }));
  });
  recentPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <>
      <PageHero label="Vie associative" title="Les" italic="Associations" />

      <AssociationsList allPosts={allPosts} onOpenLogin={(a) => setLoginAssoc(a)} />

      {recentPosts.length > 0 && <PublicFeed posts={recentPosts.slice(0, 8)} />}

      {loginAssoc && (
        <LoginModal
          assoc={loginAssoc}
          onClose={() => setLoginAssoc(null)}
          onLogin={handleLogin}
        />
      )}
    </>
  );
}

function AssociationsList({ allPosts, onOpenLogin }) {
  return (
    <section style={{ padding: "40px 32px 80px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <p
          className="display-font"
          style={{
            fontSize: 22,
            fontStyle: "italic",
            color: "var(--text-muted)",
            maxWidth: 700,
            marginBottom: 48,
            lineHeight: 1.5,
          }}
        >
          Le tissu associatif fait battre le cœur du village. Découvrez nos associations
          et leurs dernières actualités.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {ASSOCIATIONS.map((a) => {
            const Icon = a.icon;
            const postCount = (allPosts[a.id] || []).length;
            return (
              <div
                key={a.id}
                className="hover-lift"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: 32,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 6,
                    height: "100%",
                    background: a.color,
                  }}
                />
                <Icon size={36} color={a.color} strokeWidth={1.4} />
                <h3
                  className="display-font"
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    margin: "20px 0 8px",
                    letterSpacing: "-.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {a.name}
                </h3>
                <p
                  className="display-font"
                  style={{
                    fontSize: 16,
                    fontStyle: "italic",
                    color: "var(--text-muted)",
                    marginBottom: 24,
                  }}
                >
                  {a.tagline}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 20,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span
                    className="ui-font"
                    style={{
                      fontSize: 11,
                      letterSpacing: ".15em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    {postCount} publication{postCount > 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => onOpenLogin(a)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: a.color,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "Inter Tight, sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                    }}
                  >
                    <Lock size={12} /> Espace asso
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PublicFeed({ posts }) {
  return (
    <section style={{ padding: "80px 32px", backgroundColor: "var(--bg-alt)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="ornament-line" style={{ marginBottom: 16, maxWidth: 280 }}>
          <span>Dernières publications</span>
        </div>
        <h2
          className="display-font"
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-.03em",
            margin: "0 0 48px",
            lineHeight: 1,
          }}
        >
          Ce que disent{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            les associations
          </span>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {posts.map((p) => {
            const assoc = getAssociation(p.assocId);
            if (!assoc) return null;
            const Icon = assoc.icon;
            return (
              <article
                key={p.id}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: 36,
                  borderLeft: `4px solid ${assoc.color}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <Icon size={18} color={assoc.color} strokeWidth={1.5} />
                  <span
                    className="ui-font"
                    style={{
                      fontSize: 11,
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: assoc.color,
                      fontWeight: 700,
                    }}
                  >
                    {assoc.name}
                  </span>
                  <span style={{ flex: 1 }} />
                  <span
                    className="ui-font"
                    style={{ fontSize: 11, color: "var(--text-muted)" }}
                  >
                    {new Date(p.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3
                  className="display-font"
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                    margin: "0 0 20px",
                    letterSpacing: "-.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {p.title}
                </h3>
                <RichViewer content={p.content} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
