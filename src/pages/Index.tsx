
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import NoteCard, { Note } from '../components/NoteCard';

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  
  // Sample featured notes for when no user notes exist
  const featuredNotes: Note[] = [
    {
      id: 'f1',
      title: 'Welcome to Neo Notes!',
      content: 'Start creating your own notes with our neo-brutalist style app. Share ideas, collaborate, and organize your thoughts in one place.',
      color: 'blue',
      author: 'Neo Notes Team',
      date: '2025-05-15',
      comments: 0,
      shares: 0,
    },
    {
      id: 'f2',
      title: 'Getting Started',
      content: 'Click on the "New" button in the navigation bar to create your first note. Choose a color, add a title, and start writing!',
      color: 'pink',
      author: 'Neo Notes Team',
      date: '2025-05-15',
      comments: 0,
      shares: 0,
    },
    {
      id: 'f3',
      title: 'Explore Feature',
      content: 'Check out the Explore section to discover notes shared by others. Filter by color to find exactly what you\'re looking for.',
      color: 'yellow',
      author: 'Neo Notes Team',
      date: '2025-05-15',
      comments: 0,
      shares: 0,
    },
  ];
  
  useEffect(() => {
    // Get notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-10 md:py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Neo<span className="text-neo-blue">Notes</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          A brutalist-inspired notes app for sharing ideas, thoughts, and creative content. Bold, colorful, and straight to the point.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/new-note" className="neo-button-blue text-lg py-3 px-6">
            Create a Note
          </Link>
          <Link to="/explore" className="neo-button text-lg py-3 px-6">
            Explore Notes
          </Link>
        </div>
      </section>
      
      {/* Notes Section */}
      <section className="py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Notes</h2>
          {notes.length > 0 && (
            <Link to="/notes" className="neo-button">
              View All
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.length > 0 ? (
            notes.slice(0, 6).map((note) => (
              <NoteCard key={note.id} note={note} />
            ))
          ) : (
            featuredNotes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-14 my-10 bg-neo-black text-white neo-border">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-6">Join the neo-brutalist revolution of note-taking</p>
          <Link to="/new-note" className="neo-button-yellow text-neo-black text-lg py-3 px-8">
            Start Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
