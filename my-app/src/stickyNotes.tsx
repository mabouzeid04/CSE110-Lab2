import React, { useState, useEffect } from 'react';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constant";
import ClickCounter from "./hooksExercise";

const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  
  export const StickyNotes = () => {
    const [notes, setNotes] = useState(dummyNotesList); 
    const [createNote, setCreateNote] = useState<Note>(initialNote);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note>(initialNote);
    const deleteNote = (id: number) => {
      setNotes(notes.filter((note) => note.id !== id));
    };
    // favorite note
    const toggleFavorite = (note: Note) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(note.title)) {
          // remove favorite
          return prevFavorites.filter((fav) => fav !== note.title);
        } else {
          // favorite note
          return [...prevFavorites, note.title];
        }
      });
    };
    const createNoteHandler = (e: React.FormEvent) => {
      e.preventDefault();
      if (createNote.title && createNote.content) {
        // Create note
        const newNote = {
          ...createNote,
          id: notes.length + 1, // Node ID
        };
        setNotes([...notes, newNote]);
        setCreateNote(initialNote); 
      }
    };
    
    useEffect(() => {
      console.log("Favorites updated: ", favorites);
    }, [favorites]);
   return (
    <div className='app-container'>
    <form className="note-form" onSubmit={createNoteHandler}>
      <div>
        <input
          placeholder="Note Title"
          onChange={(event) =>
            setCreateNote({ ...createNote, title: event.target.value })
          }
          required
        />
      </div>
  
      <div>
        <textarea
        placeholder="Note Content"
          onChange={(event) =>
            setCreateNote({ ...createNote, content: event.target.value })
          }
          required
        ></textarea>
      </div>
  
      <div>
        <select
          onChange={(event) =>
            setCreateNote({ ...createNote, label: event.target.value as Label })
          }
          required
        >
          <option value={Label.personal}>Personal</option>
          <option value={Label.study}>Study</option>
          <option value={Label.work}>Work</option>
          <option value={Label.other}>Other</option>
        </select>
      </div>
  
      <div><button type="submit">Create Note</button></div>
    </form>
      <ClickCounter />
      <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              <div className="notes-header">
              <button onClick={() => toggleFavorite(note)}>
                {favorites.includes(note.title) ? "❤️" : "♡"}
              </button>
              <button onClick={() => deleteNote(note.id)}>x</button>
              
              </div>
  
              <h2
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  const updatedTitle = e.target.textContent || '';
                  setNotes((prevNotes) =>
                    prevNotes.map((n) =>
                      n.id === note.id ? { ...n, title: updatedTitle } : n
                    )
                  );
                }}
              >
                {note.title}
              </h2>
  
              <p
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  const updatedContent = e.target.textContent || '';
                  setNotes((prevNotes) =>
                    prevNotes.map((n) =>
                      n.id === note.id ? { ...n, content: updatedContent } : n
                    )
                  );
                }}
              >
                {note.content}
              </p>
  
              <select
                value={note.label}
                onChange={(e) => {
                  const updatedLabel = e.target.value as Label;
                  setNotes((prevNotes) =>
                    prevNotes.map((n) =>
                      n.id === note.id ? { ...n, label: updatedLabel } : n
                    )
                  );
                }}
              >
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
  
              
            </div>
          ))}
        </div>
       <div className="favorites-list">
          <h3>Favorite Notes:</h3>
          {favorites.length === 0 ? (
            <p>No favorites yet</p>
          ) : (
            <ul>
              {favorites.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          )}
        </div>
  
     </div>
  
   );
  };