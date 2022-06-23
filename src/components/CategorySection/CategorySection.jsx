import React from "react";

import postsType from "../../utils/postsType";

import "./categorySection.css";

const CategorySection = ({ setSelectedType }) => {
  const { categories } = postsType();

  return (
    <>
      <div className="list-group">
        <ul>
          <li key="key1">
            <a key="key1">
              Tipuri <i className="fas fa-caret-down"></i>
            </a>
            <div className="dropdown_menu">
              <ul>
                {categories.map((type, index) => (
                  <li className="dropdown_submenu" key={index + type[0]}>
                    <a
                      href="/#posts-section"
                      onClick={!type[1] ? () => setSelectedType(type[0]) : null}
                    >
                      {type[0]}{" "}
                      <i className={type[1] ? "fas fa-caret-right" : ""}></i>
                      {type[1] &&
                        type[1].map((subtype, index) => (
                          <div className="submenu" key={subtype + index}>
                            <ul>
                              <li>
                                <p
                                  href="/#posts-section"
                                  onClick={() => setSelectedType(subtype)}
                                >
                                  {subtype}
                                </p>
                              </li>
                            </ul>
                          </div>
                        ))}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

CategorySection.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default CategorySection;
