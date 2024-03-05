import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUserPage from "./Pages/LoginUserPage";
import CreateUserPage from "./Pages/CreateUserPage";
import HomePage from "./Pages/HomePage";
// import PrivateRoute from "./utils/AuthProvider"

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginUserPage />} />
            <Route path="/createUserPage" element={<CreateUserPage />} />
            <Route path="/home" element={<HomePage/>}/>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
