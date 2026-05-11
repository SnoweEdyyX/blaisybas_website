import { useState } from "react";
import { X } from "lucide-react";
import PageHero from "../components/ui/PageHero.jsx";
import { GALLERY } from "../data/gallery.js";

export default function Galerie() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PageHero label="Le village en images" title="Galerie" italic="photographique" />

      <section style={{ padding: "60px 32px 100px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 12,
            }}
          >
            {GALLERY.map((img, i) => (
              <button
                key={i}
                className="hover-lift"
                onClick={() => setSelected(img)}
                aria-label={img.t}
                style={{
                  aspectRatio: i % 3 === 1 ? "3/4" : "4/3",
                  background: img.g,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  animation: `fadeUp .6s ease ${i * 0.06}s backwards`,
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,.6) 0%, transparent 50%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 24,
                    textAlign: "left",
                  }}
                >
                  <div>
                    <div
                      className="ui-font"
                      style={{
                        fontSize: 9,
                        letterSpacing: ".3em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,.7)",
                        marginBottom: 6,
                        fontWeight: 600,
                      }}
                    >
                      Photo {String(i + 1).padStart(2, "0")}
                    </div>
                    <div
                      className="display-font"
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        color: "#fff",
                        lineHeight: 1.2,
                      }}
                    >
                      {img.t}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && <Lightbox image={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

function Lightbox({ image, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.92)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          width: "100%",
          aspectRatio: "16/10",
          background: image.g,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", bottom: 32, left: 32 }}>
          <div
            className="display-font"
            style={{ fontSize: 36, fontWeight: 700, color: "#fff" }}
          >
            {image.t}
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,0,0,.5)",
            border: "none",
            color: "#fff",
            padding: 12,
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}
