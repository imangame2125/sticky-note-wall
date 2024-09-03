import React, { FC } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{ padding: "10px", margin: "5px", cursor: "pointer" }}
  >
    {label}
  </button>
);

export default Button;
