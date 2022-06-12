import React from "react";
import { Link } from "react-router-dom";

import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-col">
      <p>Fii mereu la curent cu postările care te interesează!</p>
      <Link to="/student-register" className="navbar-btn">
        Apasă aici pentru înregistrare!
      </Link>
    </footer>
  );
}
