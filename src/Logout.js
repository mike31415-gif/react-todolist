import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.setToken && auth?.setUsername) {
      auth.setToken(null);
      auth.setUsername(null);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
    }
  }, [auth, navigate]);

  return null;
}

export default Logout;