import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "./../../contexts/AuthContext";
import LogoutLogic from "./../../routes/Login/LogoutLogic";

function Navbar({ setSearchValue }) {
  const { currentUser, currentStudent, setCurrentStudent } = useAuth();
  const { handleLogout, handleStudentLogout } = LogoutLogic(setCurrentStudent);
  console.log("Navbar", currentStudent);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{ marginBottom: "20px" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link to="/" className="btn" style={{ color: "white" }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              {currentUser && (
                <Link to="/new-post" className="btn" style={{ color: "white" }}>
                  New Post
                </Link>
              )}
            </li>
            <li className="nav-item">
              {!currentUser && (
                <Link to="/login" className="btn" style={{ color: "white" }}>
                  Login
                </Link>
              )}
              {currentUser && (
                <button onClick={handleLogout} className="btn btn-dark">
                  Logout
                </button>
              )}
            </li>
            {/* <li className="nav-item">
              <Link to="/sign-up" className="btn" style={{ color: "white" }}>
                Sign Up
              </Link>
            </li> */}
            <li className="nav-item">
              {Object.keys(currentStudent).length === 0 && (
                <Link
                  to="/student-login"
                  className="btn"
                  style={{ color: "white" }}
                >
                  Student Login
                </Link>
              )}
            </li>
            <li>
              {Object.keys(currentStudent).length !== 0 && (
                <button onClick={handleStudentLogout} className="btn btn-dark">
                  Student Logout
                </button>
              )}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
