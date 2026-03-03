// ProtectedRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { state } = useContext(AuthContext);

  // Wait until auth check is done
  if (state.loading) return <p className="text-center mt-20">Loading...</p>;

  if (!state.isAuthenticated) return <Navigate to="/login" replace />;
  if (state.user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}