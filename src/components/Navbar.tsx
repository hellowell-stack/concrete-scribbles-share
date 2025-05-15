
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, Search, User, GraduationCap, BookText } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white neo-border border-b-4 border-black z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap size={28} className="text-neo-blue" />
            <span className="font-bold text-xl">CollegeNotes</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-bold hover:text-neo-blue">Home</Link>
            <Link to="/notes" className="font-bold hover:text-neo-blue">My Notes</Link>
            <Link to="/explore" className="font-bold hover:text-neo-blue">Explore</Link>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Link to="/search" className="p-2 hover:bg-gray-100 rounded-full">
              <Search size={20} />
            </Link>
            <Link to="/new-note" className="bg-neo-blue neo-border shadow-neo-sm text-white px-3 py-1 rounded-sm font-bold flex items-center">
              <Plus size={16} className="mr-1" />
              <span>New</span>
            </Link>
            <Link to="/profile" className="p-1 neo-border shadow-neo-sm rounded-full">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
