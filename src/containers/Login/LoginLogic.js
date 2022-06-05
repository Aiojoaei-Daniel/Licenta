import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function LoginLogic() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  return { handleSubmit, error, emailRef, passwordRef, loading, currentUser };
}

export default LoginLogic;
