import React, { FC } from "react";
import Button from "../atoms/Button";

interface NoteProps {
  id: number;
  text: string;
  deadline: Date;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Note: FC<NoteProps> = ({
  id,
  text,
  deadline,
  onEdit,
  onDelete,
  onDragStart,
  onDrop,
  onDragOver,
}) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, id)}
    onDrop={(e) => onDrop(e, id)}
    onDragOver={onDragOver}
    style={{
      padding: "10px",
      margin: "10px",
      backgroundColor: deadline < new Date() ? "red" : "yellow",
      border: "1px solid black",
    }}
  >
    <p>{text}</p>
    <p>Deadline: {deadline.toLocaleString()}</p>
    <Button label="Edit" onClick={() => onEdit(id)} />
    <Button label="Delete" onClick={() => onDelete(id)} />
  </div>
);

export default Note;
