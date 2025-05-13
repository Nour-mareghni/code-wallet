export default function SnippetList({ snippets }) {
  if (!snippets.length) {
    return <div className="bg-white p-4 rounded shadow">No snippets yet.</div>;
  }

  return (
    <div className="space-y-4">
      {snippets.map(snippet => (
        <div
          key={snippet.id}
          className="bg-white p-4 rounded shadow border"
        >
          <h3 className="font-semibold text-lg">{snippet.title}</h3>
          <pre className="bg-gray-100 p-2 mt-2 rounded overflow-auto text-sm">
            <code>{snippet.code}</code>
          </pre>
          {snippet.tags.length > 0 && (
            <div className="mt-2 text-sm text-gray-600">
              Tags: {snippet.tags.join(", ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
