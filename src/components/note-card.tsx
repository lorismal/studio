import type { Note } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { format } from 'date-fns';

export function NoteCard({ note }: { note: Note }) {
  return (
    <Card className="bg-background/50">
        <CardHeader className="p-4">
            <CardTitle className="text-base">{note.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            {/* For a real app, we'd render markdown here */}
            <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
             <div className="flex flex-wrap gap-1">
                {note.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
            <span className="text-xs text-muted-foreground">{format(note.createdAt, 'MMM d, yyyy')}</span>
        </CardFooter>
    </Card>
  );
}
