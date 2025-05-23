import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SnippetList from "../features/snippets/SnippetList";
import SnippetForm from "../features/snippets/SnippetForm";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  // Access shared state and functions from router context
  const { snippets, addSnippet, updateSnippet, deleteSnippet } = useOutletContext();
  
  // Component state management
  const [showInfo, setShowInfo] = useState(false); // Unused in current implementation
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [editingSnippet, setEditingSnippet] = useState(null); // Currently edited snippet
  const [isDragging, setIsDragging] = useState(false); // Drag-and-drop state

  // Handle snippet editing
  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setShowForm(true);
  };

  // Reset form state when clicking the title
  const handleTitleClick = () => {
    setShowForm(false);
    setEditingSnippet(null);
  };

  // Handle file drop for importing snippets
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    // Process dropped file
    const text = await file.text();
    const title = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
    const ext = file.name.split(".").pop(); // Get file extension

    // Create new snippet from file
    const newSnippet = {
      id: Date.now(),
      title,
      code: text,
      tags: ["imported", ext], // Default tags
    };

    addSnippet(newSnippet);
  };

  return (
    <div
      className={`p-6 min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center relative ${
        isDragging ? "bg-blue-100 dark:bg-blue-900" : "" // Visual feedback for drag state
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* Info link (currently unused but preserved in structure) */}
      <Link
        to="/info"
        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <button>ℹ️ Info</button>
      </Link>

      {/* Main header section */}
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

        {/* Navigation and theme controls */}
        <div className="flex items-center">
          <Link
            to="/tags"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            .     Manage Tags
          </Link>
          <Link
            to="/search"
            className="ml-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            .       Search
          </Link>
          <div className="m-6">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Drag overlay (visible during file drag) */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-100/80 dark:bg-blue-900/80 flex items-center justify-center text-xl text-blue-700 dark:text-blue-300 font-semibold z-50 border-4 border-dashed border-blue-400 dark:border-blue-600 rounded">
          Drop your code file here...
        </div>
      )}

      {/* Conditional rendering based on snippet count */}
      {snippets.length === 0 ? (
        // Empty state UI
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
        // Non-empty state UI
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

          <SnippetList
            snippets={snippets}
            onEdit={handleEdit}
            onDelete={deleteSnippet}
          />
        </div>
      )}
    </div>
  );
}