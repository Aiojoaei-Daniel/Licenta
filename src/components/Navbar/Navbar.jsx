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
    <nav className="navbar gradient__bg" id="navbar">
      <div className="navbar-btns">
        <Link to="/" className="navbar-btn">
          Acasă
        </Link>
        <HashLink smooth to="/#posts-section" className="navbar-btn">
          Postari
        </HashLink>
        {currentUser && (
          <HashLink smooth to="/new-post/#new-post-page" className="navbar-btn">
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
      </div>
      {!currentUser && (
        <HashLink smooth to="/login/#login-page" className="navbar-btn">
          Autentificare
        </HashLink>
      )}
      {currentUser && (
        <a href="#" onClick={handleLogout} className="navbar-btn">
          Deconectare
        </a>
      )}
    </nav>
  );
}

export default Navbar;
