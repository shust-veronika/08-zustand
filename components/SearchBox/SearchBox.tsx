'use client';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (val: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <div className={css.container}>
      <input
        type="text"
        className={css.input}
        placeholder="Search notes by title..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}