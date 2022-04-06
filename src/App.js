import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Login.jsx"
import Quiz from './pages/Quiz'
import NotLoggedIn from './pages/NotLoggedIn'
import Protected from "./pages/Protected.jsx"

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Quiz" element={<Quiz />} />
        <Route path="/NotLoggedIn" element={<NotLoggedIn />} />
        <Route path="/Protected" element={<Protected />} />
      </Routes>
    </div>
  )
}
