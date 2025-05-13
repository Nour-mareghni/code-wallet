import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react"; // Import Monaco Editor

export default function SnippetForm({ onAddSnippet, onUpdateSnippet, editingSnippet }) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title);
      setCode(editingSnippet.code);
      setTags(editingSnippet.tags.join(", "));
    } else {
      setTitle("");
      setCode("");
      setTags("");
    }
  }, [editingSnippet]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSnippet = {
      id: editingSnippet?.id || Date.now(),
      title,
      code,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    if (editingSnippet) {
      onUpdateSnippet(newSnippet);
    } else {
      onAddSnippet(newSnippet);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow w-full max-w-4xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </div>

      {/* Code Editor Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Code</label>
        <Editor
          height="400px" // Height of the code editor
          value={code}  // Value passed to Monaco Editor
          onChange={(value) => setCode(value)}  // Update the code state when the editor changes
          language="javascript" // Set language for syntax highlighting (JavaScript in this case)
          theme="vs-dark"  // You can switch between themes like 'vs-light' and 'vs-dark'
        />
      </div>

      {/* Tags Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {editingSnippet ? "Update Snippet" : "Add Snippet"}
      </button>
    </form>
  );
}
