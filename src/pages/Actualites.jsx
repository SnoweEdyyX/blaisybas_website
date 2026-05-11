import PageHero from "../components/ui/PageHero.jsx";
import NewsCard from "../components/ui/NewsCard.jsx";
import { NEWS } from "../data/news.js";

export default function Actualites() {
  return (
    <>
      <PageHero label="Gazette communale" title="Actualités" />
      <section style={{ padding: "60px 32px 100px" }}>
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 32,
          }}
        >
          {NEWS.map((n) => (
            <NewsCard key={n.id} news={n} />
          ))}
        </div>
      </section>
    </>
  );
}
