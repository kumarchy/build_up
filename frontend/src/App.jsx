import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Form from "./pages/Form/Form";
import Signup from "./components/Signup/Signup";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import PersonalProjects from "./pages/PersonalProjects/PersonalProjects";
import Homepage from "./pages/HomePage/Homepage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogin = (user) => {
    // User is already stored in localStorage by Signup component
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <Signup onLogin={handleLogin} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projectDetail/:projectId" element={<ProjectDetail />} />
            <Route path="/personalProjects/:userId" element={<PersonalProjects />} />
            <Route path="/form" element={<Form />} />
            <Route path="/signup" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;