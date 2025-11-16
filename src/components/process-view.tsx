import { useState } from 'react';
import type { Methodology, Note } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { NoteEditor } from './note-editor';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { NoteCard } from './note-card';

type ProcessViewProps = {
  methodology: Methodology;
  startupType: string;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  notes: Note[];
};

export function ProcessView({ methodology, startupType, onAddNote, notes }: ProcessViewProps) {
  const [selectedObjectives, setSelectedObjectives] = useState<Set<string>>(() => {
    const preselected = new Set<string>();
    methodology.objectives.forEach(obj => {
      if (obj.preselectedFor?.includes(startupType)) {
        preselected.add(obj.id);
      }
    });
    return preselected;
  });

  const [addingNoteTo, setAddingNoteTo] = useState<string | null>(null);

  const handleSelectObjective = (objectiveId: string, isSelected: boolean) => {
    setSelectedObjectives(prev => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(objectiveId);
      } else {
        newSet.delete(objectiveId);
      }
      return newSet;
    });
  };

  const handleSaveNote = (title: string, content: string, tags: string[]) => {
    if (addingNoteTo) {
      onAddNote({ title, content, tags, attachedTo: addingNoteTo });
      setAddingNoteTo(null);
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Objectives for {methodology.name}</CardTitle>
          <CardDescription>Select the objectives applicable to your current stage. Some are pre-selected based on your startup type.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {methodology.objectives.map(obj => {
              const attachedNotes = notes.filter(note => note.attachedTo === obj.id);
              return (
                <div key={obj.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id={obj.id}
                      checked={selectedObjectives.has(obj.id)}
                      onCheckedChange={(checked) => handleSelectObjective(obj.id, !!checked)}
                      className="mt-1"
                    />
                    <div className="flex-1 grid gap-1">
                      <Label htmlFor={obj.id} className="text-base font-medium">
                        {obj.title}
                      </Label>
                      <p className="text-muted-foreground">{obj.description}</p>
                    </div>
                     <Button variant="ghost" size="sm" onClick={() => setAddingNoteTo(obj.id)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Note
                      </Button>
                  </div>
                  {addingNoteTo === obj.id && (
                    <div className="mt-4">
                        <NoteEditor onSave={handleSaveNote} onCancel={() => setAddingNoteTo(null)} startupType={startupType} />
                    </div>
                  )}
                  {attachedNotes.length > 0 && (
                    <div className="mt-4 space-y-2 pl-8">
                        {attachedNotes.map(note => <NoteCard key={note.id} note={note} />)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
