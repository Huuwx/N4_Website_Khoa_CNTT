// src/App.jsx
import { Routes, Route } from "react-router-dom";
import DanhMucPage from "./pages/DanhMucPage";
import LienHeTable from "./components/LienHeTable";
import LienHeForm from "./components/LienHeForm";
import LienHeDetail from "./components/LienHeDetail";
import LienHeDetailWD from "./components/LienHeDetailWD";

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<LienHeForm />} />
        <Route path="/lienhe" element={<LienHeTable />} />
        <Route path="/lienhe/:id" element={<LienHeDetail />} />
      </Routes>
    </div>
  );
}