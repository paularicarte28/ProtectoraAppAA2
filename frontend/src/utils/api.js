const API = import.meta.env.VITE_API || "http://localhost:3001";


export async function getAnimals() {
  const res = await fetch(`${API}/animals`);
  return res.json();
}

export async function createAnimal(data) {
  const res = await fetch(`${API}/animals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateAnimal(id, data) {
  const res = await fetch(`${API}/animals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteAnimal(id) {
  await fetch(`${API}/animals/${id}`, {
    method: "DELETE",
  });
}


export async function getAdopters() {
  const res = await fetch(`${API}/adopters`);
  return res.json();
}

export async function createAdopter(data) {
  const res = await fetch(`${API}/adopters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateAdopter(id, data) {
  const res = await fetch(`${API}/adopters/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteAdopter(id) {
  await fetch(`${API}/adopters/${id}`, {
    method: "DELETE",
  });
}


export async function getAdoptions() {
  const res = await fetch(`${API}/adoptions`);
  return res.json();
}

export async function createAdoption(data) {
  const res = await fetch(`${API}/adoptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteAdoption(id) {
  await fetch(`${API}/adoptions/${id}`, {
    method: "DELETE",
  });
}
