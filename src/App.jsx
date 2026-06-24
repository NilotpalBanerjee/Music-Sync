import { Routes, Route } from "react-router-dom";
import PrincipalLogin from "./Principal/pages/Login";
import DeoLogin from "./DEO/pages/DeoLogin";
import AccountsLogin from "./Accounts/pages/AccountsLogin";
import AdminLogin from "./Admin/pages/AdminLogin";
import PrincipalRoutes from "./Components/routes/PrincipalRoutes";
import DeoRoutes from "./Components/routes/DeoRoutes";
import AccountsRoutes from "./Components/routes/AccountsRoutes";
import AdminRoutes from "./Components/routes/AdminRoutes";
import { use, useEffect } from "react";
import ProtectedRoute from "./Components/routes/ProtectedRoute";
import NotFound from "./Components/NotFound";
import Home from "./Components/Home";
import useDevTools from "./hook/useDevTools";

function App() {
  useDevTools(false);

  useEffect(() => {
    const handleStorageChange = () => {
      window.location.reload();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoute type="public" />}>
        <Route path="/principal" element={<PrincipalLogin />} />
        <Route path="/deo" element={<DeoLogin />} />
        <Route path="/accounts" element={<AccountsLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Route>

      {PrincipalRoutes()}
      {DeoRoutes()}
      {AccountsRoutes()}
      {AdminRoutes()}
      <Route path="/" element={<Home />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;
