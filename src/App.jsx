import './App.css'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Resultats from "./pages/Resultats";

import ProtectedRoute from "./components/ProtectedRoute";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resultats"
          element={
            <ProtectedRoute>
              <Resultats />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
