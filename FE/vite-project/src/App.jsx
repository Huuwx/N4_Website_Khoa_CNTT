// src/App.jsx
import { Routes, Route } from "react-router-dom";
import DanhMucPage from "./pages/DanhMucPage";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<DanhMucPage />} />
      </Routes>
    </div>
  );
}