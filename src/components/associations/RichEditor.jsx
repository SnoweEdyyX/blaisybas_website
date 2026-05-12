import { useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered, Quote,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon,
  Undo, Redo, Palette, Type, Code,
} from "lucide-react";
import { uploadImage } from "../../lib/storage.js";

// Palette de couleurs cohérente avec le design du site
const COLORS = [
  { name: "Défaut", value: "" },
  { name: "Noir", value: "#1f1a14" },
  { name: "Or", value: "#b8893a" },
  { name: "Bleu", value: "#1e40af" },
  { name: "Rouge", value: "#dc2626" },
  { name: "Vert", value: "#15803d" },
  { name: "Violet", value: "#7c3aed" },
  { name: "Orange", value: "#ea580c" },
  { name: "Gris", value: "#6b7280" },
  { name: "Rose", value: "#db2777" },
];

const FONT_SIZES = [
  { label: "Petit", value: "0.875rem" },
  { label: "Normal", value: "1rem" },
  { label: "Grand", value: "1.25rem" },
  { label: "Très grand", value: "1.5rem" },
];

/**
 * Éditeur riche Tiptap avec toolbar complète.
 *
 * @param value - contenu JSON Tiptap initial
 * @param onChange - callback (json) appelé à chaque modification
 * @param assocId - pour ranger les images dans le bon dossier
 */
