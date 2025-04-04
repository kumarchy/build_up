import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("user", username); 
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <Signup onLogin={handleLogin} />
      ) : (
        <>
          <Navbar />
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
