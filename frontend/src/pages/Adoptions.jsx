import { useEffect, useState } from "react";
import AdoptionForm from "../components/AdoptionForm";
import AdoptionTable from "../components/AdoptionTable";
import { getAll, remove } from "../utils/api";

export default function Adoptions() {
  const [adoptions, setAdoptions] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [adopters, setAdopters] = useState([]);

  const loadData = async () => {
    setAdoptions(await getAll("/adoptions"));
    setAnimals(await getAll("/animals"));
    setAdopters(await getAll("/adopters"));
  };

  const handleDelete = async (id) => {
    await remove(`/adoptions/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🏡 Registrar Adopción</h2>
      <AdoptionForm animals={animals} adopters={adopters} onSuccess={loadData} />
      <h4 className="mt-4">📋 Adopciones registradas</h4>
      <AdoptionTable adoptions={adoptions} onDelete={handleDelete} />
    </div>
  );
}
