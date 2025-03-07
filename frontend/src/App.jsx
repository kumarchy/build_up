import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Form from "./pages/Form/Form"; // Ensured correct path
import Signup from "./components/Signup/Signup";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import PersonalProjects from "./pages/PersonalProjects/PersonalProjects";
import Homepage from "./pages/HomePage/Homepage";

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Router>
      <Navbar setShowSignup={setShowSignup} />
      {showSignup && <Signup />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/projectDetail/:projectId" element={<ProjectDetail />} />
        <Route path="/personalProjects/:userId" element={<PersonalProjects />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;