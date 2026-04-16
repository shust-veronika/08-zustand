import Modal from "@/components/Modal/Modal";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import { fetchNoteById } from "@/lib/api";

type Props = {
  params: { id: string };
};


export default async function NoteModal({ params }: Props) {
  
  return (
    <Modal>
      <NotePreview id={params.id} />
    </Modal>
  );
}