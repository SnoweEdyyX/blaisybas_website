import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import PostEditor from "../components/associations/PostEditor.jsx";
import PostItem from "../components/associations/PostItem.jsx";
import * as storage from "../lib/storage.js";

/**
 * Espace administrateur d'une association.
 * Utilise Supabase pour persister les publications.
 */
export default function EspaceAsso({ loggedAssoc, onLogout, posts, reloadOne }) {
  const navigate = useNavigate();
  const [editingPost, setEditingPost] = useState(null);

  if (!loggedAssoc) return <Navigate to="/associations" replace />;

  const Icon = loggedAssoc.icon;

  const handleSubmit = async (title, content) => {
    try {
      if (editingPost) {
        await storage.updatePost(editingPost.id, { title, content });
        setEditingPost(null);
      } else {
        await storage.addPost(loggedAssoc.id, { title, content });
      }
      await reloadOne(loggedAssoc.id);
    } catch (err) {
      throw err;
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Supprimer cette publication ? Cette action est irréversible.")) {
      return;
    }
    try {
      await storage.deletePost(postId);
      await reloadOne(loggedAssoc.id);
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/associations");
  };

  return (
    <>
      <div
        style={{
          background: loggedAssoc.color,
          color: "#fff",
          padding: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Icon size={36} color="#fff" strokeWidth={1.4} />
          <div>
            <div
              className="ui-font"
              style={{
                fontSize: 10,
                letterSpacing: ".3em",
                textTransform: "uppercase",
                opacity: 0.7,
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              Espace administrateur
            </div>
            <div
              className="display-font"
              style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-.02em" }}
            >
              {loggedAssoc.name}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "rgba(255,255,255,.15)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,.3)",
            padding: "10px 20px",
            cursor: "pointer",
            fontFamily: "Inter Tight, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <LogOut size={12} /> Se déconnecter
        </button>
      </div>

      <section style={{ padding: "60px 32px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <PostEditor
            editingPost={editingPost}
            assocId={loggedAssoc.id}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingPost(null)}
          />

          <div style={{ marginTop: 60 }}>
            <h2
              className="display-font"
              style={{
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-.02em",
                margin: "0 0 32px",
              }}
            >
              Vos publications{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                ({posts.length})
              </span>
            </h2>

            {posts.length === 0 ? (
              <p
                className="display-font"
                style={{
                  fontSize: 18,
                  fontStyle: "italic",
                  color: "var(--text-muted)",
                }}
              >
                Aucune publication pour le moment. Créez la première !
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {posts.map((p) => (
                  <PostItem
                    key={p.id}
                    post={p}
                    accentColor={loggedAssoc.color}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
