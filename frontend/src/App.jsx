import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Animals from "./pages/Animals";
import Adopters from "./pages/Adopters";
import Adoptions from "./pages/Adoptions";

export default function App() {
  return (
    <Router>
      <div className="container py-4">
        <nav className="mb-4 d-flex justify-content-between align-items-center">
          <h2>🐾 Protectora de Animales</h2>
          <div>
            <Link to="/" className="btn btn-outline-secondary me-2">
              <i className="bi bi-paw"></i> Animales
            </Link>
            <Link to="/adopters" className="btn btn-outline-primary me-2">
              <i className="bi bi-person"></i> Adoptantes
            </Link>
            <Link to="/adoptions" className="btn btn-outline-success">
              <i className="bi bi-house-door"></i> Adopciones
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Animals />} />
          <Route path="/adopters" element={<Adopters />} />
          <Route path="/adoptions" element={<Adoptions />} />
        </Routes>
      </div>
    </Router>
  );
}
