import { useEffect, useState } from "react";

export default function AnimalForm({ animal, onSave, onReset }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    health: "",
    intake_date: "",
    adopted: "N",
  });

  useEffect(() => {
    if (animal) {
      setFormData({ ...animal });
    } else {
      setFormData({
        name: "",
        species: "",
        breed: "",
        age: "",
        health: "",
        intake_date: "",
        adopted: "N",
      });
    }
  }, [animal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <form className="row g-3 mb-3" onSubmit={handleSubmit} onReset={handleReset}>
      <input type="hidden" name="id" value={formData.id || ""} />

      <div className="col-md-2">
        <input required name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Nombre" />
      </div>

      <div className="col-md-2">
        <input required name="species" value={formData.species} onChange={handleChange} className="form-control" placeholder="Especie" />
      </div>

      <div className="col-md-2">
        <input name="breed" value={formData.breed} onChange={handleChange} className="form-control" placeholder="Raza" />
      </div>

      <div className="col-md-1">
        <input type="number" name="age" value={formData.age} onChange={handleChange} className="form-control" placeholder="Edad" />
      </div>

      <div className="col-md-2">
        <input name="health" value={formData.health} onChange={handleChange} className="form-control" placeholder="Salud" />
      </div>

      <div className="col-md-2">
        <input type="date" name="intake_date" value={formData.intake_date?.split("T")[0] || ""} onChange={handleChange} className="form-control" />
      </div>

      <div className="col-md-1">
        <select name="adopted" value={formData.adopted} onChange={handleChange} className="form-select">
          <option value="N">No</option>
          <option value="Y">Sí</option>
        </select>
      </div>

      <div className="col-md-12">
        <button className="btn btn-primary" type="submit">Guardar</button>
        <button className="btn btn-secondary ms-2" type="reset">Limpiar</button>
      </div>
    </form>
  );
}
