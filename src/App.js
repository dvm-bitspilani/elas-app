import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Quiz from "./pages/Quiz";
import NotLoggedIn from "./pages/NotLoggedIn";
import Protected from "./pages/Protected.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";
import LivePage from "./pages/LivePage.jsx";
import QuizTimer from "./pages/QuizTimer.jsx";
import QuizQuestion from "./pages/QuizQuestion.jsx";
import QuizOver from "./pages/QuizOver.jsx";
import Leaderboard from "./pages/Leaderboard";
import GameShowLeaderboard from "./pages/GameShowLeaderboard";
import PrelimsLeaderboard from "./pages/PrelimsLeaderboard";

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/Login" element={<Login />} /> */}
        {/* <Route path="/Quiz" element={<Quiz />} /> */}
        <Route path="/NotLoggedIn" element={<NotLoggedIn />} />
        {/* <Route path="/Protected" element={<Protected />} /> */}
        <Route path="/SubmitPage" element={<SubmitPage />} />

     
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/GameShowLeaderboard" element={<GameShowLeaderboard />} />
        <Route path="/PrelimsLeaderboard" element={<PrelimsLeaderboard />} />

        {/* <Route path="/LivePage" element={<LivePage />} /> */}

        <Route path="/QuizQuestion" exact element={<QuizQuestion />} />
        {/* <Route path="/QuizOver" exact element={<QuizOver />} /> */}
        <Route path="/:jwt" element={<QuizTimer />} />
      </Routes>
    </div>
  );
}
