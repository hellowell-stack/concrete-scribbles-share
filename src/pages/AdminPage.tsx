
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Trash2, Edit, Search, User, BookOpen, Folder, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Note } from '../components/NoteCard';
import { toast } from '@/components/ui/use-toast';

const AdminPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const navigate = useNavigate();
  
  // For demo purposes, we're using password protection
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const DEMO_PASSWORD = 'admin123'; // In a real app, this would be secured properly
  
  useEffect(() => {
    // Get notes from localStorage
    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    setNotes(storedNotes);
    
    // Extract unique authors
    const uniqueAuthors = Array.from(
      new Set(storedNotes.map((note: Note) => note.author))
    );
    setUsers(uniqueAuthors as string[]);
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Admin access granted",
        description: "Welcome to the admin panel"
      });
    } else {
      toast({
        title: "Access denied",
        description: "Invalid password",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteNote = (id: string) => {
    // In a real app, this would be an API call
    const updatedNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    
    toast({
      title: "Note deleted",
      description: "The note has been permanently removed"
    });
  };
  
  const handleEditNote = (id: string) => {
    navigate(`/notes/${id}`);
  };
  
  const filteredNotes = notes.filter(note => {
    return (
      (searchTerm === '' || 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterSubject === '' || note.subject === filterSubject) &&
      (filterAuthor === '' || note.author === filterAuthor)
    );
  });
  
  // Extract all unique subjects
  const subjects = Array.from(
    new Set(notes.map(note => note.subject).filter(Boolean))
  );
  
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-12">
          <div className="neo-card p-8">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-neo-blue text-white rounded-full">
                <User size={32} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">Admin Access Required</h1>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="neo-input w-full"
                  placeholder="Enter admin password"
                />
                <p className="text-xs mt-1 text-gray-500">
                  For demo purposes, use: admin123
                </p>
              </div>
              
              <button 
                type="submit"
                className="neo-button-blue w-full"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-6">
          <User size={28} className="mr-3 text-neo-blue" />
          Admin Dashboard
        </h1>
        
        <div className="neo-card p-6 mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1">
              <label htmlFor="search" className="block font-bold mb-2 flex items-center">
                <Search size={16} className="mr-1" />
                Search Notes
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neo-input w-full"
                placeholder="Search by title or content..."
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <label htmlFor="filter-subject" className="block font-bold mb-2 flex items-center">
                <Folder size={16} className="mr-1" />
                Filter by Subject
              </label>
              <select
                id="filter-subject"
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="neo-input w-full"
              >
                <option value="">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-1/4">
              <label htmlFor="filter-author" className="block font-bold mb-2 flex items-center">
                <User size={16} className="mr-1" />
                Filter by Author
              </label>
              <select
                id="filter-author"
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
                className="neo-input w-full"
              >
                <option value="">All Authors</option>
                {users.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BookOpen size={20} className="mr-2" />
              Notes Management ({filteredNotes.length})
            </h2>
            
            <table className="w-full neo-border">
              <thead>
                <tr className="bg-gray-100 neo-border border-b-4">
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Author</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <tr key={note.id} className="neo-border border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium">{note.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {note.content.substring(0, 50)}...
                        </div>
                      </td>
                      <td className="p-3">
                        {note.subject || 'Not specified'}
                      </td>
                      <td className="p-3">{note.author}</td>
                      <td className="p-3">
                        {new Date(note.date).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditNote(note.id)}
                            className="p-1 bg-neo-blue text-white"
                            title="Edit Note"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-1 bg-neo-pink text-white"
                            title="Delete Note"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center">
                      No notes found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="neo-card p-6 bg-green-50">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Check size={20} className="mr-2 text-neo-green" />
            Admin Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="neo-border bg-white p-4 hover:bg-gray-50 text-center">
              <div className="font-bold">User Management</div>
              <div className="text-sm mt-1">Manage access and permissions</div>
            </button>
            <button className="neo-border bg-white p-4 hover:bg-gray-50 text-center">
              <div className="font-bold">Site Settings</div>
              <div className="text-sm mt-1">Configure global options</div>
            </button>
            <button className="neo-border bg-white p-4 hover:bg-gray-50 text-center">
              <div className="font-bold">Analytics</div>
              <div className="text-sm mt-1">View site usage and statistics</div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
