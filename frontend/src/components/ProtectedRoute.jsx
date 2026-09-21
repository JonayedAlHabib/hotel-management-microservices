import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// allowedRoles is a UX convenience only — it hides pages a role shouldn't see,
// it is NOT the real access control. The actual enforcement already lives
// server-side (requireRole on each backend route); even if this check were
// bypassed entirely, the API would still reject the request with 403.
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-slate-500">
        Loading…
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-slate-500">
        You don't have access to this page.
      </div>
    );
  }

  return children;
}
