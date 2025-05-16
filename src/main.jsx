import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import TagManager from "./pages/TagManager.jsx"; // ✅ Add this
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tags" element={<TagManager />} /> {/* ✅ Add this */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
