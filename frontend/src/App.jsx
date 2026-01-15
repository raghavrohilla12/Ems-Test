import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import UsersList from "./pages/UsersList";
import Signup from "./pages/Signup";

import AppNavbar from "./components/AppNavbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";

function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === "admin" ? "/admin/users" : "/profile"} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppNavbar />

        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={["admin", "user", "view"]}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute roles={["admin", "user", "view"]}>
                <UsersList />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
