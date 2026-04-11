import { Metadata } from "next";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content,
      url: `https://your-site.vercel.app/notes/${params.id}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}