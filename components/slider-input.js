import React from "react";
// import { separateNumber } from "../libs/numberToPrice";

const sliderDisabledStyle = {};

const SliderInput = ({
  defaultValue,
  textInputValue,
  register,
  append,
  name,
  label,
  type,
}) => {
  return (
    <div className="input_wrapper--rassrochka input_wrapper--slider">
      <label htmlFor={name}>{label}</label>
      <input
        defaultValue={defaultValue}
        value={textInputValue}
        onChange={() => console.log("")}
        name={name}
        type={type || "text"}
        ref={register}
      />
      {append ? <span>{append}</span> : null}
      <input
        ref={register}
        name={name}
        defaultValue={defaultValue}
        className="slider"
        type="range"
        min="3"
        step="3"
        max="12"
      />
    </div>
  );
};

export default SliderInput;
