import { useEffect, useState } from "react";
import apiFetch from "../utils/api";
import AdopterForm from "../components/AdopterForm";
import AdopterTable from "../components/AdopterTable";

export default function Adopters() {
  const [adopters, setAdopters] = useState([]);
  const [form, setForm] = useState({
    id: "",
    full_name: "",
    address: "",
    phone: "",
    email: "",
  });

  const loadAdopters = async () => {
    const data = await apiFetch("/adopters");
    setAdopters(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const endpoint = form.id ? `/adopters/${form.id}` : "/adopters";
    await apiFetch(endpoint, method, form);
    setForm({ id: "", full_name: "", address: "", phone: "", email: "" });
    loadAdopters();
  };

  const handleEdit = (a) => setForm(a);
  const handleDelete = async (id) => {
    if (confirm("¿Eliminar adoptante?")) {
      await apiFetch(`/adopters/${id}`, "DELETE");
      loadAdopters();
    }
  };

  useEffect(() => {
    loadAdopters();
  }, []);

  return (
    <div>
      <h3>👤 Gestión de Adoptantes</h3>
      <AdopterForm form={form} setForm={setForm} onSubmit={handleSubmit} />
      <AdopterTable adopters={adopters} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
