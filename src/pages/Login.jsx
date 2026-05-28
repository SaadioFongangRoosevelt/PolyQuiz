import { useUser } from "../context/UserContext";
import { useState } from "react";

function Login() {
  const { setUsername } = useUser();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    setUsername(input);
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
