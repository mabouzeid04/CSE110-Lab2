import logo from './logo.svg';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constant";
import ClickCounter from "./hooksExercise";
import React, { useState, useEffect } from 'react';
import { StickyNotes }  from './stickyNotes';
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar";



const App = () => {
  return (
    <div>
     <Navbar />
     <Routes>
       <Route path="/" element={<StickyNotes />} />
       <Route path="/todolist/:name" element={<ToDoList />} />
     </Routes>
   </div>
  );
 };
 

export default App;
