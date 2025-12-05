import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token"); 
  // OR use your real auth state if you have a context
console.log("   isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
