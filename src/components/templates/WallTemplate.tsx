import React, { ChangeEvent, FC } from "react";
import NoteForm from "../molecules/NoteForm";
import Note from "../molecules/Note";

interface WallTemplateProps {
  notes: { id: number; text: string; deadline: Date }[];
  noteText: string;
  deadline: string;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onDeadlineChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const WallTemplate: FC<WallTemplateProps> = ({
  notes,
  noteText,
  deadline,
  onTextChange,
  onDeadlineChange,
  onSubmit,
  onEdit,
  onDelete,
  onDragStart,
  onDrop,
  onDragOver,
}) => (
  <div>
    <NoteForm
      noteText={noteText}
      deadline={deadline}
      onTextChange={onTextChange}
      onDeadlineChange={onDeadlineChange}
      onSubmit={onSubmit}
    />
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          {...note}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      ))}
    </div>
  </div>
);

export default WallTemplate;
