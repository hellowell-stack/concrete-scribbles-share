
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, MessageSquare, Trash2, Copy, BookText, GraduationCap, Folder } from 'lucide-react';
import { toast } from 'sonner';
import { Note } from './NoteCard';

const getCardColorClass = (color: string) => {
  const colorMap: { [key: string]: string } = {
    blue: 'bg-neo-blue text-white',
    pink: 'bg-neo-pink text-white',
    green: 'bg-neo-green text-white',
    yellow: 'bg-neo-yellow',
    purple: 'bg-neo-purple text-white',
    orange: 'bg-neo-orange text-white',
  };
  return colorMap[color] || 'bg-white';
};

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  
  // In a real app, this would fetch from a database
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  const note = notes.find((n: Note) => n.id === id);

  if (!note) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Note not found</h2>
        <button 
          onClick={() => navigate('/notes')}
          className="neo-button"
        >
          Back to Notes
        </button>
      </div>
    );
  }

  const colorClass = getCardColorClass(note.color);
  const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard! Share with your study group.');
  };

  const handleDelete = () => {
    const updatedNotes = notes.filter((n: Note) => n.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.success('Note deleted!');
    navigate('/notes');
  };

  const handleDuplicate = () => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      title: `${note.title} (Copy)`,
      date: new Date().toISOString(),
    };
    
    localStorage.setItem('notes', JSON.stringify([newNote, ...notes]));
    toast.success('Note duplicated!');
    navigate(`/notes/${newNote.id}`);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    toast.success('Comment added! Your classmates will see it soon.');
    setComment('');
  };

  const renderContentWithFormatting = (content: string) => {
    // Very basic formatting - in a real app you'd use a proper Markdown renderer
    const paragraphs = content.split('\n\n');
    return paragraphs.map((paragraph, i) => (
      <p key={i} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`neo-card ${colorClass} p-8 mb-8 relative`}>
        {note.subject && (
          <div className="inline-block bg-white text-black py-1 px-3 neo-border text-sm font-bold absolute right-8 top-8">
            <div className="flex items-center">
              <Folder size={16} className="mr-1" />
              {note.subject}
            </div>
          </div>
        )}
        
        <div className="flex items-start mb-4">
          <BookText size={32} className="mr-3 flex-shrink-0" />
          <h1 className="text-4xl font-bold">{note.title}</h1>
        </div>
        
        <div className="mb-8 whitespace-pre-wrap text-lg">
          {renderContentWithFormatting(note.content)}
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t-2 border-black">
          <div>
            <p className="font-bold text-lg">{note.author}</p>
            <p className="text-sm">{formattedDate}</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleShare}
              className="flex items-center px-4 py-2 neo-border shadow-neo-sm bg-white text-black"
            >
              <Share2 size={16} className="mr-2" />
              <span>Share</span>
            </button>
            <button 
              onClick={handleDuplicate}
              className="flex items-center px-4 py-2 neo-border shadow-neo-sm bg-white text-black"
            >
              <Copy size={16} className="mr-2" />
              <span>Duplicate</span>
            </button>
            <button 
              onClick={handleDelete}
              className="flex items-center px-4 py-2 neo-border shadow-neo-sm bg-white text-black"
            >
              <Trash2 size={16} className="mr-2" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Study Tips Section */}
      <div className="mb-8 neo-card bg-neo-yellow p-6">
        <h3 className="text-xl font-bold flex items-center mb-3">
          <GraduationCap className="mr-2" />
          <span>Study Tips</span>
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Review these notes within 24 hours of the lecture to improve retention</li>
          <li>Create flashcards for key concepts and definitions</li>
          <li>Explain the material to a classmate to check your understanding</li>
          <li>Connect these concepts with previous lessons</li>
        </ul>
      </div>
      
      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold flex items-center mb-4">
          <MessageSquare className="mr-2" />
          <span>Discussion & Questions</span>
        </h3>
        
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ask a question or add a comment about these notes..."
            className="neo-textarea w-full mb-3"
            rows={3}
          />
          <div className="flex justify-end">
            <button 
              type="submit"
              className="neo-button-blue"
              disabled={!comment.trim()}
            >
              Post Comment
            </button>
          </div>
        </form>
        
        <div className="space-y-4">
          <div className="py-6 text-center bg-gray-50 neo-border">
            <p className="font-medium">No questions yet</p>
            <p className="text-sm">Be the first to ask a question about these notes!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
