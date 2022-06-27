import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { useAuth } from "./../../contexts/AuthContext";
import LogoutLogic from "./../../containers/Login/LogoutLogic";

import "./navbar.css";

function Navbar() {
  const { currentUser, setCurrentStudent } = useAuth();
  const { handleLogout } = LogoutLogic(setCurrentStudent);

  return (
    <nav className="navbar" id="navbar">
      <div className="hamburger-menu">
        <div className="hamburger"></div>
        <div className="hamburger"></div>
        <div className="hamburger"></div>

        <div className="navbar-btns">
          <Link to="/" className="navbar-btn">
            Acasă
          </Link>
          <HashLink smooth to="/#posts-section" className="navbar-btn">
            Postări
          </HashLink>
          {currentUser && (
            <HashLink
              smooth
              to="/new-post/#new-post-page"
              className="navbar-btn"
            >
              Postare Nouă
            </HashLink>
          )}
          <HashLink to="/about/#about-section" className="navbar-btn">
            Despre noi
          </HashLink>
          {/* {!currentUser && (
          <Link to="/login" className="navbar-btn" style={{ color: "white" }}>
          Autentificare
          </Link>
          )}
          {currentUser && (
            <a href="#" onClick={handleLogout} className="navbar-btn">
            Deconectare
            </a>
          )} */}
          {!currentUser && (
            <HashLink
              smooth
              to="/login/#login-page"
              className="navbar-btn login"
            >
              Conectare Admin
            </HashLink>
          )}
          {currentUser && (
            <a
              href="#"
              onClick={handleLogout}
              className="navbar-btn logout"
              style={{ marginLeft: "auto" }}
            >
              Deconectare
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
