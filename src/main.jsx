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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="tags" element={<TagManager />} />
    <Route path="search" element={<SearchByTag />} />
    <Route path="preview/:id" element={<SnippetPreview />} />
    <Route path="info" element={<Info />} /> {/* Add this line */}
  </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
