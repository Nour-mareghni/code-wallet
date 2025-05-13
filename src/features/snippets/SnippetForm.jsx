import { useState } from "react";

export default function SnippetForm({ onAddSnippet }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState(""); // comma-separated tags for now

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !code.trim()) {
      alert("Title and code are required.");
      return;
    }

    const newSnippet = {
      id: Date.now().toString(), // simple ID
      title: title.trim(),
      code: code.trim(),
      tags: tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag),
      createdAt: new Date().toISOString(),
    };

    onAddSnippet(newSnippet);
    setTitle("");
    setCode("");
    setTags("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Snippet</h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Your code..."
        className="w-full p-2 border rounded font-mono h-40"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Snippet
      </button>
    </form>
  );
}
