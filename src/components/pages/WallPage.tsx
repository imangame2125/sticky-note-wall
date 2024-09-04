import React, { FC, useState } from "react";
import WallTemplate from "../templates/WallTemplate";
import EditNoteModal from "../organisms/EditNoteModal";

const WallPage: FC = () => {
  const [notes, setNotes] = useState<
    { id: number; text: string; deadline: Date }[]
  >([]);
  const [noteText, setNoteText] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

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

  const startEditNote = (id: number) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setCurrentNoteId(id);
      setNoteText(noteToEdit.text);
      setDeadline(noteToEdit.deadline.toISOString().slice(0, 16));
      setIsEditing(true);
    }
  };

  const saveEditNote = () => {
    if (currentNoteId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === currentNoteId
            ? { ...note, text: noteText, deadline: new Date(deadline) }
            : note
        )
      );
      setIsEditing(false);
      setCurrentNoteId(null);
      setNoteText("");
      setDeadline("");
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
    <div>
      <WallTemplate
        notes={notes}
        noteText={noteText}
        deadline={deadline}
        onTextChange={(e) => setNoteText(e.target.value)}
        onDeadlineChange={(e) => setDeadline(e.target.value)}
        onSubmit={addNote}
        onEdit={startEditNote}
        onDelete={deleteNote}
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
      {isEditing && (
        <EditNoteModal
          noteText={noteText}
          deadline={deadline}
          onTextChange={(e) => setNoteText(e.target.value)}
          onDeadlineChange={(e) => setDeadline(e.target.value)}
          onSave={saveEditNote}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default WallPage;
