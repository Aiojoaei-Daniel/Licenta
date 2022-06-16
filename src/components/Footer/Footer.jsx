import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import upIcon from "../../images/posts/upIcon.svg";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-col">
      <a href="#navbar">
        <img src={upIcon} alt="" />
      </a>
      <div className="body-footer">
        <p>Fii mereu la curent cu postările care te interesează!</p>
        <HashLink smooth to="/student-register/#student-form">
          Apasă aici pentru înregistrare!
        </HashLink>
      </div>
      <div className="college-data">
        <p>Date despre facultate</p>
      </div>
    </footer>
  );
}
