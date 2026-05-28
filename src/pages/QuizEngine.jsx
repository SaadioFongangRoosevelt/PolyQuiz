import { useReducer, useEffect, useRef } from "react";
import { quizReducer } from "../reducers/quizReducer";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  status: "loading", // loading | playing | finished
  timeLeft: 60,
};

function QuizEngine() {
  const { data, loading, error } = useFetch("/questions.json");
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const navigate = useNavigate();
  const { setBestScore } = useUser();
  const timerRef = useRef(null);

  // Charger les questions
  useEffect(() => {
    if (data) {
      dispatch({ type: "START_QUIZ", payload: data });
    }
  }, [data]);

  // Chronomètre
  useEffect(() => {
    if (state.status === "playing" && state.timeLeft > 0) {
      timerRef.current = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    } else if (state.timeLeft === 0 && state.status === "playing") {
      clearInterval(timerRef.current);
      dispatch({ type: "FINISH_QUIZ" });
    }

    return () => clearInterval(timerRef.current);
  }, [state.status, state.timeLeft]);

  // Fin du quiz
  useEffect(() => {
    if (
      state.status === "playing" &&
      state.currentQuestionIndex >= state.questions.length &&
      state.questions.length > 0
    ) {
      clearInterval(timerRef.current);
      dispatch({ type: "FINISH_QUIZ" });
      setBestScore(state.score);
      navigate("/resultats");
    }
  }, [state.currentQuestionIndex, state.status, state.questions.length, state.score, navigate, setBestScore]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur</p>;

  const currentQuestion =
    state.questions[state.currentQuestionIndex];

  return (
    <div>
      <h2>Quiz</h2>
      <p>Temps restant: {state.timeLeft}s</p>
      <p>Score: {state.score}/{state.questions.length}</p>

      {state.status === "playing" && currentQuestion && (
        <div>
          <h3>{currentQuestion.libellé}</h3>

          {currentQuestion.options.map((opt, index) => (
            <button
              key={index}
              onClick={() =>
                dispatch({
                  type: "ANSWER_QUESTION",
                  payload: opt,
                })
              }
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizEngine;