import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Page for creating a new note",
};

export default function CreateNotePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Create Note</h1>
      <NoteForm />
    </div>
  );
}