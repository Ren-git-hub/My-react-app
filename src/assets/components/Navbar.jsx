import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" to="/">
            Husband 4 Hire
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Create Job Post
                </Link>
              </li>
            </ul>

            <form className="d-flex" role="profile">
              <button
                className="btn btn-outline-primary d-flex align-items-center"
                type="button"
              >
                <i className="bi bi-person"></i>
                Profile
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
