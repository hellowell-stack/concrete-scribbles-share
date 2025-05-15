
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookText, BookOpen, GraduationCap, Folder, Info, List, Hash, Code, FileText, Image, Link as LinkIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Attachment {
  name: string;
  type: string;
  url: string;
}

const NoteCreator = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');
  const [subject, setSubject] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showFormatHelp, setShowFormatHelp] = useState(false);
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
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
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
      subject: subject,
      attachments: attachments.length > 0 ? attachments : undefined,
    };
    
    // For demo purposes, we'll save to localStorage
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    localStorage.setItem('notes', JSON.stringify([newNote, ...existingNotes]));
    
    toast({
      title: "Note created!",
      description: "Your note has been saved successfully."
    });
    navigate('/notes');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, you'd upload to a storage service
    // For demo purposes, we'll just create URL objects
    const newAttachments: Attachment[] = Array.from(files).map(file => ({
      name: file.name,
      type: file.type,
      // Create a temporary object URL - in a real app this would be a server URL
      url: URL.createObjectURL(file)
    }));
    
    setAttachments([...attachments, ...newAttachments]);
    toast({
      title: "Files attached",
      description: `${newAttachments.length} file(s) attached to your note.`
    });
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    // In a real app, you might need to delete the file from storage
    URL.revokeObjectURL(newAttachments[index].url); // Cleanup object URL
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const insertFormatting = (format: string) => {
    switch (format) {
      case 'h1':
        setContent(prev => prev + "\n# Heading 1\n");
        break;
      case 'h2':
        setContent(prev => prev + "\n## Heading 2\n");
        break;
      case 'h3':
        setContent(prev => prev + "\n### Heading 3\n");
        break;
      case 'list':
        setContent(prev => prev + "\n- List item\n- Another item\n");
        break;
      case 'code':
        setContent(prev => prev + "\n```\nYour code here\n```\n");
        break;
      case 'link':
        setContent(prev => prev + "\n[Link text](https://example.com)\n");
        break;
      case 'image':
        setContent(prev => prev + "\n![Image alt text](https://example.com/image.jpg)\n");
        break;
      default:
        break;
    }
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
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="content" className="block font-bold flex items-center">
                Content <span className="text-neo-pink">*</span>
              </label>
              <button
                type="button"
                onClick={() => setShowFormatHelp(!showFormatHelp)}
                className="flex items-center text-sm hover:text-neo-blue"
              >
                <Info size={16} className="mr-1" />
                Formatting Help
              </button>
            </div>
            
            {showFormatHelp && (
              <div className="bg-gray-50 neo-border p-3 mb-3 text-sm">
                <h4 className="font-bold mb-2">Markdown Formatting:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <Hash size={16} className="mr-1" /> <code># Heading 1</code>
                  </div>
                  <div className="flex items-center">
                    <Hash size={16} className="mr-1" /> <code>## Heading 2</code>
                  </div>
                  <div className="flex items-center">
                    <List size={16} className="mr-1" /> <code>- List item</code>
                  </div>
                  <div className="flex items-center">
                    <Code size={16} className="mr-1" /> <code>```Code block```</code>
                  </div>
                  <div className="flex items-center">
                    <LinkIcon size={16} className="mr-1" /> <code>[text](url)</code>
                  </div>
                  <div className="flex items-center">
                    <Image size={16} className="mr-1" /> <code>![alt](image-url)</code>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => insertFormatting('h1')}
                className="neo-border bg-white p-1 hover:bg-gray-100"
                title="Insert Heading 1"
              >
                <Hash size={18} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('h2')}
                className="neo-border bg-white p-1 hover:bg-gray-100"
                title="Insert Heading 2"
              >
                <div className="flex items-center">
                  <Hash size={16} />
                  <Hash size={16} />
                </div>
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('h3')}
                className="neo-border bg-white p-1 hover:bg-gray-100" 
                title="Insert Heading 3"
              >
                <div className="flex items-center">
                  <Hash size={14} />
                  <Hash size={14} />
                  <Hash size={14} />
                </div>
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('list')}
                className="neo-border bg-white p-1 hover:bg-gray-100"
                title="Insert List"
              >
                <List size={18} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('code')}
                className="neo-border bg-white p-1 hover:bg-gray-100"
                title="Insert Code Block"
              >
                <Code size={18} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('link')}
                className="neo-border bg-white p-1 hover:bg-gray-100"
                title="Insert Link"
              >
                <LinkIcon size={18} />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting('image')}
                className="neo-border bg-white p-1 hover:bg-gray-100"
                title="Insert Image"
              >
                <Image size={18} />
              </button>
            </div>

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
            <label className="block font-bold mb-2 flex items-center">
              <FileText size={18} className="mr-2" />
              Attachments
            </label>
            <div className="flex flex-col space-y-3">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileUpload}
                multiple
                className="hidden"
              />
              <label 
                htmlFor="file-upload"
                className="neo-button w-full text-center cursor-pointer flex items-center justify-center"
              >
                <FileText size={16} className="mr-2" />
                Upload Files (PDFs, Images, etc.)
              </label>
              
              {attachments.length > 0 && (
                <div className="neo-border p-3 bg-gray-50">
                  <h4 className="font-bold mb-2">Attached Files:</h4>
                  <ul className="space-y-2">
                    {attachments.map((file, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText size={16} className="mr-2" />
                          <span>{file.name}</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
