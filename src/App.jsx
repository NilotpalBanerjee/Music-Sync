import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import MusicLogin from "./Music/pages/Login";
import MusicDashboard from "./Music/pages/Dashboard";
import MusicRoom from "./Music/pages/Room";

const RequireAuth = ({ children }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MusicLogin />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <MusicDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/room/:roomId"
        element={
          <RequireAuth>
            <MusicRoom />
          </RequireAuth>
        }
      />
      <Route path="/room" element={<Navigate to="/room/402938" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
