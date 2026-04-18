"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { CreateNoteDTO } from "@/types/note";

type NoteFormProps = {
  onSuccess?: () => void;
};

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = async (formData: FormData) => {
    const newNote: CreateNoteDTO = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };

    await createNote(newNote);

    clearDraft();

    onSuccess?.();

    router.back(); 
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
      />

      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
      />

      <select name="tag" value={draft.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Create</button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}