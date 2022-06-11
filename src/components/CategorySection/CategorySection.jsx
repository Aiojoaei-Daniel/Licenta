import React from "react";

import postsType from "../../utils/postsType";

import "./categorySection.css";

const CategorySection = ({ setSelectedType }) => {
  const { categories } = postsType();

  return (
    <>
      <div className="list-group">
        <ul>
          <li>
            <a href="#">
              Tipuri <i className="fas fa-caret-down"></i>
            </a>
            <div className="dropdown_menu">
              <ul>
                {categories.map((type) => (
                  <li className="dropdown_submenu">
                    <a
                      href="#"
                      onClick={!type[1] ? () => setSelectedType(type[0]) : null}
                    >
                      {type[0]}{" "}
                      <i className={type[1] ? "fas fa-caret-right" : ""}></i>
                      {type[1] &&
                        type[1].map((subtype) => (
                          <div className="submenu">
                            <ul>
                              <li>
                                <a
                                  href="#"
                                  onClick={() => setSelectedType(subtype)}
                                >
                                  {subtype}
                                </a>
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
