import React, { createContext, useState, useContext, useEffect } from "react";
import service from '../services/notes';
const NoteContext = createContext();

export default function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
      selectAll();
  },[])
  const selectAll = () => {
    service.all()
    .then(result => setNotes(result))
    .catch(e => {
      console.error(e);
    });
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, selectAll }}>
      {children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NoteContext);
  if (!context) throw new Error("NoteContext must be used within a NoteProvider");
  const { notes, setNotes, selectAll } = context;
  return { notes, setNotes, selectAll };
}