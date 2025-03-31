import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import 'bootstrap-icons/font/bootstrap-icons.css';

// Simple helper to decode a JWT token payload
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function Navbar({ title }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = parseJwt(token);
            if (payload && payload.username) {
                setUsername(payload.username);
            }
        }
    }, []);

    return (
        <nav className="bg-navbg !no-underline text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-4 py-2">
                {/* Logo & Main Links */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="font-bold text-lg !no-underline text-white">
                        {title}
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link to="/" className="!no-underline text-white flex items-center">
                            <i className="bi bi-house mr-1"></i> Home
                        </Link>
                        <Link to="/about" className="!no-underline text-white flex items-center">
                            <i className="bi bi-info-circle mr-1"></i> About Us
                        </Link>
                        <Link to="/contact" className="!no-underline text-white flex items-center">
                            <i className="bi bi-envelope mr-1"></i> Contact Us
                        </Link>
                        <Link to="/create" className="!no-underline text-white flex items-center">
                            <i className="bi bi-briefcase mr-1"></i> Post a Job
                        </Link>
                    </div>
                </div>

                {/* Register/Login OR Profile Button */}
                <div className="flex items-center space-x-4">
                    <button
                        className="md:hidden !no-underline text-white text-xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                    <div className="hidden md:flex space-x-3">
                        {username ? (
                            <Link
                                to="/profile"
                                className="btn"
                                style={{
                                    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                                    color: "white",
                                    borderRadius: "25px",
                                    padding: "8px 20px",
                                    fontWeight: "bold",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                    textDecoration: "none",
                                }}
                            >
                                {username}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-white !text-navbg !no-underline px-3 py-1 rounded hover:bg-gray-100"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="border border-white px-3 py-1 rounded !no-underline text-white hover:bg-white hover:text-blue-600"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-darknavbg py-2 text-center space-y-2">
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-1 !no-underline text-white flex items-center justify-center"
                    >
                        <i className="bi bi-house mr-1"></i> Home
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-1 !no-underline text-white flex items-center justify-center"
                    >
                        <i className="bi bi-info-circle mr-1"></i> About Us
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-1 !no-underline text-white flex items-center justify-center"
                    >
                        <i className="bi bi-envelope mr-1"></i> Contact Us
                    </Link>
                    <Link
                        to="/create"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-1 !no-underline text-white flex items-center justify-center"
                    >
                        <i className="bi bi-briefcase mr-1"></i> Post a Job
                    </Link>
                    <div className="mt-2 space-y-2">
                        {username ? (
                            <Link
                                to="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="block mx-4 py-1 bg-white !text-navbg !no-underline rounded hover:bg-gray-100"
                            >
                                {username}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block mx-4 py-1 bg-white !text-navbg !no-underline rounded hover:bg-gray-100"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block mx-4 py-1 border border-white rounded !no-underline text-white hover:bg-white hover:text-blue-600"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Navbar;
