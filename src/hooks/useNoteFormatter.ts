
import { useState, useEffect } from 'react';

export type FormattedSegment = {
  type: 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'list-item' | 'code' | 'image' | 'link';
  content: string;
  url?: string;
};

export function useNoteFormatter(content: string) {
  const [formattedContent, setFormattedContent] = useState<FormattedSegment[]>([]);
  
  useEffect(() => {
    if (!content) {
      setFormattedContent([]);
      return;
    }

    // Split content by lines
    const lines = content.split('\n');
    const formatted: FormattedSegment[] = [];
    
    lines.forEach(line => {
      // Process headings
      if (line.startsWith('### ')) {
        formatted.push({ type: 'heading3', content: line.substring(4) });
      } else if (line.startsWith('## ')) {
        formatted.push({ type: 'heading2', content: line.substring(3) });
      } else if (line.startsWith('# ')) {
        formatted.push({ type: 'heading1', content: line.substring(2) });
      } 
      // Process list items
      else if (line.startsWith('- ')) {
        formatted.push({ type: 'list-item', content: line.substring(2) });
      }
      // Process code blocks
      else if (line.startsWith('```')) {
        formatted.push({ type: 'code', content: line.substring(3) });
      }
      // Process image links
      else if (line.startsWith('![') && line.includes('](') && line.endsWith(')')) {
        const altTextEnd = line.indexOf('](');
        const altText = line.substring(2, altTextEnd);
        const url = line.substring(altTextEnd + 2, line.length - 1);
        formatted.push({ type: 'image', content: altText, url });
      }
      // Process links
      else if (line.startsWith('[') && line.includes('](') && line.endsWith(')')) {
        const textEnd = line.indexOf('](');
        const text = line.substring(1, textEnd);
        const url = line.substring(textEnd + 2, line.length - 1);
        formatted.push({ type: 'link', content: text, url });
      }
      // Regular paragraph
      else if (line.trim()) {
        formatted.push({ type: 'paragraph', content: line });
      }
    });
    
    setFormattedContent(formatted);
  }, [content]);
  
  return formattedContent;
}
