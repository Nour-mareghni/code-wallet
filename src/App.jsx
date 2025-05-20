// App.jsx
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";


export default function App() {
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem("snippets");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to localStorage whenever snippets change
  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);
  const deleteSnippet = (id) => {
    setSnippets((prev) => prev.filter((s) => s.id !== id));
  };
  const addSnippet = (newSnippet) => {
    setSnippets((prev) => [newSnippet, ...prev]);
  };

  const updateSnippet = (updated) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <Outlet context={{ snippets, addSnippet, updateSnippet, deleteSnippet }} />
      
    </div>
  );
}
