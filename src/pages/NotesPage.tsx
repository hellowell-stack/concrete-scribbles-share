
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import NoteCard, { Note } from '../components/NoteCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Folder, PencilLine } from 'lucide-react';

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    // Get notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
    
    // Extract unique subjects
    const uniqueSubjects = Array.from(
      new Set(storedNotes.map((note: Note) => note.subject).filter(Boolean))
    ) as string[];
    
    setSubjects(uniqueSubjects);
  }, []);

  const filteredNotes = activeTab === 'all' 
    ? notes 
    : notes.filter(note => note.subject === activeTab);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold flex items-center">
          <BookOpen size={36} className="mr-3 text-neo-blue" />
          My Notes
        </h1>
        <Link to="/new-note" className="neo-button-blue flex items-center">
          <PencilLine size={18} className="mr-2" />
          New Note
        </Link>
      </div>
      
      {notes.length > 0 ? (
        <>
          <Tabs defaultValue="all" className="mb-8">
            <div className="border-b-2 border-black mb-4">
              <TabsList className="bg-transparent h-auto p-0 gap-2">
                <TabsTrigger 
                  value="all" 
                  className="neo-border data-[state=active]:bg-neo-blue data-[state=active]:text-white py-2 px-4"
                  onClick={() => setActiveTab('all')}
                >
                  All Notes
                </TabsTrigger>
                {subjects.map(subject => (
                  <TabsTrigger 
                    key={subject} 
                    value={subject}
                    className="neo-border data-[state=active]:bg-neo-pink data-[state=active]:text-white py-2 px-4"
                    onClick={() => setActiveTab(subject)}
                  >
                    {subject}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            </TabsContent>
            
            {subjects.map(subject => (
              <TabsContent key={subject} value={subject} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes
                    .filter(note => note.subject === subject)
                    .map((note) => (
                      <NoteCard key={note.id} note={note} />
                    ))
                  }
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </>
      ) : (
        <div className="text-center py-16 neo-card bg-white">
          <div className="flex justify-center mb-4">
            <Folder size={64} className="text-neo-blue" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No Notes Yet</h2>
          <p className="mb-6 text-lg">You haven't created any notes yet. Get started by creating your first set of lecture notes!</p>
          <Link to="/new-note" className="neo-button-blue inline-flex items-center">
            <PencilLine size={18} className="mr-2" />
            Create Your First Note
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default NotesPage;
