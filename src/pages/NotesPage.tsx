
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import NoteCard, { Note } from '../components/NoteCard';

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  
  useEffect(() => {
    // Get notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8">Your Notes</h1>
      
      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4">No Notes Yet</h2>
          <p className="mb-6 text-lg">You haven't created any notes yet. Get started by creating your first note!</p>
          <a href="/new-note" className="neo-button-blue">
            Create Your First Note
          </a>
        </div>
      )}
    </Layout>
  );
};

export default NotesPage;
