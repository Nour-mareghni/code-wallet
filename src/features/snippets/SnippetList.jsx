export default function SnippetList({ snippets, onEdit }) {
  if (!snippets || snippets.length === 0) return null;

  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <div key={snippet.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{snippet.title}</h3>
          <pre className="bg-gray-100 p-2 mt-2 rounded text-sm overflow-x-auto">
            {snippet.code}
          </pre>
          <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
            <div>Tags: {snippet.tags.join(", ")}</div>
            <button
              onClick={() => onEdit(snippet)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
