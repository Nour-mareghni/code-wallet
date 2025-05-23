// SearchByTag component - Allows filtering snippets by tags
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import SnippetList from "../features/snippets/SnippetList";

export default function SearchByTag() {
  // Access snippets data from router context
  const { snippets } = useOutletContext();
  
  // State for selected tag and available tags list
  const [selectedTag, setSelectedTag] = useState("");
  const [availableTags, setAvailableTags] = useState([]);

  // Effect to extract unique tags from snippets
  useEffect(() => {
    const allTags = snippets.flatMap((s) => s.tags || []); // Flatten all tags
    setAvailableTags([...new Set(allTags)]); // Remove duplicates using Set
  }, [snippets]);

  // Filter snippets based on selected tag
  const filteredSnippets = selectedTag
    ? snippets.filter((s) => s.tags?.includes(selectedTag))
    : snippets;

  return (
    // Main container with light background
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Page header */}
      <h1 className="text-3xl font-bold mb-6 text-center">🔍 Search by Tag</h1>

      {/* Tag filter controls */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {/* Render each available tag as a filter button */}
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-1 rounded-full text-sm border ${
              selectedTag === tag
                ? "bg-blue-600 text-white" // Active tag style
                : "bg-white text-blue-600 border-blue-400" // Inactive tag style
            }`}
          >
            {tag}
          </button>
        ))}
        
        {/* Clear filter button (shown only when a tag is selected) */}
        {selectedTag && (
          <button
            onClick={() => setSelectedTag("")}
            className="ml-2 text-sm text-red-500 underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Display filtered snippets using SnippetList component */}
      <SnippetList snippets={filteredSnippets} onEdit={() => {}} />
    </div>
  );
}