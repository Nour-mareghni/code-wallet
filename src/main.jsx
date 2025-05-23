// Main application entry point and routing configuration
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import SnippetPreview from "./pages/SnippetPreview.jsx";
import TagManager from "./pages/TagManager.jsx";
import "./index.css";
import SearchByTag from "./pages/SearchByTag.jsx";
import Info from "./pages/Info.jsx";

// Create React root and render application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* HashRouter for client-side routing with hash-based navigation */}
    <HashRouter>
      {/* Routes container for all route definitions */}
      <Routes>
        {/* Main App component as layout route */}
        <Route path="/" element={<App />}>
          {/* Index route (default/home page) */}
          <Route index element={<Home />} />
          
          {/* Tag management route */}
          <Route path="tags" element={<TagManager />} />
          
          {/* Search by tag route */}
          <Route path="search" element={<SearchByTag />} />
          
          {/* Snippet preview route with dynamic ID parameter */}
          <Route path="preview/:id" element={<SnippetPreview />} />
          
          {/* Application information page */}
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);