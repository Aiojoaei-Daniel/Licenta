import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LogoutLogic = (setStudentData) => {
  // const [error, setError] = useState("");
  const history = useHistory();
  const { logout } = useAuth();

  async function handleLogout() {
    // setError("");

    // try {
    await logout();
    history.push("/");
    // } catch (error) {
    // setError("Failed to logout");
    // }
  }

  const handleStudentLogout = () => {
    setStudentData({});
  };

  return { handleLogout, handleStudentLogout };
};

export default LogoutLogic;
