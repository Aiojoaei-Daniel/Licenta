import React from "react";

import notFoundImg from "../../images/not-found.png";
import "./notFound.css";

function NotFound({ type }) {
  return (
    <div>
      {type === "postare" ? (
        <div className="not-found-posts">
          <h1>
            <div className="line"></div>
            Nu a fost gasită nicio postare.
          </h1>
          <img className="not-found-img" src={notFoundImg} alt="" />
        </div>
      ) : (
        <div className="not-found">
          <h1>
            <div className="line"></div>
            Nu a fost gasit.
          </h1>
          <img className="not-found-img" src={notFoundImg} alt="" />
        </div>
      )}
    </div>
  );
}

export default NotFound;
