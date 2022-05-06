import React from "react";

import PostTypes from "./PostTypes";

function InputGroupSelect({ onChange, prevValue }) {
  const { typesForInputGroupSelect } = PostTypes();

  return (
    <div className="form-group">
      <label htmlFor="inputGroupSelect01" style={{ marginLeft: "2px" }}>
        Type
      </label>
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={onChange}
      >
        <option>{prevValue || "Choose..."}</option>
        {typesForInputGroupSelect.map((type) => (
          <option key={type}>{type}</option>
        ))}
      </select>
    </div>
  );
}

export default InputGroupSelect;
