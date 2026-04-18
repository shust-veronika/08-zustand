'use client';

import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1} 
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.prevItem}
      previousLinkClassName={css.prevLink}
      nextClassName={css.nextItem}
      nextLinkClassName={css.nextLink}
      activeClassName={css.active}
      breakLabel="..."
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      previousLabel="←"
      nextLabel="→"
    />
  );
}