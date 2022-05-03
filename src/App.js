import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Auth";
import Home from "./components/Home";
import MainDashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>}  />
            <Route exact path="/dashboard" element={<MainDashboard/>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
