import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "./../../contexts/AuthContext";
import LogoutLogic from "./../../containers/Login/LogoutLogic";

function Navbar({ setSearchValue }) {
  const { currentUser, setCurrentStudent } = useAuth();
  const { handleLogout } = LogoutLogic(setCurrentStudent);
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
                Acasă
              </Link>
            </li>
            <li className="nav-item">
              {currentUser && (
                <Link to="/new-post" className="btn" style={{ color: "white" }}>
                  Postare Nouă
                </Link>
              )}
            </li>
            <li className="nav-item">
              {!currentUser && (
                <Link to="/login" className="btn" style={{ color: "white" }}>
                  Autentificare
                </Link>
              )}
              {currentUser && (
                <button onClick={handleLogout} className="btn btn-dark">
                  Deconectare
                </button>
              )}
            </li>
            {/* <li className="nav-item">
              <Link to="/sign-up" className="btn" style={{ color: "white" }}>
                Sign Up
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                to="/student-register"
                className="btn"
                style={{ color: "white" }}
              >
                Inregistrare student
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Caută o postare"
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
