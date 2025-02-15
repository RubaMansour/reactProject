import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaHeart, FaUser, FaHome, FaList, FaTags, FaStore } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    const favorites = useSelector((state) => state.books.favorites || []); // ✅ تأكد أن المتغير ليس undefined

    return (
        <div>
            <header className="header">
                <div className="header_one">
                    <Link to="/" className="logo">book</Link>
                    <nav className="navbar">
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                        <NavLink to="/shop" className={({ isActive }) => isActive ? "active" : ""}>Shop</NavLink>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
                    </nav>

                    <div className="icons">
                        <Link to="/favorites">
                            <FaHeart />
                            <span>{favorites.length}</span> {/* ✅ تأكد من وجود العدد */}
                        </Link>
                        <Link to="/cart"><FaCartShopping /></Link>

                        {/* ✅ هنا المشكلة - يجب أن يكون الأيقونة داخل `Link` مباشرة */}
                        <Link to="/login">
                            <FaUser className="user-btn" />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="bottom-navbar">
                <NavLink to="/"> <FaHome /> </NavLink>
                <NavLink to="/shop"> <FaList /> </NavLink>
                <NavLink to="/categories"> <FaTags /> </NavLink>
                <NavLink to="/store"> <FaStore /> </NavLink>
            </div>
        </div>
    );
};

export default Navbar;
