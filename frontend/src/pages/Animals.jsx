import { useEffect, useState } from "react";
import AnimalForm from "../components/AnimalForm";
import AnimalTable from "../components/AnimalTable";
import { getAnimals, createAnimal, updateAnimal, deleteAnimal } from "../utils/api";

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [error, setError] = useState(null);

  const loadAnimals = async () => {
    try {
      const data = await getAnimals();
      setAnimals(data);
    } catch (err) {
      setError("Error al cargar los animales");
    }
  };

  const handleSave = async (animal) => {
    try {
      if (animal.id) {
        await updateAnimal(animal.id, animal);
      } else {
        await createAnimal(animal);
      }
      setEditingAnimal(null);
      await loadAnimals();
    } catch (err) {
      setError("Error al guardar el animal");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este animal?")) {
      try {
        await deleteAnimal(id);
        await loadAnimals();
      } catch (err) {
        setError("Error al eliminar el animal");
      }
    }
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">🐶 Gestión de Animales</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <AnimalForm
        animal={editingAnimal}
        onSave={handleSave}
        onReset={() => setEditingAnimal(null)}
      />

      <AnimalTable
        animals={animals}
        onEdit={setEditingAnimal}
        onDelete={handleDelete}
      />
    </div>
  );
}
