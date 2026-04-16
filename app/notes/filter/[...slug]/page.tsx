import { Metadata } from "next";

type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const filter = params.slug?.join(", ") || "All";

  return {
    title: `Notes - ${filter}`,
    description: `Viewing notes filtered by ${filter}`,
    openGraph: {
      title: `Notes - ${filter}`,
      description: `Viewing notes filtered by ${filter}`,
      url: `https://your-site.vercel.app/notes/filter/${filter}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

export default function FilterPage() {
  return <div>Filter page</div>;
}