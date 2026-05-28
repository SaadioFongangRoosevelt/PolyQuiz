import { useReducer, useEffect, useRef } from "react";
import { quizReducer } from "../reducers/quizReducer";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "./QuizEngine.css";

const TOTAL_TIME = 60;
const LETTERS = ["A", "B", "C", "D"];

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  status: "loading",
  timeLeft: TOTAL_TIME,
};

function QuizEngine() {
  const { data, loading, error } = useFetch("/questions.json");
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const navigate = useNavigate();
  const { setBestScore } = useUser();
  const timerRef = useRef(null);

  useEffect(() => {
    if (data) dispatch({ type: "START_QUIZ", payload: data });
  }, [data]);

  useEffect(() => {
    if (state.status === "playing" && state.timeLeft > 0) {
      timerRef.current = setInterval(() => dispatch({ type: "TICK" }), 1000);
    } else if (state.timeLeft === 0 && state.status === "playing") {
      clearInterval(timerRef.current);
      dispatch({ type: "FINISH_QUIZ" });
    }
    return () => clearInterval(timerRef.current);
  }, [state.status, state.timeLeft]);

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

  if (loading) return <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Chargement…</p>;
  if (error)   return <p style={{ textAlign: "center", color: "var(--warning-color)" }}>Erreur lors du chargement des questions</p>;

  const currentQuestion = state.questions[state.currentQuestionIndex];
  const timerPercent = (state.timeLeft / TOTAL_TIME) * 100;
  const timerClass = state.timeLeft < 5 ? "critical" : state.timeLeft < 10 ? "warning" : "";

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 style={{color: "blue"}}>PolyQuiz</h2>
        <div className="quiz-stats">
          <div className="stat">
            <span className="stat-label">Question</span>
            <span className="stat-value">
              {state.currentQuestionIndex + 1}/{state.questions.length}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-value">{state.score}</span>
          </div>
        </div>
      </div>

      <div className="timer-wrapper">
        <div className={`timer ${timerClass}`}>{state.timeLeft}s</div>
        <div className="timer-bar">
          <div
            className={`timer-bar-fill ${timerClass}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      {state.status === "playing" && currentQuestion && (
        <div className="question-container">
          <div className="question-number">
            Question {state.currentQuestionIndex + 1} · {currentQuestion.catégorie}
          </div>
          <h3 className="question-text">{currentQuestion.libellé}</h3>
          <div className="options">
            {currentQuestion.options.map((opt, index) => (
              <button
                key={index}
                className="option-button"
                data-letter={LETTERS[index]}
                onClick={() => dispatch({ type: "ANSWER_QUESTION", payload: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizEngine;