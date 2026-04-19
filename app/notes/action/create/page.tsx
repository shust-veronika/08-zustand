"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNotePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ title, content, tag }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      router.push("/notes/filter/all");
    } catch (error) {
      console.error(error);
      alert("Error while creating note");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Create Note</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tag (e.g. work, personal)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}