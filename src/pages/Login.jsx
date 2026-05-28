import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const { setUsername } = useUser();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!input.trim()) return;
    setUsername(input.trim());
    navigate("/quiz");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="login-container">
      <div className="login-icon " style={{color: "cyan"}}>PQ</div>
      <div className="login-title">PolyQuiz</div>
      <div className="login-divider" />
      <p className="login-subtitle">
        Testez vos connaissances avec des quiz chronometres
      </p>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Entrez votre pseudo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          autoFocus
        />
        <button onClick={handleSubmit}>Commencer</button>
      </form>
      <p className="login-footer">Mr Ross All Rights Reserved </p>
    </div>
  );
}

export default Login;