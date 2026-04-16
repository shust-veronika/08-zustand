export interface Note {
  id: string;
  title: string;
  content: string;
  tag?: string;
  createdAt: string;
}
export type NewNote = Omit<Note, 'id' | 'createdAt'>;