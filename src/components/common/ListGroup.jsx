import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Form, Button, Card, Dropdown, DropdownButton } from "react-bootstrap";

import PostTypes from "./PostTypes";

const ListGroup = ({ setSelectedType }) => {
  const { types: items } = PostTypes();

  const handleType = (value) => {
    setSelectedType(value);
  };

  useEffect(() => {}, []);

  return (
    <Card>
      <Card.Body>
        {items.map((item) => (
          <div className="dropdown" key={item[0]}>
            <a
              className={
                item[1]
                  ? "btn btn-info dropdown-toggle btn-block"
                  : "btn btn-info btn-block"
              }
              style={{ margin: "5px" }}
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle={item[1] ? "dropdown" : ""}
              aria-expanded="true"
              // value={item[0]}
              onClick={!item[1] ? () => handleType(item[0]) : null}
            >
              {item[0]}
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{
                overflow: "scroll",
                height: "110px",
                overflowX: "hidden",
              }}
            >
              {item[1] &&
                item[1].map((groupNumber) => (
                  <li key={groupNumber}>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleType(groupNumber)}
                    >
                      {groupNumber}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
