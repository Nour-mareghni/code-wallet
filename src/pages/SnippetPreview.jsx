import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";


export default function SnippetPreview() {
  const { snippets } = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [snippet, setSnippet] = useState(null);

  useEffect(() => {
    const found = snippets.find((s) => s.id.toString() === id);
    if (found) setSnippet(found);
    else navigate("/");
  }, [id, snippets, navigate]);

  if (!snippet) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{snippet.title}</h1>

      {/* Code editor preview area */}
    <div className="flex-1 border rounded overflow-hidden">
      <CodeMirror
        value={snippet.code}
        height="75vh"
        theme={oneDark}
        extensions={[javascript()]}
        editable={false}               // read-only
        basicSetup={{ lineNumbers: true }}
      />
    </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 self-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        ← Back
      </button>
    </div>
  );
}
