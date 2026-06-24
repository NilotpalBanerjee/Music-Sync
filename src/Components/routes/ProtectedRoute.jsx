import { Navigate, Outlet } from "react-router-dom";
import { getDecrypted } from "../../utils/AuthToken";

const ProtectedRoute = ({ type }) => {
  const principal = getDecrypted(
    "principal-token",
    import.meta.env.VITE_PRINCIPAL_LOGIN_KEY,
  );

  const deo = getDecrypted(
    "deo-token",
    import.meta.env.VITE_DEO_LOGIN_KEY,
  );

  const accounts = getDecrypted(
    "accounts-token",
    import.meta.env.VITE_ACCOUNTS_LOGIN_KEY,
  );

  const admin = getDecrypted(
    "admin-token",
    import.meta.env.VITE_ADMIN_LOGIN_KEY,
  );

  /* PUBLIC ROUTES */
  if (type === "public") {
    if (principal) return <Navigate to="/principal-dashboard" replace />;
    if (deo) return <Navigate to="/deo-dashboard" replace />;
    if (accounts) return <Navigate to="/accounts-dashboard" replace />;
    if (admin) return <Navigate to="/admin-dashboard" replace />;
    return <Outlet />;
  }
  /* Principal */
  if (type === "principal") {
    if (!principal) return <Navigate to="/not-found" replace />;
    return <Outlet />;
  }
  /* Deo */
  if (type === "deo") {
    if (!deo) return <Navigate to="/not-found" replace />;
    return <Outlet />;
  }
  /* Accounts */
  if (type === "accounts") {
    if (!accounts) return <Navigate to="/not-found" replace />;
    return <Outlet />;
  }
  /* Admin */
  if (type === "admin") {
    if (!admin) return <Navigate to="/not-found" replace />;
    return <Outlet />;
  }
  return <Navigate to="/not-found" replace />;
};

export default ProtectedRoute;
