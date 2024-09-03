import React, { ChangeEvent, FC } from "react";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input: FC<InputProps> = ({ value, onChange, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    style={{ padding: "10px", margin: "5px", width: "100%" }}
  />
);

export default Input;
