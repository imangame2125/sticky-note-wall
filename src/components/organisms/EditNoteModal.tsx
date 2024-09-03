import React, { ChangeEvent, FC } from "react";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
import Button from "../atoms/Button";

interface EditNoteModalProps {
  noteText: string;
  deadline: string;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onDeadlineChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditNoteModal: FC<EditNoteModalProps> = ({
  noteText,
  deadline,
  onTextChange,
  onDeadlineChange,
  onSave,
  onCancel,
}) => (
  <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "20px",
      border: "1px solid black",
      zIndex: 1000,
    }}
  >
    <h2>Edit Note</h2>
    <Textarea value={noteText} onChange={onTextChange} />
    <Input type="datetime-local" value={deadline} onChange={onDeadlineChange} />
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      <Button label="Save" onClick={onSave} />
      <Button label="Cancel" onClick={onCancel} />
    </div>
  </div>
);

export default EditNoteModal;
