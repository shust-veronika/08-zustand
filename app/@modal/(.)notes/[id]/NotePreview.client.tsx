'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className="note-preview-container">
        {isLoading && <p>Loading note details...</p>}
        
        {isError && (
          <div>
            <p>Error loading note.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}

        {note && (
          <article>
            <header style={{ marginBottom: '1rem' }}>
              <button 
                onClick={handleClose}
                style={{ float: 'right', cursor: 'pointer' }}
              >
                ✕ Close
              </button>
              <h2 style={{ margin: 0 }}>{note.title}</h2>
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <span style={{ backgroundColor: '#eee', padding: '2px 8px', borderRadius: '4px' }}>
                  #{note.tag}
                </span>
                <time style={{ color: '#666' }}>
                  {new Date(note.createdAt).toLocaleDateString()}
                </time>
              </div>
            </header>

            <section>
              <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
            </section>
          </article>
        )}
      </div>
    </Modal>
  );
}