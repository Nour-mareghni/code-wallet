// App.jsx - Root component providing shared state and routing
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {
  // State initialization with localStorage persistence
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem("snippets"); // Get saved snippets
    return saved ? JSON.parse(saved) : []; // Parse or default to empty array
  });

  // Effect to sync snippets to localStorage on change
  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]); // Runs whenever snippets change

  // Delete a snippet by ID
  const deleteSnippet = (id) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };

  // Add a new snippet (prepends to array)
  const addSnippet = (newSnippet) => {
    setSnippets((prev) => [newSnippet, ...prev]);
  };

  // Update existing snippet
  const updateSnippet = (updated) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s)) // Replace matching snippet
    );
  };

  return (
    // Main container with theme-aware background
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      {/* Router outlet with shared context */}
      <Outlet
        context={{
          snippets,          // All snippets
          addSnippet,         // Add function
          updateSnippet,      // Update function
          deleteSnippet       // Delete function
        }}
      />
    </div>
  );
}