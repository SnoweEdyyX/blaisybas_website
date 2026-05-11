import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";

/**
 * Affichage lecture seule d'un contenu Tiptap.
 * Utilise le même set d'extensions que l'éditeur pour un rendu identique.
 */
export default function RichViewer({ content }) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Image,
      Youtube.configure({ width: 640, height: 360 }),
    ],
    content: content || "",
  });

  if (!editor) return null;

  return (
    <>
      <ViewerStyles />
      <div className="rich-viewer">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}

function ViewerStyles() {
  return (
    <style>{`
      .rich-viewer .ProseMirror {
        outline: none;
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 17px;
        line-height: 1.7;
        color: var(--text);
      }
      .rich-viewer .ProseMirror > *:first-child { margin-top: 0; }
      .rich-viewer .ProseMirror > *:last-child { margin-bottom: 0; }

      .rich-viewer h1, .rich-viewer h2, .rich-viewer h3 {
        font-family: 'Fraunces', 'Playfair Display', Georgia, serif;
        font-weight: 700;
        letter-spacing: -.02em;
        margin: 1.4em 0 .5em;
        line-height: 1.15;
      }
      .rich-viewer h1 { font-size: 1.875em; }
      .rich-viewer h2 { font-size: 1.5em; }
      .rich-viewer h3 { font-size: 1.25em; }

      .rich-viewer blockquote {
        border-left: 3px solid var(--accent);
        padding-left: 20px;
        margin: 1em 0;
        font-style: italic;
        color: var(--text-muted);
      }

      .rich-viewer ul, .rich-viewer ol {
        padding-left: 24px;
        margin: 1em 0;
      }
      .rich-viewer li { margin: .3em 0; }

      .rich-viewer a {
        color: var(--accent);
        text-decoration: underline;
        text-underline-offset: 3px;
      }
      .rich-viewer a:hover { opacity: .8; }

      .rich-viewer img {
        max-width: 100%;
        height: auto;
        margin: 1em 0;
        display: block;
      }

      .rich-viewer code {
        background: var(--bg-alt);
        padding: 2px 6px;
        font-family: 'Menlo', monospace;
        font-size: .9em;
      }
      .rich-viewer pre {
        background: var(--bg-alt);
        padding: 16px;
        overflow-x: auto;
        margin: 1em 0;
      }
      .rich-viewer pre code {
        background: transparent;
        padding: 0;
      }

      .rich-viewer iframe {
        max-width: 100%;
        width: 100%;
        aspect-ratio: 16/9;
        height: auto !important;
        margin: 1em 0;
      }
    `}</style>
  );
}
