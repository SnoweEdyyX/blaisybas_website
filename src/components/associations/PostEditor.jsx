import { useState, useEffect } from "react";
import { Check, Plus } from "lucide-react";
import RichEditor from "./RichEditor.jsx";

/**
 * Formulaire de création / édition d'une publication d'association.
 * Utilise Tiptap pour le contenu riche (texte + photos).
 */
export default function PostEditor({ editingPost, assocId, onSubmit, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [busy, setBusy] = useState(false);
  // editorKey force le remount de l'éditeur quand on change de post
  const [editorKey, setEditorKey] = useState(0);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setContent(editingPost.content || null);
    } else {
      setTitle("");
      setContent(null);
    }
    setEditorKey((k) => k + 1);
  }, [editingPost]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Veuillez ajouter un titre.");
      return;
    }
    if (!content || isEmptyContent(content)) {
      alert("Le contenu de la publication est vide.");
      return;
    }
    setBusy(true);
    try {
      await onSubmit(title.trim(), content);
      // Reset si on était en création
      if (!editingPost) {
        setTitle("");
        setContent(null);
        setEditorKey((k) => k + 1);
      }
    } catch (err) {
      alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        background: "var(--surface)",
        padding: 40,
        border: "1px solid var(--border)",
      }}
    >
      <h2
        className="display-font"
        style={{
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "-.02em",
          margin: "0 0 32px",
        }}
      >
        {editingPost ? "Modifier la publication" : "Nouvelle publication"}
      </h2>

      <label>Titre</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Annonce du prochain événement…"
        style={{ fontSize: 16 }}
      />

      <div style={{ height: 24 }} />

      <label>Contenu</label>
      <RichEditor
        key={editorKey}
        value={content}
        onChange={setContent}
        assocId={assocId}
      />

      <div
        className="ui-font"
        style={{
          fontSize: 11,
          color: "var(--text-muted)",
          marginTop: 12,
          letterSpacing: ".03em",
        }}
      >
        💡 Astuce : utilisez les boutons de la barre d'outils pour mettre en forme,
        ajouter photos, vidéos YouTube et liens.
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
        <button onClick={handleSubmit} className="btn-primary" disabled={busy}>
          {busy ? (
            "Enregistrement…"
          ) : editingPost ? (
            <>
              <Check size={14} /> Enregistrer les modifications
            </>
          ) : (
            <>
              <Plus size={14} /> Publier
            </>
          )}
        </button>
        {editingPost && (
          <button onClick={onCancelEdit} className="btn-outline" disabled={busy}>
            Annuler
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Détecte si un document Tiptap est "vide" (un seul paragraphe sans contenu).
 */
function isEmptyContent(doc) {
  if (!doc || !doc.content) return true;
  if (doc.content.length === 0) return true;
  if (doc.content.length === 1) {
    const first = doc.content[0];
    if (first.type === "paragraph" && (!first.content || first.content.length === 0)) {
      return true;
    }
  }
  return false;
}
