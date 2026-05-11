import { Edit3, Trash2 } from "lucide-react";
import RichViewer from "./RichViewer.jsx";

/**
 * Élément de liste représentant un post dans l'espace admin.
 * Affiche le contenu riche en lecture seule.
 */
export default function PostItem({ post, accentColor, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        padding: 28,
        border: "1px solid var(--border)",
        borderLeft: `4px solid ${accentColor}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <h3
          className="display-font"
          style={{
            fontSize: 22,
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-.02em",
          }}
        >
          {post.title}
        </h3>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => onEdit(post)}
            aria-label="Modifier"
            title="Modifier"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              padding: 8,
              cursor: "pointer",
              color: "var(--text-muted)",
            }}
          >
            <Edit3 size={14} />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            aria-label="Supprimer"
            title="Supprimer"
            style={{
              background: "none",
              border: "1px solid var(--border)",
              padding: 8,
              cursor: "pointer",
              color: "var(--danger)",
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div
        className="ui-font"
        style={{
          fontSize: 11,
          color: "var(--text-muted)",
          marginBottom: 16,
          letterSpacing: ".08em",
        }}
      >
        {new Date(post.created_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
        {post.updated_at && post.updated_at !== post.created_at && (
          <span style={{ marginLeft: 12, fontStyle: "italic" }}>· modifié</span>
        )}
      </div>
      <RichViewer content={post.content} />
    </div>
  );
}
