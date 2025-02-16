import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.userCredential;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo:""
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      
      });
      navigate ("/profile");
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="container">
      <div className="register-box">
        <h3 className="register-title">Sign Up</h3>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="First Name" className="input-field" onChange={(e) => setFname(e.target.value)} required />
          <input type="text" placeholder="Last Name" className="input-field" onChange={(e) => setLname(e.target.value)} />
          <input type="email" placeholder="Email" className="input-field" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="input-field" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn-primary">Sign Up</button>
        </form>

        <p className="register-link">
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
