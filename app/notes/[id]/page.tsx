import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteDetails.module.css";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note: Note | null = await fetchNoteById(params.id);

  if (!note) {
    return {
      title: "Note Not Found",
      description: "The requested note could not be found.",
    };
  }

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://your-site.vercel.app/notes/${params.id}`, // Заміни на свій домен пізніше
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

export default async function NoteDetailPage({ params }: Props) {
  const note: Note | null = await fetchNoteById(params.id);

  if (!note) {
    notFound();
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <article className={css.note}>
          <h1 className={css.title}>{note.title}</h1>
          <div className={css.tag}>{note.tag}</div>
          <div className={css.content}>
            {note.content}
          </div>
        </article>
      </div>
    </main>
  );
}