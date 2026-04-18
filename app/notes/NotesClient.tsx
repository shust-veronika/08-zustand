'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';

type Props = {
  notes: Note[];
};

type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export default function NotesClient({ notes }: Props) {
 const { data } = useQuery<NotesResponse>({
  queryKey: ['notes'],
  queryFn: () => fetchNotes({}),
  initialData: {
    notes,
    totalPages: 1,
  },
});

  return (
    <main>
      <Link href="/notes/action/create">Create note +</Link>

      <ul>
        {data?.notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}