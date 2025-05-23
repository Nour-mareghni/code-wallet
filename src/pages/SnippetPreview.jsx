// SnippetPreview component - Displays a read-only view of a code snippet
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

export default function SnippetPreview() {
  // Access data and routing utilities
  const { snippets } = useOutletContext(); // All snippets from context
  const { id } = useParams(); // Get snippet ID from URL params
  const navigate = useNavigate(); // Navigation function
  const [snippet, setSnippet] = useState(null); // Current snippet state

  // Effect to find and load the requested snippet
  useEffect(() => {
    const found = snippets.find((s) => s.id.toString() === id); // Find by ID
    if (found) {
      setSnippet(found); // Set if found
    } else {
      navigate("/"); // Redirect home if not found
    }
  }, [id, snippets, navigate]); // Re-run when these dependencies change

  // Return null while loading or if snippet not found (briefly before redirect)
  if (!snippet) return null;

  return (
    // Main container with flex layout
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 py-6">
      {/* Snippet title */}
      <h1 className="text-3xl font-bold mb-4 text-center">{snippet.title}</h1>

      {/* Code editor preview area */}
      <div className="flex-1 border rounded overflow-hidden">
        <CodeMirror
          value={snippet.code}         // Display snippet code
          height="75vh"               // Fixed viewport height
          theme={oneDark}             // Dark theme
          extensions={[javascript()]} // JavaScript syntax highlighting
          editable={false}            // Read-only mode
          basicSetup={{ lineNumbers: true }} // Show line numbers
        />
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)} // Go back in history
        className="mt-6 self-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        ← Back
      </button>
    </div>
  );
}