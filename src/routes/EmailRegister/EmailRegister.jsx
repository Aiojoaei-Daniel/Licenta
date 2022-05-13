import React from "react";

import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputGroupSelect from "./../../components/common/InputGroupSelect";

function EmailRegister(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: "2000px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Email</h2>
          <form>
            <div className="form-group">
              <label htmlFor="title">Email</label>
              <input
                type="text"
                className="form-control"
                id="title"
                rows="1"
                required
              />
            </div>
            <InputGroupSelect />
            <InputGroupSelect />
            <button type="submit" className="btn btn-primary">
              Save data
            </button>
            <Link to="/" className="btn btn-dark">
              Cancel
            </Link>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EmailRegister;
