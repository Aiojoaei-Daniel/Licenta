import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LogoutLogic = (setCurrentStudent) => {
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    history.push("/");
  }

  const handleStudentLogout = () => {
    const keys = ["email", "group", "specialization", "id"];
    keys.map((key) => localStorage.removeItem(key));
    setCurrentStudent({});
  };

  return { handleLogout, handleStudentLogout };
};

export default LogoutLogic;
