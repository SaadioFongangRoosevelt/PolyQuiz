import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import "./Resultats.css";

export default function Resultats() {
  const { username, bestScore } = useUser();
  const navigate = useNavigate();
  const { data: questions } = useFetch("/questions.json");

  const totalQuestions = questions?.length || 0;

  const ratio = useMemo(() => {
    if (!totalQuestions) return 0;
    return ((bestScore / totalQuestions) * 100).toFixed(0);
  }, [bestScore, totalQuestions]);

  const mention =
    ratio >= 80 ? " Excellent !" :
    ratio >= 50 ? " Bien joué !" :
    "Encore un effort! Tu vas y arriver.";

  return (
    <div className="resultats-container">
      <h1 className="resultats-title">Résultats</h1>

      <div className="score-display">
        <div className="score-large">{bestScore}/{totalQuestions}</div>
        <div className="score-sub">{mention}</div>
      </div>

      <div className="resultats-card">
        <div className="result-item">
          <span className="result-label">Pseudo</span>
          <span className="result-value">{username}</span>
        </div>

        <div className="score-bar">
          <div className="score-bar-header">
            <span className="score-bar-text">Reussite</span>
            <span className="score-bar-percent">{ratio}%</span>
          </div>
          <div className="score-bar-fill">
            <div
              className="score-bar-progress"
              style={{ width: `${ratio}%` }}
            />
          </div>
        </div>

        <div className="result-item">
          <span className="result-label">Bonnes reponses</span>
          <span className="result-value score-highlight">
            {bestScore} / {totalQuestions}
          </span>
        </div>

        <div className="result-item">
          <span className="result-label">Pourcentage</span>
          <span className="result-value score-highlight">{ratio}%</span>
        </div>
      </div>

      <div className="resultats-actions">
        <button onClick={() => navigate("/")}>Accueil ou Rejouer</button>
      </div>
    </div>
  );
}