// App.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [snippets, setSnippets] = useState([]);

  const addSnippet = (snippet) => {
    setSnippets((prev) => [snippet, ...prev]);
  };

  const updateSnippet = (updated) => {
    setSnippets((prev) =>
      prev.map((s) => (s.id === updated.id ? updated : s))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Outlet context={{ snippets, addSnippet, updateSnippet }} />
    </div>
  );
}
