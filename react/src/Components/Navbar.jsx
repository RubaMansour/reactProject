import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaUser, FaHome, FaList, FaTags, FaStore,FaSignOutAlt } from "react-icons/fa";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
      const navigate = useNavigate();
      const user = auth.currentUser;
    
      const handleLogout = () => {
        auth.signOut();
        navigate("/login");
      };
    const favorites = useSelector((state) => state.books.favorites || []);

    return (
        <div>
            <header className="header">
                <div className="header_one">
                    <Link to="/" className="logo"> <img  src="logo2.png"/></Link>
                    <nav className="navbar">
                        <NavLink to="/Home" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                        <NavLink to="/shop" className={({ isActive }) => isActive ? "active" : ""}>Shop</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
                    </nav>

                    <div className="icons">
                        <Link to="/favorites">
                            <FaHeart />
                            <span>{favorites.length}</span>
                        </Link>

                        {user ? (
                            < div onClick={handleLogout}className="logout-btn">
                                <FaSignOutAlt />
                            </div>
                        ) : (
                            <Link to="/login">
                                <FaUser className="user-btn" />
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            <div className="bottom-navbar">
                <NavLink to="/Home"> <FaHome /> </NavLink>
                <NavLink to="/shop"> <FaStore /> </NavLink>
                <NavLink to="/categories"> <FaTags /> </NavLink>
               
            </div>
        </div>
    );
};

export default Navbar;
