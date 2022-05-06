import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LogoutLogic = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch (error) {
      setError("Failed to logout");
    }
  }

  return { handleLogout };
};

export default LogoutLogic;
