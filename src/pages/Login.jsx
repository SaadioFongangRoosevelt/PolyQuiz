import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUsername } = useUser();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!input) return;

    setUsername(input);
    navigate("/quiz");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Entrez votre pseudo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Commencer</button>
    </div>
  );
}

export default Login;