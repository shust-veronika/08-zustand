import { 
  dehydrate, 
  HydrationBoundary, 
  QueryClient 
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetails from "@/app/notes/[id]/NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Виправлено: компонент більше не отримує note через пропс.
        Він візьме дані з кешу React Query завдяки HydrationBoundary.
      */}
      <NoteDetails />
    </HydrationBoundary>
  );
}