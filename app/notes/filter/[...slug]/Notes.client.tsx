'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; 
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal'; 
import Pagination from '@/components/Pagination/Pagination';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, page, debouncedSearch], 
    queryFn: () => fetchNotes(tag, debouncedSearch, page),
    placeholderData: keepPreviousData, 
  });

  const handlePageClick = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); 
  };

  return (
    <div className="container">
      <button onClick={() => setIsModalOpen(true)}>Add New Note</button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <SearchBox value={search} onSearch={handleSearch} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading notes.</p>
      ) : (
        <>
          {}
          <NoteList notes={data?.notes || []} />
          
          <Pagination 
            totalPages={data?.totalPages || 0}
            currentPage={page}
            onPageChange={handlePageClick}
          />
        </>
      )}
    </div>
  );
}