export default function RichEditor({ value, onChange, assocId }) {
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "editor-link" },
      }),
      ImageResize.configure({
        inline: false,
        HTMLAttributes: { class: "editor-image" },
      }),
      Youtube.configure({ width: 640, height: 360 }),
      Placeholder.configure({
        placeholder: "Commencez à écrire votre publication…",
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  const handleImageUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      try {
        const url = await uploadImage(file, assocId);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (err) {
        alert("Erreur lors de l'upload de l'image. Réessayez.");
        console.error(err);
      }
      e.target.value = "";
    },
    [editor, assocId]
  );

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href;
    const url = window.prompt("URL du lien :", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addYoutube = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL de la vidéo YouTube :");
    if (url) editor.commands.setYoutubeVideo({ src: url });
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="rich-editor">
      <EditorStyles />

      <div className="editor-toolbar">
        {/* Annuler / Refaire */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Annuler"
        >
          <Undo size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Refaire"
        >
          <Redo size={15} />
        </ToolbarBtn>

        <Sep />

        {/* Titres */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          title="Titre 1"
        >
          <Heading1 size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          title="Titre 2"
        >
          <Heading2 size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          title="Titre 3"
        >
          <Heading3 size={15} />
        </ToolbarBtn>

        <Sep />

        {/* Style de texte */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Gras (Ctrl+B)"
        >
          <Bold size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italique (Ctrl+I)"
        >
          <Italic size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Souligné (Ctrl+U)"
        >
          <UnderlineIcon size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          title="Barré"
        >
          <Strikethrough size={15} />
        </ToolbarBtn>

        <Sep />

        {/* Couleur de texte */}
        <ColorPicker editor={editor} />

        <Sep />

        {/* Alignement */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
          title="Aligner à gauche"
        >
          <AlignLeft size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
          title="Centrer"
        >
          <AlignCenter size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
          title="Aligner à droite"
        >
          <AlignRight size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
          title="Justifier"
        >
          <AlignJustify size={15} />
        </ToolbarBtn>

        <Sep />

        {/* Listes */}
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Liste à puces"
        >
          <List size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Liste numérotée"
        >
          <ListOrdered size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Citation"
        >
          <Quote size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Bloc de code"
        >
          <Code size={15} />
        </ToolbarBtn>

        <Sep />

        {/* Médias */}
        <ToolbarBtn onClick={setLink} active={editor.isActive("link")} title="Lien">
          <LinkIcon size={15} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => fileInputRef.current?.click()}
          title="Ajouter une image"
        >
          <ImageIcon size={15} />
        </ToolbarBtn>
        <ToolbarBtn onClick={addYoutube} title="Vidéo YouTube">
          <YoutubeIcon size={15} />
        </ToolbarBtn>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
}

function ToolbarBtn({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`toolbar-btn ${active ? "active" : ""}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="toolbar-sep" />;
}

function ColorPicker({ editor }) {
  return (
    <div className="color-picker">
      <button type="button" className="toolbar-btn" title="Couleur du texte">
        <Palette size={15} />
      </button>
      <div className="color-dropdown">
        {COLORS.map((c) => (
          <button
            key={c.value || "default"}
            type="button"
            title={c.name}
            onClick={() => {
              if (c.value) {
                editor.chain().focus().setColor(c.value).run();
              } else {
                editor.chain().focus().unsetColor().run();
              }
            }}
            className="color-swatch"
            style={{
              background: c.value || "transparent",
              border: c.value ? "none" : "1px dashed var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function EditorStyles() {
  return (
    <style>{`
      .rich-editor {
        border: 1px solid var(--border);
        background: var(--surface);
        font-family: 'Cormorant Garamond', Georgia, serif;
      }

      .editor-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        padding: 8px;
        background: var(--bg-alt);
        border-bottom: 1px solid var(--border);
        align-items: center;
      }

      .toolbar-btn {
        background: none;
        border: 1px solid transparent;
        padding: 7px;
        cursor: pointer;
        color: var(--text);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .15s;
        border-radius: 0;
      }
      .toolbar-btn:hover:not(:disabled) {
        background: var(--surface);
        border-color: var(--border);
      }
      .toolbar-btn.active {
        background: var(--accent);
        color: #fff;
      }
      .toolbar-btn:disabled {
        opacity: .3;
        cursor: not-allowed;
      }

      .toolbar-sep {
        width: 1px;
        height: 22px;
        background: var(--border);
        margin: 0 4px;
      }

      .color-picker {
        position: relative;
      }
      .color-dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background: var(--surface);
        border: 1px solid var(--border);
        padding: 8px;
        z-index: 50;
        flex-wrap: wrap;
        width: 132px;
        gap: 4px;
        box-shadow: 0 8px 24px rgba(0,0,0,.15);
      }
      .color-picker:hover .color-dropdown {
        display: flex;
      }
      .color-swatch {
        width: 24px;
        height: 24px;
        cursor: pointer;
        padding: 0;
        transition: transform .15s;
      }
      .color-swatch:hover {
        transform: scale(1.15);
      }

      .editor-content {
        padding: 24px;
        min-height: 280px;
      }
      .editor-content .ProseMirror {
        outline: none;
        font-size: 17px;
        line-height: 1.6;
        color: var(--text);
        min-height: 240px;
      }
      .editor-content .ProseMirror p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        color: var(--text-muted);
        float: left;
        pointer-events: none;
        height: 0;
        font-style: italic;
      }
      .editor-content h1, .editor-content h2, .editor-content h3 {
        font-family: 'Fraunces', 'Playfair Display', Georgia, serif;
        font-weight: 700;
        letter-spacing: -.02em;
        margin: 1.4em 0 .5em;
        line-height: 1.15;
      }
      .editor-content h1 { font-size: 2em; }
      .editor-content h2 { font-size: 1.5em; }
      .editor-content h3 { font-size: 1.25em; }
      .editor-content blockquote {
        border-left: 3px solid var(--accent);
        padding-left: 20px;
        margin: 1em 0;
        font-style: italic;
        color: var(--text-muted);
      }
      .editor-content ul, .editor-content ol {
        padding-left: 24px;
        margin: 1em 0;
      }
      .editor-content li { margin: .3em 0; }
      .editor-content a {
        color: var(--accent);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .editor-content img {
        max-width: 100%;
        height: auto;
        margin: 1em 0;
        display: block;
      }
      .editor-content code {
        background: var(--bg-alt);
        padding: 2px 6px;
        font-family: 'Menlo', monospace;
        font-size: .9em;
      }
      .editor-content pre {
        background: var(--bg-alt);
        padding: 16px;
        overflow-x: auto;
        margin: 1em 0;
      }
      .editor-content pre code {
        background: transparent;
        padding: 0;
      }
      .editor-content iframe {
        max-width: 100%;
        margin: 1em 0;
      }
    `}</style>
  );
}