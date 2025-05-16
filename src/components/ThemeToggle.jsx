import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-1 rounded text-sm hover:opacity-80 transition"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
