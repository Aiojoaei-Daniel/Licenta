import React from "react";
import _ from "lodash";

import postsType from "../../utils/postsType";

const CategorySection = ({ setSelectedType }) => {
  const { categories } = postsType();

  const handleType = (value) => {
    setSelectedType(value);
  };

  return (
    <div>
      {categories.map((item) => (
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
    </div>
  );
};

CategorySection.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default CategorySection;
