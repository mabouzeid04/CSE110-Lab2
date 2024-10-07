import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constant";

function App() {
 return (
   <div className='app-container'>
    <form className="note-form">
       <div><input placeholder="Note Title"></input></div>

       <div><textarea></textarea></div>

       <div><button type="submit">Create Note</button></div>
    </form>
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
         </div>
       ))}
     </div>

   </div>

 );
}

export default App;
