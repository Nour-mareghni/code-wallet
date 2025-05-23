// TagManager component - Manages the creation and deletion of tags
import { useEffect, useState } from "react";

export default function TagManager() {
  // State for existing tags and new tag input
  const [tags, setTags] = useState([]); // Array of existing tags
  const [newTag, setNewTag] = useState(""); // Input for new tag

  // Load tags from localStorage when component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tags")) || []; // Get saved tags or empty array
    setTags(saved); // Initialize state
  }, []); // Empty dependency array means this runs once on mount

  // Helper function to save tags to state and localStorage
  const saveTags = (updated) => {
    setTags(updated); // Update state
    localStorage.setItem("tags", JSON.stringify(updated)); // Persist to localStorage
  };

  // Add a new tag
  const handleAdd = () => {
    const clean = newTag.trim(); // Remove whitespace
    if (!clean || tags.includes(clean)) return; // Skip if empty or duplicate
    saveTags([...tags, clean]); // Add new tag
    setNewTag(""); // Reset input field
  };

  // Delete a tag
  const handleDelete = (tag) => {
    const updated = tags.filter((t) => t !== tag); // Filter out the deleted tag
    saveTags(updated); // Update tags
  };

  return (
    // Main container
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Page header */}
      <h2 className="text-3xl font-bold mb-6">🏷️ Tag Manager</h2>

      {/* Add tag form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="p-2 border border-gray-400 rounded"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()} // Add on Enter key
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Tags display area */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag} // Unique key for React
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {tag} {/* Tag name */}
            <button
              onClick={() => handleDelete(tag)}
              className="text-red-500 hover:text-red-700 text-sm"
              aria-label={`Delete ${tag}`}
            >
              ✕ {/* Delete icon */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}