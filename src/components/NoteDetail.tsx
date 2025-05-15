
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Share2, MessageSquare, Trash2, Copy } from 'lucide-react';
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
          onClick={() => navigate('/')}
          className="neo-button"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const colorClass = getCardColorClass(note.color);

  const handleShare = () => {
    // In a real app, this would generate a sharing link
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleDelete = () => {
    const updatedNotes = notes.filter((n: Note) => n.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    toast.success('Note deleted!');
    navigate('/');
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
    
    toast.success('Comment added!');
    setComment('');
    // In a real app, this would save the comment to a database
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className={`neo-card ${colorClass} p-6 mb-8`}>
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <div className="mb-6 whitespace-pre-wrap">{note.content}</div>
        
        <div className="flex justify-between items-center pt-4 border-t-2 border-black">
          <div>
            <p className="font-bold">{note.author}</p>
            <p className="text-sm">{new Date(note.date).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleShare}
              className="flex items-center px-3 py-2 neo-border shadow-neo-sm bg-white text-black"
            >
              <Share2 size={16} className="mr-2" />
              <span>Share</span>
            </button>
            <button 
              onClick={handleDuplicate}
              className="flex items-center px-3 py-2 neo-border shadow-neo-sm bg-white text-black"
            >
              <Copy size={16} className="mr-2" />
              <span>Duplicate</span>
            </button>
            <button 
              onClick={handleDelete}
              className="flex items-center px-3 py-2 neo-border shadow-neo-sm bg-white text-black"
            >
              <Trash2 size={16} className="mr-2" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold flex items-center mb-4">
          <MessageSquare className="mr-2" />
          <span>Comments</span>
        </h3>
        
        <form onSubmit={handleSubmitComment} className="mb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
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
          {/* This would normally show real comments, but for demo we'll show a placeholder */}
          <div className="py-6 text-center text-gray-500">
            <p className="font-medium">No comments yet</p>
            <p className="text-sm">Be the first to share your thoughts!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
