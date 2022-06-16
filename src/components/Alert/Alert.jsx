import React from "react";

import "./alert.css";

export default function Alert({ error }) {
  return <p className="alert-card">{error}</p>;
}
