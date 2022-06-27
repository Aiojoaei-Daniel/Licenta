import React from "react";

import notFoundImg from "../../images/not-found.png";
import "./notFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <h1>
        <div className="line"></div>
        Nimic nu corespunde căutării.
      </h1>
      <img className="not-found-img" src={notFoundImg} alt="" />
    </div>
  );
}

export default NotFound;
