import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import useFetch from "../hooks/useFetch";

export default function Resultats() {
  const { username, bestScore } = useUser();
  const navigate = useNavigate();
  const { data: questions } = useFetch("/questions.json");

  const ratio = useMemo(() => {
    if (!questions || questions.length === 0) return 0;
    return ((bestScore / questions.length) * 100).toFixed(2);
  }, [bestScore, questions]);

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Résultats</h1>
      <p>Pseudo: {username}</p>
      <p>Score: {bestScore} questions correctes</p>
      {questions && <p>Total de questions: {questions.length}</p>}
      <p>Ratio de réussite: {ratio}%</p>
      <button onClick={handleRestart}>Recommencer</button>
    </div>
  );
}