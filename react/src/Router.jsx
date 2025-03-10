import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Favorites from "./Components/Favorites";
import Shop from "./Components/Shop";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/profile"; 
import { auth } from "./Components/firebase";
import BookDetails from "./Components/BookDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
    
      <div className="App">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<profile />} />
          <Route path="*" element={<Navigate to="/Home" />} />
          <Route path="/book/:id" element={<BookDetails />} />
          
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default AppRouter;
