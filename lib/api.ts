import axios from "axios";
import { Note, CreateNoteDTO } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(): Promise<Note[]> {
  const res = await instance.get('/notes');
  return res.data;
}
export async function fetchNoteById(id: string): Promise<Note> {
  const res = await instance.get(`/notes/${id}`);
  return res.data;
}

export async function createNote(note: CreateNoteDTO): Promise<Note> {
  const res = await instance.post("/notes", note);
  return res.data;
}

export async function deleteNote(id: string): Promise<void> {
  await instance.delete(`/notes/${id}`);
}