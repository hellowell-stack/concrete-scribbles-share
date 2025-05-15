
import React from 'react';
import { FormattedSegment } from '../hooks/useNoteFormatter';

interface FormattedNoteContentProps {
  segments: FormattedSegment[];
}

const FormattedNoteContent: React.FC<FormattedNoteContentProps> = ({ segments }) => {
  return (
    <div className="formatted-note">
      {segments.map((segment, index) => {
        switch (segment.type) {
          case 'heading1':
            return <h1 key={index} className="text-3xl font-bold my-4">{segment.content}</h1>;
          case 'heading2':
            return <h2 key={index} className="text-2xl font-bold my-3">{segment.content}</h2>;
          case 'heading3':
            return <h3 key={index} className="text-xl font-bold my-2">{segment.content}</h3>;
          case 'list-item':
            return (
              <div key={index} className="flex items-start my-1">
                <span className="mr-2 mt-1">•</span>
                <p>{segment.content}</p>
              </div>
            );
          case 'code':
            return (
              <pre key={index} className="bg-gray-100 p-3 my-3 neo-border border-2 font-mono text-sm overflow-x-auto">
                {segment.content}
              </pre>
            );
          case 'image':
            return (
              <div key={index} className="my-4">
                <img 
                  src={segment.url} 
                  alt={segment.content} 
                  className="max-w-full neo-border"
                />
                {segment.content && <p className="text-sm text-gray-500 mt-1">{segment.content}</p>}
              </div>
            );
          case 'link':
            return (
              <a 
                key={index} 
                href={segment.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neo-blue underline hover:text-neo-pink transition-colors"
              >
                {segment.content}
              </a>
            );
          case 'paragraph':
          default:
            return <p key={index} className="my-2">{segment.content}</p>;
        }
      })}
    </div>
  );
};

export default FormattedNoteContent;
