import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomeScreen";
import Login from "./pages/LoginScreen";
import SesionScreen from "./pages/SesionScreen";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/sesion" element={<SesionScreen />} />
      </Routes>
    </Router>
  );
}