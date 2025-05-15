
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import NoteCard, { Note } from '../components/NoteCard';
import { BookOpen, GraduationCap, Folder, PencilLine } from 'lucide-react';

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  
  // Sample featured notes for college subjects
  const featuredNotes: Note[] = [
    {
      id: 'f1',
      title: 'Introduction to Psychology',
      content: 'Key concepts from the first lecture: Freud's psychoanalytic theory, behavioral psychology, and cognitive approaches to understanding human behavior.',
      color: 'blue',
      author: 'Prof. Smith',
      date: '2025-05-15',
      comments: 3,
      shares: 7,
    },
    {
      id: 'f2',
      title: 'Calculus II: Integration Techniques',
      content: 'Methods for solving complex integrals: substitution, integration by parts, partial fractions, and trigonometric substitution with example problems.',
      color: 'pink',
      author: 'Math Department',
      date: '2025-05-14',
      comments: 5,
      shares: 12,
    },
    {
      id: 'f3',
      title: 'Modern Literature Analysis',
      content: 'Examination of post-modern narrative techniques in contemporary fiction. Focus on unreliable narrators and non-linear storytelling.',
      color: 'yellow',
      author: 'Prof. Johnson',
      date: '2025-05-13',
      comments: 8,
      shares: 4,
    },
  ];
  
  useEffect(() => {
    // Get notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
  }, []);

  return (
    <Layout>
      {/* Hero Section with college theme */}
      <section className="py-10 md:py-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <GraduationCap size={64} className="text-neo-blue" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-neo-pink rounded-full animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          College<span className="text-neo-blue">Notes</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Create, organize, and share your academic notes. Perfect for study groups, exam prep, and collaborative learning.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/new-note" className="neo-button-blue text-lg py-3 px-6 flex items-center">
            <PencilLine className="mr-2" />
            Create Notes
          </Link>
          <Link to="/explore" className="neo-button text-lg py-3 px-6 flex items-center">
            <Folder className="mr-2" />
            Browse Notes
          </Link>
        </div>
      </section>
      
      {/* Subject Categories */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Popular Subjects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Mathematics', 'Literature', 'Computer Science', 'Biology', 'History', 'Physics', 'Psychology', 'Economics'].map((subject) => (
            <div key={subject} className="neo-border p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer text-center">
              <span className="font-bold">{subject}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Notes Section */}
      <section className="py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold flex items-center">
            <BookOpen className="mr-3" />
            Latest Notes
          </h2>
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
      <section className="py-14 my-10 bg-neo-black text-white neo-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-neo-yellow -rotate-45 transform translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-neo-blue rotate-12 transform -translate-x-6 translate-y-6"></div>
        <div className="text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to ace your exams?</h2>
          <p className="text-xl mb-6">Join students who boost their grades with collaborative notes</p>
          <Link to="/new-note" className="neo-button-yellow text-neo-black text-lg py-3 px-8 inline-flex items-center">
            <PencilLine className="mr-2" />
            Start Taking Notes
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
