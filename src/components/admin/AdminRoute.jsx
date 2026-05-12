import { Navigate } from "react-router-dom";
import { useAdmin } from "../../hooks/useAdmin.js";

/**
 * Wrapper qui n'affiche son contenu que si l'utilisateur est admin.
 * Sinon, redirige vers /admin/login.
 */
export default function AdminRoute({ children }) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
          color: "var(--text-muted)",
          fontFamily: "'Inter Tight', sans-serif",
          fontSize: 14,
          letterSpacing: ".15em",
          textTransform: "uppercase",
        }}
      >
        Vérification de la session…
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
