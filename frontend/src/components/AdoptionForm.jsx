import { useState } from "react";
import { create } from "../utils/api";

export default function AdoptionForm({ animals, adopters, onSuccess }) {
  const [formData, setFormData] = useState({
    animal_id: "",
    adopter_id: "",
    adoption_date: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create("/adoptions", formData);
      setFormData({ animal_id: "", adopter_id: "", adoption_date: "" });
      onSuccess();
    } catch (err) {
      alert("Error al registrar adopción.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 mb-4">
      <div className="col-md-4">
        <select
          name="animal_id"
          className="form-select"
          value={formData.animal_id}
          onChange={handleChange}
          required
        >
          <option value="">🐶 Seleccionar animal</option>
          {animals.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <select
          name="adopter_id"
          className="form-select"
          value={formData.adopter_id}
          onChange={handleChange}
          required
        >
          <option value="">👤 Seleccionar adoptante</option>
          {adopters.map((a) => (
            <option key={a.id} value={a.id}>
              {a.full_name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <input
          type="date"
          name="adoption_date"
          className="form-control"
          value={formData.adoption_date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="col-md-1">
        <button type="submit" className="btn btn-success">
          Guardar
        </button>
      </div>
    </form>
  );
}
