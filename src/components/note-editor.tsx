'use client';

import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { startupTypesForTags } from "@/lib/data";
import { Badge } from "./ui/badge";

type NoteEditorProps = {
  onSave: (title: string, content: string, tags: string[]) => void;
  onCancel: () => void;
  startupType: string;
  initialTitle?: string;
  initialContent?: string;
  initialTags?: string[];
};

export function NoteEditor({ onSave, onCancel, startupType, initialTitle = '', initialContent = '', initialTags = [] }: NoteEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set(initialTags));

  const availableTags = startupTypesForTags[startupType as keyof typeof startupTypesForTags] || [];

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  const handleSaveClick = () => {
    onSave(title, content, Array.from(selectedTags));
    setTitle('');
    setContent('');
    setSelectedTags(new Set());
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="note-title">Note Title</Label>
          <Input id="note-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My great idea..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="note-content">Content (Markdown supported)</Label>
          <Textarea id="note-content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Details about the idea..." rows={6} className="font-code" />
        </div>
        {availableTags.length > 0 && (
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.has(tag) ? 'default' : 'outline'}
                  onClick={() => handleTagClick(tag)}
                  className="cursor-pointer"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSaveClick} disabled={!title || !content}>Save Note</Button>
        </div>
      </CardContent>
    </Card>
  );
}
