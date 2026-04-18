import axios from "axios";
import { Note, CreateNoteDTO } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}`,
  },
});

type FetchNotesParams = {
  tag?: string;
  search?: string;
  page?: number;
};

export async function fetchNotes({
  tag,
  search,
  page = 1,
}: FetchNotesParams): Promise<{
  notes: Note[];
  totalPages: number;
}> {
  const res = await instance.get("/notes", {
    params: {
      ...(tag && { tag }),
      ...(search && { search }),
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