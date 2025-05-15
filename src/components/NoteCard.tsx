
import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, MessageSquare } from 'lucide-react';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  author: string;
  date: string;
  comments: number;
  shares: number;
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

  return (
    <Link to={`/notes/${note.id}`}>
      <div className={`neo-card ${colorClass} h-full p-4 flex flex-col`}>
        <h3 className="font-bold text-xl mb-2">{note.title}</h3>
        <p className="flex-grow mb-4 line-clamp-3">{note.content}</p>
        <div className="flex justify-between items-center mt-auto pt-2 border-t-2 border-black">
          <div className="text-sm font-medium">{note.author}</div>
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
