import React, { ChangeEvent, FC } from "react";
import Input from "../atoms/Input";
import Textarea from "../atoms/Textarea";
import Button from "../atoms/Button";

interface NoteFormProps {
  noteText: string;
  deadline: string;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onDeadlineChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const NoteForm: FC<NoteFormProps> = ({
  noteText,
  deadline,
  onTextChange,
  onDeadlineChange,
  onSubmit,
}) => (
  <div>
    <Textarea value={noteText} onChange={onTextChange} />
    <Input type="Date" value={deadline} onChange={onDeadlineChange} />
    <Button label="Add Note" onClick={onSubmit} />
  </div>
);

export default NoteForm;
