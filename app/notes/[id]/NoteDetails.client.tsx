'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';

export default function NoteDetails() {
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}