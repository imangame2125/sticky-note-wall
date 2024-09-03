import React, { FC, useState } from "react";
import WallTemplate from "../templates/WallTemplate";

const WallPage: FC = () => {
  const [notes, setNotes] = useState<
    { id: number; text: string; deadline: Date }[]
  >([]);
  const [noteText, setNoteText] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const addNote = () => {
    if (noteText && deadline) {
      const newNote = {
        id: Date.now(),
        text: noteText,
        deadline: new Date(deadline),
      };
      setNotes([...notes, newNote]);
      setNoteText("");
      setDeadline("");
    }
  };

  const editNote = (id: number) => {
    const updatedText = prompt("Edit note:");
    const updatedDeadline = prompt("Edit deadline (yyyy-mm-ddThh:mm):");
    if (updatedText && updatedDeadline) {
      setNotes(
        notes.map((note) =>
          note.id === id
            ? {
                ...note,
                text: updatedText,
                deadline: new Date(updatedDeadline),
              }
            : note
        )
      );
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("noteId", id.toString());
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    const draggedNoteId = parseInt(e.dataTransfer.getData("noteId"), 10);
    if (draggedNoteId === id) return;

    const draggedNote = notes.find((note) => note.id === draggedNoteId);
    const droppedNote = notes.find((note) => note.id === id);

    if (draggedNote && droppedNote) {
      const updatedNotes = notes.map((note) => {
        if (note.id === draggedNoteId) return { ...note, id: droppedNote.id };
        if (note.id === droppedNote.id) return { ...note, id: draggedNote.id };
        return note;
      });

      setNotes(updatedNotes);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <WallTemplate
      notes={notes}
      noteText={noteText}
      deadline={deadline}
      onTextChange={(e) => setNoteText(e.target.value)}
      onDeadlineChange={(e) => setDeadline(e.target.value)}
      onSubmit={addNote}
      onEdit={editNote}
      onDelete={deleteNote}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    />
  );
};

export default WallPage;
