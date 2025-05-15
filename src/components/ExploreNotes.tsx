
import React, { useState } from 'react';
import NoteCard, { Note } from './NoteCard';

const colorFilters = [
  { name: 'All', value: 'all' },
  { name: 'Blue', value: 'blue' },
  { name: 'Pink', value: 'pink' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Purple', value: 'purple' },
  { name: 'Orange', value: 'orange' },
];

const ExploreNotes = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Sample explore notes
  const exploreNotes: Note[] = [
    {
      id: 'e1',
      title: 'Design Inspiration',
      content: 'Neo-brutalism design is all about bold colors, raw elements, and playful aesthetics. It embraces imperfection and celebrates digital materiality.',
      color: 'blue',
      author: 'Sarah Designer',
      date: '2025-05-12',
      comments: 8,
      shares: 12,
    },
    {
      id: 'e2',
      title: 'Coding Tips',
      content: 'Always comment your code! Future you will thank present you for the documentation. Clean code is readable code.',
      color: 'pink',
      author: 'Dev Master',
      date: '2025-05-10',
      comments: 5,
      shares: 9,
    },
    {
      id: 'e3',
      title: 'Project Management',
      content: 'Break down large tasks into smaller, manageable chunks. Use the Pomodoro technique for better focus and productivity.',
      color: 'green',
      author: 'Project Pro',
      date: '2025-05-08',
      comments: 3,
      shares: 4,
    },
    {
      id: 'e4',
      title: 'Creative Writing',
      content: 'Start with a compelling hook. Engage your readers from the first sentence. Show, don\'t tell.',
      color: 'yellow',
      author: 'Writer Extraordinaire',
      date: '2025-05-06',
      comments: 6,
      shares: 7,
    },
    {
      id: 'e5',
      title: 'Marketing Strategy',
      content: 'Know your audience. Tailor your content to their needs and preferences. Consistency is key for brand recognition.',
      color: 'purple',
      author: 'Marketing Guru',
      date: '2025-05-04',
      comments: 2,
      shares: 5,
    },
    {
      id: 'e6',
      title: 'Health Tips',
      content: 'Stay hydrated. Take regular breaks from screen time. Stretch often if you sit for long periods.',
      color: 'orange',
      author: 'Wellness Expert',
      date: '2025-05-02',
      comments: 7,
      shares: 11,
    },
  ];

  const filteredNotes = selectedFilter === 'all' 
    ? exploreNotes 
    : exploreNotes.filter(note => note.color === selectedFilter);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Explore Notes</h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {colorFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`py-2 px-4 neo-border font-bold ${
                selectedFilter === filter.value 
                  ? 'bg-neo-black text-white' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default ExploreNotes;
