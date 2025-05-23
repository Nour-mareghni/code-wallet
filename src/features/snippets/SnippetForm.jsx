// Import React hooks and CodeMirror components
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

// SnippetForm component for creating/editing code snippets
export default function SnippetForm({ onAddSnippet, onUpdateSnippet, editingSnippet }) {
  // State for form fields
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");
  
  // Retrieve tags from localStorage or default to empty array
  const storedTags = JSON.parse(localStorage.getItem("tags")) || [];

  // Effect to populate form when editing an existing snippet
  useEffect(() => {
    if (editingSnippet) {
      setTitle(editingSnippet.title);
      setCode(editingSnippet.code);
      setTags(editingSnippet.tags.join(", ")); // Convert tags array to comma-separated string
    } else {
      // Reset form when not in edit mode
      setTitle("");
      setCode("");
      setTags("");
    }
  }, [editingSnippet]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare snippet data object
    const newSnippet = {
      id: editingSnippet?.id || Date.now(), // Use existing ID or generate new one
      title,
      code,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated string to array
    };

    // Call appropriate callback based on edit mode
    if (editingSnippet) {
      onUpdateSnippet(newSnippet);
    } else {
      onAddSnippet(newSnippet);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow w-full max-w-4xl mx-auto">
      {/* Title Input */}
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
        <label className="block text-sm font-medium">Code</label>
        <div className="h-[500px] border rounded overflow-hidden mt-1">
          <CodeMirror
            value={code}
            height="100%"
            theme={oneDark} // Dark theme for editor
            extensions={[javascript()]} // JavaScript syntax highlighting
            onChange={(value) => setCode(value)}
            basicSetup={{ lineNumbers: true }} // Show line numbers
          />
        </div>
      </div>

      {/* Tags Input Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Tags
        </label>
        {/* Display stored tags as clickable buttons */}
        <div className="flex flex-wrap gap-2 mb-2">
          {storedTags.map((tag) => {
            const tagList = tags.split(",").map((t) => t.trim());
            const selected = tagList.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => {
                  // Toggle tag selection
                  const updated = selected
                    ? tagList.filter((t) => t !== tag)
                    : [...tagList, tag];
                  setTags(updated.join(", "));
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Manual tag input field */}
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Or type custom tags, comma separated"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {editingSnippet ? "Update Snippet" : "Add Snippet"}
      </button>
    </form>
  );
}