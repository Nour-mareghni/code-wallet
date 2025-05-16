export default function SnippetList({ snippets, onEdit }) {
  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="bg-white p-4 rounded shadow border border-gray-200"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">{snippet.title}</h2>
            <button
              onClick={() => onEdit(snippet)}
              className="text-sm text-blue-600 hover:underline"
            >
              ✏️ Edit
            </button>
          </div>

          <pre className="bg-gray-100 p-2 rounded overflow-x-auto text-sm font-mono">
            {snippet.code}
          </pre>

          {snippet.tags?.length > 0 && (
            <div className="mt-2 text-xs text-gray-500">
              Tags: {snippet.tags.join(", ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
