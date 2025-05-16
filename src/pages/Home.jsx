import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SnippetList from "../features/snippets/SnippetList";
import SnippetForm from "../features/snippets/SnippetForm";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const { snippets, addSnippet, updateSnippet } = useOutletContext();
  const [showForm, setShowForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };

  const handleTitleClick = () => {
    setShowForm(false);
    setEditingSnippet(null);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const text = await file.text();
    const title = file.name.replace(/\.[^/.]+$/, "");
    const ext = file.name.split(".").pop();

    const newSnippet = {
      id: Date.now(),
      title,
      code: text,
      tags: ["imported", ext],
    };

    addSnippet(newSnippet);
  };

  return (
    <div
      className={`p-6 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center relative ${
        isDragging ? "bg-blue-100 dark:bg-blue-900" : ""
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          <Link
            to="/"
            onClick={handleTitleClick}
            className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            💼 Code Wallet
          </Link>
        </h1>

        <div className="flex gap-4 items-center">
          <Link
            to="/tags"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Manage Tags
          </Link>
          <Link
            to="/search"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Search
          </Link>
          <ThemeToggle />
        </div>
      </div>

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-100/80 dark:bg-blue-900/80 flex items-center justify-center text-xl text-blue-700 dark:text-blue-300 font-semibold z-50 border-4 border-dashed border-blue-400 dark:border-blue-600 rounded">
          Drop your code file here...
        </div>
      )}

      {/* Empty state */}
      {snippets.length === 0 ? (
        <div className="text-center space-y-6">
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your wallet is empty 💸
          </p>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              ADD MORE FUNDS
            </button>
          ) : (
            <SnippetForm
              onAddSnippet={addSnippet}
              onUpdateSnippet={updateSnippet}
              editingSnippet={editingSnippet}
            />
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {showForm ? (
            <SnippetForm
              onAddSnippet={addSnippet}
              onUpdateSnippet={updateSnippet}
              editingSnippet={editingSnippet}
            />
          ) : (
            <button
              onClick={() => {
                setEditingSnippet(null);
                setShowForm(true);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 dark:hover:bg-blue-800 mb-4"
            >
              ADD MORE FUNDS
            </button>
          )}

          <SnippetList snippets={snippets} onEdit={handleEdit} />
        </div>
      )}
    </div>
  );
}
