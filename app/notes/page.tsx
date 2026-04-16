export const dynamic = "force-dynamic";

import { fetchNotes } from '@/lib/api';
import NotesClient from './NotesClient';

export default async function NotesPage() {
  const notes = await fetchNotes(); 
  return <NotesClient notes={notes} />;
}