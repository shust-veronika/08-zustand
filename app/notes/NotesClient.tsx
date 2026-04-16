'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';

type Props = {
  notes: Note[];
};

export default function NotesClient({ notes }: Props) {
  const { data } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    initialData: notes,
  });

  return (
    <main>
      <Link href="/notes/action/create">Create note +</Link>

      <ul>
        {data.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}