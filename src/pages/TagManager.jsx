import { useEffect, useState } from "react";

export default function TagManager() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // Load tags from localStorage on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tags")) || [];
    setTags(saved);
  }, []);

  const saveTags = (updated) => {
    setTags(updated);
    localStorage.setItem("tags", JSON.stringify(updated));
  };

  const handleAdd = () => {
    const clean = newTag.trim();
    if (!clean || tags.includes(clean)) return;
    saveTags([...tags, clean]);
    setNewTag("");
  };

  const handleDelete = (tag) => {
    const updated = tags.filter((t) => t !== tag);
    saveTags(updated);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">🏷️ Tag Manager</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="p-2 border border-gray-400 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => handleDelete(tag)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
