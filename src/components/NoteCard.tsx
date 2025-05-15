
import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, MessageSquare, BookText, Folder } from 'lucide-react';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  author: string;
  date: string;
  comments: number;
  shares: number;
  subject?: string;
}

interface NoteCardProps {
  note: Note;
}

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

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const colorClass = getCardColorClass(note.color);
  const formattedDate = new Date(note.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Link to={`/notes/${note.id}`}>
      <div className={`neo-card ${colorClass} h-full p-5 flex flex-col relative overflow-hidden`}>
        {note.subject && (
          <div className="absolute -right-8 top-4 bg-black text-white py-1 px-8 transform rotate-45 text-xs font-bold">
            {note.subject}
          </div>
        )}
        
        <div className="mb-2 flex items-start">
          <BookText size={20} className="mr-2 flex-shrink-0 mt-1" />
          <h3 className="font-bold text-xl leading-tight">{note.title}</h3>
        </div>
        
        <p className="flex-grow mb-4 line-clamp-3">{note.content}</p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t-2 border-black">
          <div className="text-sm">
            <div className="font-medium">{note.author}</div>
            <div className="text-xs opacity-80">{formattedDate}</div>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="flex items-center">
              <MessageSquare size={16} className="mr-1" />
              <span>{note.comments}</span>
            </div>
            <div className="flex items-center">
              <Share2 size={16} className="mr-1" />
              <span>{note.shares}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
