// SnippetList component displays a list of code snippets with edit/delete/preview options
export default function SnippetList({ snippets, onEdit, onDelete }) {
  return (
    <div className="space-y-4 w-full">
      {/* Map through each snippet to render them */}
      {snippets.map((snippet) => (
        <div
          key={snippet.id} // Unique key for React reconciliation
          className="w-full bg-white dark:bg-[#333] text-[#333] dark:text-white border-l-4 border-[#9A48D0] dark:border-[#B288C0] p-5 rounded shadow-md transition"
        >
          {/* Snippet header with title and action buttons */}
          <div className="flex justify-between items-center mb-2">
            {/* Snippet title with theme-aware color */}
            <h2 className="text-xl font-semibold text-[#9A48D0] dark:text-[#B288C0]">
              {snippet.title}
            </h2>
            
            {/* Action buttons container */}
            <div className="space-x-2 text-sm">
              {/* Edit button */}
              <button
                onClick={() => onEdit(snippet)}
                className="text-[#7BC950] hover:underline"
              >
                ✏️ Edit
              </button>
              
              {/* Preview link */}
              <a
                href={`/preview/${snippet.id}`}
                className="text-[#7BC950] hover:underline"
              >
                👁 Preview
              </a>
              
              {/* Delete button */}
              <button
                onClick={() => onDelete(snippet.id)}
                className="text-red-500 hover:underline"
              >
                🗑 Delete
              </button>
            </div>
          </div>

          {/* Tags section */}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Tags:{" "}
            {/* Map through each tag to render as pill-shaped elements */}
            {snippet.tags.map((tag, i) => (
              <span
                key={i} // Using index as key since tags are simple strings
                className="inline-block bg-[#B288C0] text-white text-xs px-2 py-1 mr-2 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}