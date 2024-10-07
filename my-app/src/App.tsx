import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constant";
import ClickCounter from "./hooksExercise";
import React, { useState, useEffect } from 'react';

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Function to toggle a note as favorite
  const toggleFavorite = (note: Note) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(note.title)) {
        // If the note is already a favorite, remove it
        return prevFavorites.filter((fav) => fav !== note.title);
      } else {
        // Otherwise, add it to the favorites list
        return [...prevFavorites, note.title];
      }
    });
  };

  // Use effect to observe state changes (for debugging purposes)
  useEffect(() => {
    console.log("Favorites updated: ", favorites);
  }, [favorites]);
 return (
   <div className='app-container'>
    <form className="note-form">
       <div><input placeholder="Note Title"></input></div>

       <div><textarea></textarea></div>

       <div><button type="submit">Create Note</button></div>
    </form>
    <ClickCounter />
    <div className="notes-grid">
       {dummyNotesList.map((note) => (
         <div
           key={note.id}
           className="note-item">
           <div className="notes-header">
             <button>x</button>
           </div>
           <h2> {note.title} </h2>
           <p> {note.content} </p>
           <p> {note.label} </p>
           <button onClick={() => toggleFavorite(note)}>
              {favorites.includes(note.title) ? "Unfavorite" : "Favorite"}
            </button>
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
}

export default App;
