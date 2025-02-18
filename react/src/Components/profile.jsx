import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth"; 

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  
  const fetchUserData = async (user) => {
    setUserDetails({
      email: user.email,
      uid: user.uid,
      displayName: user.displayName || "No Name", 
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user);
      } else {
        console.log("No user is logged in.");
        navigate("/login"); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      const user = auth.currentUser;
      try {
        await deleteUser(user); 
        console.log("User account deleted successfully!");

       
        navigate("/login");
      } catch (error) {
        console.error("Error deleting account:", error.message);
      }
    }
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      navigate("/login"); 
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.displayName} 🙏🙏</h3>
          <div>
            <p>Email: {userDetails.email}</p>
          </div>

          
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>

       
          <button className="btn btn-danger" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </>
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  );
}

export default Profile;
