import React, { ChangeEvent, FC } from "react";

interface TextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: FC<TextareaProps> = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={onChange}
    style={{ padding: "10px", margin: "5px", width: "100%", height: "80px" }}
  />
);

export default Textarea;
