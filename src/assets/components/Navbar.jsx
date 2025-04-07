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
        <nav
            className="shadow-sm"
            style={{ background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" }}
        >
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo & Main Links */}
                <div className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className="font-bold text-lg text-[#2575fc] !no-underline"
                    >
                        {title}
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link
                            to="/"
                            className="text-[#2575fc] flex items-center !no-underline hover:text-blue-700"
                        >
                            <i className="bi bi-house mr-1"></i> Home
                        </Link>
                        <Link
                            to="/about"
                            className="text-[#2575fc] flex items-center !no-underline hover:text-blue-700"
                        >
                            <i className="bi bi-info-circle mr-1"></i> About Us
                        </Link>
                        <Link
                            to="/contact"
                            className="text-[#2575fc] flex items-center !no-underline hover:text-blue-700"
                        >
                            <i className="bi bi-envelope mr-1"></i> Contact Us
                        </Link>
                        <Link
                            to="/create"
                            className="text-[#2575fc] flex items-center !no-underline hover:text-blue-700"
                        >
                            <i className="bi bi-briefcase mr-1"></i> Post a Job
                        </Link>
                    </div>
                </div>

                {/* Register/Login OR Profile Button */}
                <div className="flex items-center space-x-4">
                    <button
                        className="md:hidden text-[#2575fc] text-2xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                    <div className="hidden md:flex space-x-3">
                        {username ? (
                            <Link
                                to="/profile"
                                className="text-white rounded-full px-5 py-2 font-bold shadow-sm !no-underline"
                                style={{
                                    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                                }}
                            >
                                {username}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="bg-white text-[#2575fc] px-4 py-2 rounded-full shadow-sm font-semibold !no-underline hover:bg-gray-100"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="block bg-white text-[#2575fc] rounded-full px-4 py-2 shadow-sm font-semibold !no-underline hover:bg-gray-100"
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
                <div className="md:hidden bg-[#ebedee] py-3 text-center space-y-3 shadow-inner">
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-[#2575fc] py-2 flex items-center justify-center !no-underline"
                    >
                        <i className="bi bi-house mr-1"></i> Home
                    </Link>
                    <Link
                        to="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-[#2575fc] py-2 flex items-center justify-center !no-underline"
                    >
                        <i className="bi bi-info-circle mr-1"></i> About Us
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-[#2575fc] py-2 flex items-center justify-center !no-underline"
                    >
                        <i className="bi bi-envelope mr-1"></i> Contact Us
                    </Link>
                    <Link
                        to="/create"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-[#2575fc] py-2 flex items-center justify-center !no-underline"
                    >
                        <i className="bi bi-briefcase mr-1"></i> Post a Job
                    </Link>
                    <div className="mt-3 space-y-2 px-6">
                        {username ? (
                            <Link
                                to="/profile"
                                onClick={() => setIsMenuOpen(false)}
                                className="block bg-white text-[#2575fc] rounded-full px-4 py-2 shadow-sm font-semibold !no-underline hover:bg-gray-100"
                            >
                                {username}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block bg-white text-[#2575fc] rounded-full px-4 py-2 shadow-sm font-semibold !no-underline hover:bg-gray-100"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block bg-white text-[#2575fc] rounded-full px-4 py-2 shadow-sm font-semibold !no-underline hover:bg-gray-100"
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
