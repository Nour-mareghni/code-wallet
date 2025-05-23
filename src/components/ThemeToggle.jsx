// Import React hooks for state and side effects
import { useEffect, useState } from "react";

// ThemeToggle component to switch between light/dark themes
export default function ThemeToggle() {
  // State to track dark mode, initialized from localStorage (or defaults to false)
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark" // Check if saved theme is "dark"
  );

  // Effect to apply theme changes to the DOM and localStorage
  useEffect(() => {
    const root = document.documentElement; // Get the root HTML element
    if (isDark) {
      root.classList.add("dark"); // Add 'dark' class for dark mode
      localStorage.setItem("theme", "dark"); // Save preference
    } else {
      root.classList.remove("dark"); // Remove 'dark' class for light mode
      localStorage.setItem("theme", "light"); // Save preference
    }
  }, [isDark]); // Re-run when `isDark` changes

  // Render a toggle button with dynamic styles and icons
  return (
    <button
      onClick={() => setIsDark((prev) => !prev)} // Toggle state on click
      className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-1 rounded text-sm hover:opacity-80 transition"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"} // Show sun/moon icon based on theme
    </button>
  );
}