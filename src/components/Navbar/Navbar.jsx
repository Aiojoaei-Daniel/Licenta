import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "./../../contexts/AuthContext";
import LogoutLogic from "./../../containers/Login/LogoutLogic";

import "./navbar.css";

function Navbar() {
  const { currentUser, setCurrentStudent } = useAuth();
  const { handleLogout } = LogoutLogic(setCurrentStudent);
  return (
    <nav className="navbar gradient__bg">
      <div className="navbar-btns">
        <Link to="/" className="navbar-btn">
          Acasă
        </Link>
        {currentUser && (
          <Link to="/new-post" className="navbar-btn">
            Postare Nouă
          </Link>
        )}
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
        <div>{/* <img src="" alt="" /> */}</div>
      </div>
      {!currentUser && (
        <Link to="/login" className="navbar-btn">
          Autentificare
        </Link>
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
