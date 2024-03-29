import React from "react";

function InputGroupSelect({
  onChange,
  prevValue,
  values,
  label,
  name,
  defaultValue,
}) {
  return (
    <div className="form-group">
      <label htmlFor="inputGroupSelect01" style={{ marginLeft: "2px" }}>
        {label}
      </label>
      <select
        className="custom-select"
        id="inputGroupSelect01"
        onChange={onChange}
        name={name}
      >
        <option>{prevValue || `Alege ${defaultValue}...`}</option>
        {values.map((value) => (
          <option key={value}>{value}</option>
        ))}
      </select>
    </div>
  );
}

export default InputGroupSelect;
