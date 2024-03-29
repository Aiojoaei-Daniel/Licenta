import React from "react";
import { createRoot } from "react-dom/client";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import App from "./App";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
