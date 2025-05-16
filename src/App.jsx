import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  const [snippets, setSnippets] = useState([]);

  // Functions to add/update snippets
  const addSnippet = (newSnippet) => {
    setSnippets((prev) => [newSnippet, ...prev]);
  };

  const updateSnippet = (updated) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Outlet context={{ snippets, addSnippet, updateSnippet }} />
    </div>
  );
}
