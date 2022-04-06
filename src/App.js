import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login.jsx"
import Quiz from './pages/Quiz'
import NotLoggedIn from './pages/NotLoggedIn'
import Protected from "./pages/Protected.jsx"
import SubmitPage from "./pages/SubmitPage.jsx"
import LivePage from "./pages/LivePage.jsx"
import QuizTimer from "./pages/QuizTimer.jsx"

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/NotLoggedIn" element={<NotLoggedIn />} />
        <Route path="/Protected" element={<Protected />} />
        <Route path="/SubmitPage" element={<SubmitPage />} />
        <Route path="/LivePage" element={<LivePage />} />
        <Route path="/:jwt" element={<QuizTimer />} />

      </Routes>
    </div>
  )
}
