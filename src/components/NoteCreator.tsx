
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { BookText, BookOpen, GraduationCap, Folder } from 'lucide-react';

const NoteCreator = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const subjectOptions = [
    'Mathematics', 
    'Computer Science', 
    'Literature', 
    'Biology', 
    'Chemistry', 
    'Physics', 
    'History', 
    'Psychology', 
    'Economics', 
    'Art',
    'Other'
  ];

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
    
    if (!title.trim() || !content.trim() || !subject) {
      toast.error('Please fill in all required fields');
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
      subject: subject
    };
    
    // For demo purposes, we'll save to localStorage
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    localStorage.setItem('notes', JSON.stringify([newNote, ...existingNotes]));
    
    toast.success('Note created!');
    navigate('/notes');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <BookOpen size={32} className="text-neo-blue" />
        <h2 className="text-3xl font-bold">Create New Note</h2>
      </div>
      
      <div className="neo-card p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block font-bold mb-2 flex items-center">
                <BookText className="mr-2" size={18} />
                Note Title <span className="text-neo-pink">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="neo-input w-full"
                placeholder="E.g., Lecture Notes: Introduction to Calculus"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block font-bold mb-2 flex items-center">
                <Folder className="mr-2" size={18} />
                Subject <span className="text-neo-pink">*</span>
              </label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="neo-input w-full"
              >
                <option value="">Select a subject</option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block font-bold mb-2">Content <span className="text-neo-pink">*</span></label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="neo-textarea w-full"
              placeholder="Write your lecture notes, key concepts, formulas, etc..."
              rows={10}
            />
          </div>
          
          <div>
            <label className="block font-bold mb-3">Choose a color</label>
            <div className="flex space-x-3">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 neo-border ${color.class} ${selectedColor === color.name ? 'ring-4 ring-black' : ''}`}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/notes')} 
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
      
      <div className="bg-gray-100 p-6 neo-border">
        <h3 className="font-bold text-lg mb-3 flex items-center">
          <GraduationCap className="mr-2" />
          Pro Tips for Great Notes
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use headings to organize different sections of your lecture</li>
          <li>Include key formulas, definitions, and concepts</li>
          <li>Add examples to illustrate difficult concepts</li>
          <li>Highlight important points that might appear on exams</li>
          <li>Share with classmates to get their input and contributions</li>
        </ul>
      </div>
    </div>
  );
};

export default NoteCreator;
