import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import SnippetList from "../features/snippets/SnippetList";

export default function SearchByTag() {
  const { snippets } = useOutletContext();
  const [selectedTag, setSelectedTag] = useState("");
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const allTags = snippets.flatMap((s) => s.tags || []);
    setAvailableTags([...new Set(allTags)]);
  }, [snippets]);

  const filteredSnippets = selectedTag
    ? snippets.filter((s) => s.tags?.includes(selectedTag))
    : snippets;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">🔍 Search by Tag</h1>

      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1 rounded-full text-sm border ${
              selectedTag === tag
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-400"
            }`}
          >
            {tag}
          </button>
        ))}
        {selectedTag && (
          <button
            onClick={() => setSelectedTag("")}
            className="ml-2 text-sm text-red-500 underline"
          >
            Clear
          </button>
        )}
      </div>

      <SnippetList snippets={filteredSnippets} onEdit={() => {}} />
    </div>
  );
}
