import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ استيراد useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ تهيئة useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User Logged In Successfully", { position: "top-center" });
      navigate("/shop"); // ✅ التوجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" }); 
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      window.location.href = "/shop"; 
    
      
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Failed to sign in with Google. Try again.", { position: "top-center" });
    }
  };

  return (
    <div className="login-container" style={{ textAlign: "center", padding: "20px" }}>
      <h3>Login</h3>

      <form onSubmit={handleLogin} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <p className="forgot-password text-right">
          Not registered yet? <a href="/register">Sign Up</a>
        </p>
      </form>

      <p className="continue-p">-- Or continue with --</p>

      <button
        onClick={googleLogin}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        <FaGoogle size={20}  /> Sign in with Google
      </button>
      
    </div>
  );
};

export default Login;
