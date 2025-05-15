
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import NoteCard, { Note } from './NoteCard';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Note[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // In a real app, this would search in a database
    // For demo, we'll search in localStorage
    const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    
    // Also include our explore notes for better demo
    const exploreNotes = [
      {
        id: 'e1',
        title: 'Design Inspiration',
        content: 'Neo-brutalism design is all about bold colors, raw elements, and playful aesthetics.',
        color: 'blue',
        author: 'Sarah Designer',
        date: '2025-05-12',
        comments: 8,
        shares: 12,
      },
      {
        id: 'e2',
        title: 'Coding Tips',
        content: 'Always comment your code! Future you will thank present you.',
        color: 'pink',
        author: 'Dev Master',
        date: '2025-05-10',
        comments: 5,
        shares: 9,
      },
    ];
    
    const allAvailableNotes = [...allNotes, ...exploreNotes];
    
    const results = allAvailableNotes.filter((note: Note) => 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Search Notes</h2>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex w-full max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for notes..."
            className="neo-input flex-grow"
          />
          <button 
            type="submit"
            className="neo-button-blue ml-2"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      
      {hasSearched && (
        <div>
          <h3 className="text-xl font-bold mb-4">
            {searchResults.length === 0 
              ? 'No results found' 
              : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'}`}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      
      {!hasSearched && (
        <div className="text-center py-10 text-gray-500">
          <Search size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-xl font-medium">Search for notes by title or content</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
