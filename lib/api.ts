import axios from "axios";
import { Note, CreateNoteDTO } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}`,
  },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  tag?: string,
  search?: string,
  page: number = 1
): Promise<NotesResponse> {
  const res = await instance.get<NotesResponse>("/notes", {
    params: {
      tag,
      search,
      page,
    },
  });
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