import { Routes, Route } from "react-router-dom";

// Layout
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import AlertBanner from "./components/layout/AlertBanner.jsx";

// Pages
import Accueil from "./pages/Accueil.jsx";
import Village from "./pages/Village.jsx";
import Mairie from "./pages/Mairie.jsx";
import Actualites from "./pages/Actualites.jsx";
import Agenda from "./pages/Agenda.jsx";
import Galerie from "./pages/Galerie.jsx";
import Associations from "./pages/Associations.jsx";
import EspaceAsso from "./pages/EspaceAsso.jsx";
import Commerces from "./pages/Commerces.jsx";
import Signalement from "./pages/Signalement.jsx";
import Contact from "./pages/Contact.jsx";

// Hooks
import { useTheme } from "./hooks/useTheme.js";
import { useAssocAuth } from "./hooks/useAssocAuth.js";
import { useAllPosts } from "./hooks/usePosts.js";

/**
 * Composant racine.
 *
 * État global remonté ici puis passé en props :
 *   - thème (sombre/clair)
 *   - authentification association
 *   - cache des posts par association
 */
export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { loggedAssoc, login, logout } = useAssocAuth();
  const { allPosts, reloadOne } = useAllPosts();

  return (
    <>
      <AlertBanner message="Info municipale · Coupure d'eau prévue rue du Presbytère mercredi 13 mai de 9h à 12h" />

      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/village" element={<Village />} />
          <Route path="/mairie" element={<Mairie />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route
            path="/associations"
            element={<Associations allPosts={allPosts} onLogin={login} />}
          />
          <Route
            path="/espace-asso"
            element={
              <EspaceAsso
                loggedAssoc={loggedAssoc}
                onLogout={logout}
                posts={loggedAssoc ? allPosts[loggedAssoc.id] || [] : []}
                reloadOne={reloadOne}
              />
            }
          />
          <Route path="/commerces" element={<Commerces />} />
          <Route path="/signalement" element={<Signalement />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
