import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function ProtectedRoute({ children }) {
  const { username } = useUser();

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;