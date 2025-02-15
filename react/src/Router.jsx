import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Favorites from "./Components/Favorites";
import Shop from "./Components/Shop";
import SearchPage from "./Components/SearchPage";
import Register from "./Components/Register";
import Login from "./Components/Login";

import Profile from "./Components/profile"; // صفحة الملف الشخصي بعد التسجيل
import { auth } from "./Components/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // تنظيف الاشتراك عند إلغاء التحميل
  }, []);

  return (
    <Router>
      <Navbar /> {/* يجب أن يكون خارج Routes لأنه يظهر في جميع الصفحات */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<SearchPage />} />

          {/* حماية الصفحات الخاصة بالمستخدم */}
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />

          {/* صفحات تسجيل الدخول */}
          <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<profile />} />

          {/* توجيه أي صفحة غير موجودة إلى الرئيسية */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default AppRouter;
