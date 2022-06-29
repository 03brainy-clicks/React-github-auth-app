import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// user context
import UserContext from "./context/UserContext";

// react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Pagenotfound from "./components/Pagenotfound";
import Header from "./components/Header";

// firebase initializeApp
import Config from "./config/FirebaseConfig";

firebase.initializeApp(Config);

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Router>
        <ToastContainer />
        <UserContext.Provider value={{ user, setUser }}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="*" element={<Pagenotfound />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
