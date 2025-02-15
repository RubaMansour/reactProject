// src/components/Home.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // مراقبة حالة المستخدم وتحديثها عند التغيير
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // تنظيف الاشتراك عند تفريغ المكون
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      {/* ✅ صفحة تسجيل الدخول تظهر دائمًا */}
      <Login />

      {/* ✅ إذا كان هناك مستخدم، يتم عرض بياناته وزر تسجيل الخروج */}
      {user && (
        <div>
          <h1>Welcome, {user?.displayName || user?.email}</h1>
          <p>Email: {user?.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
