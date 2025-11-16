import type { Note } from "@/lib/data";
import { NoteCard } from "./note-card";
import { NoteEditor } from "./note-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

type NotebookViewProps = {
  notes: Note[];
  startupType: string;
  onAddNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
};

export function NotebookView({ notes, startupType, onAddNote }: NotebookViewProps) {
  const handleSaveNote = (title: string, content: string, tags: string[]) => {
    onAddNote({ title, content, tags });
  };

  return (
    <div className="p-4 md:p-6 grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Add a New Note</CardTitle>
                    <CardDescription>Create a general note. You can attach it to objectives later.</CardDescription>
                </CardHeader>
                <CardContent>
                    <NoteEditor onSave={handleSaveNote} onCancel={() => {}} startupType={startupType} />
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">All Notes</h2>
             {notes.length === 0 ? (
                <p className="text-muted-foreground">You haven't created any notes yet.</p>
            ) : (
                <div className="space-y-4">
                    {notes.map(note => <NoteCard key={note.id} note={note} />)}
                </div>
             )}
        </div>
      </div>
    </div>
  );
}
