import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  return children;
}
