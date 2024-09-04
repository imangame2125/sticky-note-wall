import React, { FC, useState, MouseEvent } from "react";
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
}) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragStartX(e.clientX - position.left);
    setDragStartY(e.clientY - position.top);
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      top: e.clientY - dragStartY,
      left: e.clientX - dragStartX,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        padding: "10px",
        width: "10%",
        cursor: isDragging ? "grabbing" : "grab",
        borderRadius: "20px",
        margin: "10px",
        backgroundColor: deadline < new Date() ? "red" : "yellow",
        border: "1px solid black",
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onDragStart={(e) => onDragStart(e, id)}
      onDrop={(e) => onDrop(e, id)}
      onDragOver={onDragOver}
    >
      <p>{text}</p>
      <p>Deadline: {deadline.toLocaleString()}</p>
      <Button label="Edit" onClick={() => onEdit(id)} />
      <Button label="Delete" onClick={() => onDelete(id)} />
    </div>
  );
};

export default Note;
