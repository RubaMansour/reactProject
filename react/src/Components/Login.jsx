import React, { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";  // ✅ إضافة الاستيراد المفقود
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!", { position: "top-center" });
      navigate("/shop");
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "consent" }); 
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName || "No Name",
          photo: user.photoURL || "",
          lastName: "",
        });
        toast.success("User logged in Successfully", { position: "top-center" });
      }

      navigate("/shop");
    } catch (error) {
      console.error("Google Login Error:", error); // ✅ طباعة الخطأ في Console لفهم السبب
      toast.error("Failed to sign in with Google.", { position: "top-center" });
    }
    
  };

  return (
    <div className="container">
      <div className="login-box">
        <h3 className="login-title">Login</h3>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" className="input-field" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="input-field" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary">Login</button>
        </form>

        <p className="separator">OR</p>

        <button onClick={googleLogin} className="btn-google">
          <FaGoogle /> Sign in with Google
        </button>

        <p className="register-link">
          Not registered? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
