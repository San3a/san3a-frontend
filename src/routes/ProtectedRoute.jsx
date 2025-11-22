import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

  const decoded = jwtDecode(token);
  if (!allowedRoles.includes(decoded.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
