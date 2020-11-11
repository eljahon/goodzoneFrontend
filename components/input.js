import React from "react";

const Input = ({
  defaultValue,
  register,
  disabled,
  append,
  name,
  label,
  type,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue || ""}
        name={name}
        type={type || "text"}
        ref={register}
      />
      {append ? <span>{append}</span> : null}
    </>
  );
};

export default Input;
