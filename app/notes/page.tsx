import { fetchNotes } from '@/lib/api';
import NotesClient from './NotesClient';

export default async function NotesPage() {
  const notes = await fetchNotes(); // SSR

  return <NotesClient notes={notes} />;
}