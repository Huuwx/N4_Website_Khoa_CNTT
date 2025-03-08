// src/App.jsx
import { Routes, Route } from "react-router-dom";
import DanhMucPage from "./pages/DanhMucPage";
import LienHeTable from "./components/LienHeTable";
import LienHeForm from "./components/LienHeForm";
import LienHeDetailWD from "./components/LienHeDetailWD";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<LienHeForm />} />
      </Routes>
    </div>
  );
}