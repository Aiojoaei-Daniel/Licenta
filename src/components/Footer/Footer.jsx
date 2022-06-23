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
        <p className="big-size-text">
          Fii mereu la curent cu postările care te interesează!
        </p>
        <HashLink
          smooth
          to="/student-register/#student-form"
          className="big-size-text"
        >
          Apasă aici pentru înregistrare!
        </HashLink>
        <HashLink
          smooth
          to="/student-register/#student-form"
          className="small-screen-text"
        >
          Înregistrare-te aici.
        </HashLink>
      </div>
      <div className="college-data">
        <a
          className="big-size-text"
          href="https://www.tuiasi.ro/"
          target="_blank"
        >
          Universitatea Tehnică "Gheorghe Asachi".
        </a>
        <a
          className="big-size-text"
          href="https://goo.gl/maps/ZLDsAoRpcZ95m2bn9"
          target="_blank"
        >
          Apasă aici pentru a afla locația.
        </a>
        <a
          className="small-screen-text"
          href="https://www.tuiasi.ro/"
          target="_blank"
        >
          Pagina universității.
        </a>
        <a
          className="small-screen-text"
          href="https://goo.gl/maps/ZLDsAoRpcZ95m2bn9"
          target="_blank"
        >
          Locația universității
        </a>
      </div>
    </footer>
  );
}
