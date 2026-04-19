"use client";

import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { CreateNoteDTO } from "@/types/note";

type NoteFormProps = {
  onSuccess?: () => void;
};

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      clearDraft();
      onSuccess?.();
      router.back();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

    mutation.mutate(newNote);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <input
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <textarea
        name="content"
        value={draft.content}
        onChange={handleChange}
        placeholder="Content"
        required
      />

      <select name="tag" value={draft.tag} onChange={handleChange}>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create"}
      </button>

      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
    </form>
  );
}