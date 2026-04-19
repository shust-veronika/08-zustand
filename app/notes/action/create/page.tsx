import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Page for creating a new note",
  openGraph: {
    title: "Create Note",
    description: "Page for creating a new note",
    url: "https://08-zustand-eight-eta.vercel.app/notes/action/create", 
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note Preview",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Create Note</h1>
      <NoteForm />
    </main>
  );
}