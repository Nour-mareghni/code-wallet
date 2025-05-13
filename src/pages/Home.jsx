import { useState } from "react";
import SnippetList from "../features/snippets/SnippetList";
import SnippetForm from "../features/snippets/SnippetForm";
import { Link } from "react-router-dom";

export default function Home() {
  const [snippets, setSnippets] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addSnippet = (newSnippet) => {
    setSnippets((prev) => [newSnippet, ...prev]);
    setShowForm(false); // hide form after adding
  };

  const handleTitleClick = () => {
  setShowForm(false); // Hide the form
};


  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
<h1 className="text-4xl font-bold mb-8 text-center">
  <Link
    to="/"
    onClick={() => setShowForm(false)}
    className="hover:underline hover:text-blue-600 transition"
  >
    💼 Code Wallet
  </Link>
</h1>






      {snippets.length === 0 ? (
        <div className="text-center space-y-6">
          <p className="text-xl text-gray-600">Your wallet is empty 💸</p>
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
            >
              ADD MORE FUNDS
            </button>
          ) : (
            <SnippetForm onAddSnippet={addSnippet} />
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {showForm ? (
            <SnippetForm onAddSnippet={addSnippet} />
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 mb-4"
            >
              ADD MORE FUNDS
            </button>
          )}

          <SnippetList snippets={snippets} />
        </div>
      )}
    </div>
  );
}
