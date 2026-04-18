export const dynamic = "force-dynamic";

import { fetchNotes } from '@/lib/api';
import NotesClient from './NotesClient';

export default async function NotesPage() {
  const notes = await fetchNotes({
  tag: undefined,
  search: undefined,
  page: 1,
});
  return <NotesClient notes={notes.notes} />;
}