// Info component - Displays application information and features
import { Link } from "react-router-dom";

export default function Info() {
  return (
    // Main container with theme-aware background and text colors
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-mono">
      {/* Content container with max width and spacing */}
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Page heading with accent color */}
        <h1 className="text-3xl font-bold text-[#9A48D0]">
          💼 About Code Wallet
        </h1>

        {/* Brief description of the app */}
        <p>
          Code Wallet is a lightweight app to manage and organize your personal code snippets
          with ease. It runs completely in your browser using local storage.
        </p>

        {/* Feature list with icons */}
        <ul className="list-disc list-inside">
          <li>📝 Add, edit, and delete code snippets</li>
          <li>🏷 Reuse tags across snippets for better organization</li>
          <li>📁 Drag and drop code files to import them automatically</li>
          <li>🌙 Dark/light theme toggle built-in</li>
          <li>🔍 Filter snippets by tags using the search page</li>
          <li>💾 Data is saved locally in your browser</li>
        </ul>

        {/* Navigation back to home */}
        <p className="pt-4">
          Want to go back?{" "}
          <Link 
            to="/" 
            className="text-blue-600 dark:text-blue-400 underline"
          >
            Return to Home
          </Link>
        </p>
      </div>
    </div>
  );
}