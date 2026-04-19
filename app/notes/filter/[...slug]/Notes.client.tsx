"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";

import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        tag,
        search: debouncedSearch,
        page,
      }),
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
      <Link href="/notes/action/create">
  <button>Add New Note</button>
</Link>

      <SearchBox value={search} onSearch={handleSearch} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading notes.</p>
      ) : (
        <>
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