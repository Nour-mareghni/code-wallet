import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import SnippetPreview from "./pages/SnippetPreview.jsx";
import TagManager from "./pages/TagManager.jsx";
import "./index.css";
import SearchByTag from "./pages/SearchByTag.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="search" element={<SearchByTag />} />
    <Route path="tags" element={<TagManager />} />
    <Route path="preview/:id" element={<SnippetPreview />} />
  </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
