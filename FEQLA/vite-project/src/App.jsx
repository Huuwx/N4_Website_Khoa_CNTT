import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Config from "./pages/Config";

function App() {
    return (
        <div className="container mx-auto p-4">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/config" element={<Config />} />
            </Routes>
        </div>
    );
}

export default App;
