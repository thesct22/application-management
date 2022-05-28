import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/Auth";
import Home from "./components/Home";
import MainDashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Privacy from "./components/Privacy";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>}  />
            <Route path="/dashboard" element={<MainDashboard/>} />
            <Route path="/privacy" element={<Privacy/>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
