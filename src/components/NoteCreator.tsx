
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const NoteCreator = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const navigate = useNavigate();

  const colorOptions = [
    { name: 'blue', class: 'bg-neo-blue' },
    { name: 'pink', class: 'bg-neo-pink' },
    { name: 'green', class: 'bg-neo-green' },
    { name: 'yellow', class: 'bg-neo-yellow' },
    { name: 'purple', class: 'bg-neo-purple' },
    { name: 'orange', class: 'bg-neo-orange' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // In a real app, this would save to a database
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      color: selectedColor,
      author: 'You',
      date: new Date().toISOString(),
      comments: 0,
      shares: 0,
    };
    
    // For demo purposes, we'll save to localStorage
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    localStorage.setItem('notes', JSON.stringify([newNote, ...existingNotes]));
    
    toast.success('Note created!');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create New Note</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-bold mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="neo-input w-full"
            placeholder="Enter a title..."
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block font-bold mb-1">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="neo-textarea w-full"
            placeholder="Write your note..."
            rows={6}
          />
        </div>
        
        <div>
          <label className="block font-bold mb-2">Choose a color</label>
          <div className="flex space-x-3">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 neo-border ${color.class} ${selectedColor === color.name ? 'ring-4 ring-black' : ''}`}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="neo-button mr-3"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="neo-button-blue"
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteCreator;
