import { Routes, Route, useLocation } from "react-router-dom";

// Layout site public
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import AlertBanner from "./components/layout/AlertBanner.jsx";

// Pages publiques
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

// Pages admin
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminBanner from "./pages/admin/AdminBanner.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";

// Hooks
import { useTheme } from "./hooks/useTheme.js";
import { useAssocAuth } from "./hooks/useAssocAuth.js";
import { useAllPosts } from "./hooks/usePosts.js";

export default function App() {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { loggedAssoc, login, logout } = useAssocAuth();
  const { allPosts, reloadOne } = useAllPosts();
  const { pathname } = useLocation();

  // Détecter si on est sur une route admin (pour cacher Header/Footer publics)
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <AlertBanner />}
      {!isAdminRoute && <Header isDark={isDark} toggleTheme={toggleTheme} />}

      <main>
        <Routes>
          {/* Routes publiques */}
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

          {/* Routes admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/banner"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminBanner />
                </AdminLayout>
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}
