document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("animal-form");
  const list = document.getElementById("animal-list");

  function loadAnimals() {
    apiFetch("/animals").then(data => {
      list.innerHTML = "";
      data.forEach(animal => {
        list.innerHTML += `
          <tr>
            <td>${animal.name}</td>
            <td>${animal.species}</td>
            <td>${animal.breed || ""}</td>
            <td>${animal.age || ""}</td>
            <td>${animal.health || ""}</td>
            <td>${animal.intake_date || ""}</td>
            <td>${animal.adopted}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" onclick='editAnimal(${JSON.stringify(animal)})'>Editar</button>
              <button class="btn btn-sm btn-danger" onclick='deleteAnimal(${animal.id})'>Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
  }

  window.editAnimal = (animal) => {
    for (const key in animal) {
      if (form[key]) form[key].value = animal[key];
    }
  };

  window.deleteAnimal = async (id) => {
    if (confirm("¿Seguro que querés eliminar este animal?")) {
      await apiFetch(`/animals/${id}`, "DELETE");
      loadAnimals();
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.age = data.age ? parseInt(data.age) : null;

    if (!data.name || !data.species) {
      alert("Los campos Nombre y Especie son obligatorios.");
      return;
    }

    const method = data.id ? "PUT" : "POST";
    const url = data.id ? `/animals/${data.id}` : "/animals";

    try {
      await apiFetch(url, method, data);
      form.reset();
      loadAnimals();
    } catch (err) {
      console.error("Error al guardar:", err.message);
      alert("Error: " + err.message);
    }
  });

  loadAnimals();
});