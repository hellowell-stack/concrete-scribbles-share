
import React from 'react';
import { User, Settings, BookOpen } from 'lucide-react';
import NoteCard, { Note } from './NoteCard';

const ProfilePage = () => {
  // In a real app, this would use authentication
  const username = "Neo User";
  
  // Get user notes from localStorage
  const userNotes = JSON.parse(localStorage.getItem('notes') || '[]');
  
  return (
    <div>
      <div className="mb-10 text-center">
        <div className="inline-block bg-neo-blue text-white neo-border p-6 rounded-full mb-4">
          <User size={64} />
        </div>
        <h1 className="text-3xl font-bold">{username}</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/4">
          <div className="neo-card p-4">
            <h3 className="font-bold text-xl mb-4 flex items-center">
              <BookOpen size={20} className="mr-2" />
              Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Notes:</span>
                <span className="font-bold">{userNotes.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Comments:</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Shares:</span>
                <span className="font-bold">0</span>
              </div>
            </div>
          </div>
          
          <button className="neo-button w-full mt-4 flex items-center justify-center">
            <Settings size={18} className="mr-2" />
            <span>Account Settings</span>
          </button>
        </div>
        
        <div className="md:w-3/4">
          <h2 className="text-2xl font-bold mb-6">Your Notes</h2>
          
          {userNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userNotes.map((note: Note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="neo-card p-8 text-center">
              <p className="text-xl font-medium mb-4">You haven't created any notes yet.</p>
              <a href="/new-note" className="neo-button-blue inline-block">
                Create Your First Note
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
