'use client';

import Link from "next/link";
import { Note } from "@/types/note";

type Props = {
  tag?: string;
  notes?: Note[];
};

export default function NoteList({ notes }: Props) {
  if (!notes || notes.length === 0) {
    return <p>Нотаток не знайдено.</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link href={`/notes/${note.id}`}>
            {note.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}