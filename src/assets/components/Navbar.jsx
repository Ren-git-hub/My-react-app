import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

function Navbar({ title }) {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm p-3"
      style={{ background: "linear-gradient(135deg, #ff9a9e, #fad0c4)" }}
    >
      <div className="container">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          {title}
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-semibold" to="/create">
                Post a Job
              </Link>
            </li>
          </ul>

          {/* Profile Button as Link */}
          <div>
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
              <i className="bi bi-person-circle me-2"></i> Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
