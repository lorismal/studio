'use client';

import { useState } from 'react';
import type { Methodology, Note, Objective, SubObjective } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { NoteEditor } from './note-editor';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { NoteCard } from './note-card';

type SubObjectiveCardProps = {
    objective: SubObjective;
    notes: Note[];
    onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
    startupType: string;
}

function SubObjectiveCard({ objective, notes, onAddNote, startupType }: SubObjectiveCardProps) {
  const [addingNoteTo, setAddingNoteTo] = useState<string | null>(null);

  const handleSaveNote = (title: string, content: string, tags: string[]) => {
    if (addingNoteTo) {
      onAddNote({ title, content, tags, attachedTo: addingNoteTo });
      setAddingNoteTo(null);
    }
  }

  const attachedNotes = notes.filter(note => note.attachedTo === objective.id);

  return (
    <div className="p-4 border rounded-lg bg-card" id={`objective-${objective.id}`}>
      <div className="flex items-start gap-4">
        <div className="flex-1 grid gap-1">
          <Label htmlFor={objective.id} className="text-base font-medium">
            {objective.title}
          </Label>
          <p className="text-muted-foreground">{objective.description}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setAddingNoteTo(objective.id)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </div>
      {addingNoteTo === objective.id && (
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
  )
}


type ProcessViewProps = {
  methodology: Methodology;
  startupType: string;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  notes: Note[];
  activeObjectiveId: string | null;
  onSelectObjective: (id: string | null) => void;
};

export function ProcessView({ methodology, startupType, onAddNote, notes, activeObjectiveId }: ProcessViewProps) {
  
  const activeParentObjective = methodology.objectives.find(obj => obj.id === activeObjectiveId || obj.subObjectives.some(sub => sub.id === activeObjectiveId));
  const activeSubObjective = activeParentObjective?.subObjectives.find(sub => sub.id === activeObjectiveId);

  const renderContent = () => {
    if (activeSubObjective) {
      // Viewing a single sub-objective
      return <SubObjectiveCard objective={activeSubObjective} notes={notes} onAddNote={onAddNote} startupType={startupType} />;
    }
    
    const objectivesToRender = activeParentObjective ? [activeParentObjective] : methodology.objectives;

    return objectivesToRender.map(obj => (
      <Card key={obj.id}>
        <CardHeader>
          <CardTitle>{obj.title}</CardTitle>
          <CardDescription>{obj.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {obj.subObjectives.length > 0 ? (
            obj.subObjectives.map(subObj => (
              <SubObjectiveCard 
                key={subObj.id} 
                objective={subObj} 
                notes={notes} 
                onAddNote={onAddNote}
                startupType={startupType}
              />
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No sub-objectives defined for this stage.</p>
          )}
        </CardContent>
      </Card>
    ));
  }
  
  const getTitle = () => {
    if (activeSubObjective) return `Objective: ${activeSubObjective.title}`;
    if (activeParentObjective) return `Stage: ${activeParentObjective.title}`;
    return `Process for ${methodology.name}`;
  }

  const getDescription = () => {
    if (activeSubObjective) return activeSubObjective.description;
    if (activeParentObjective) return activeParentObjective.description;
    return 'Here is a breakdown of the process for your startup based on the selected methodology.';
  }


  return (
    <div className="p-4 md:p-6 space-y-6">
      <Card>
          <CardHeader>
            <CardTitle>{getTitle()}</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {renderContent()}
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
