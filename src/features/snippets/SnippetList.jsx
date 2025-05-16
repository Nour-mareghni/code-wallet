import { Link } from "react-router-dom";

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
            <div className="space-x-2">
              <Link
                to={`/preview/${snippet.id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                👁 Preview
              </Link>
              <button
                onClick={() => onEdit(snippet)}
                className="text-green-600 text-sm hover:underline"
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
