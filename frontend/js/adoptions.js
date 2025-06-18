document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adoption-form");
  const animalSelect = document.getElementById("animal_id");
  const adopterSelect = document.getElementById("adopter_id");
  const table = document.getElementById("adoption-list");

  async function loadAnimals() {
    const animals = await apiFetch("/animals");
    animalSelect.innerHTML = '<option value="">🐶 Seleccionar animal</option>';
    animals
      .filter(a => a.adopted !== "Y")
      .forEach(animal => {
        const option = document.createElement("option");
        option.value = animal.id;
        option.textContent = `${animal.name} (${animal.species})`;
        animalSelect.appendChild(option);
      });
  }

  async function loadAdopters() {
    const adopters = await apiFetch("/adopters");
    adopterSelect.innerHTML = '<option value="">👤 Seleccionar adoptante</option>';
    adopters.forEach(adopter => {
      const option = document.createElement("option");
      option.value = adopter.id;
      option.textContent = adopter.full_name;
      adopterSelect.appendChild(option);
    });
  }

  async function loadAdoptions() {
    const adoptions = await apiFetch("/adoptions");
    table.innerHTML = "";
    adoptions.forEach(a => {
      table.innerHTML += `
        <tr>
          <td>${a.animal_name}</td>
          <td>${a.adopter_name}</td>
          <td>${a.adoption_date}</td>
          <td>
            <button class="btn btn-sm btn-danger" onclick="deleteAdoption(${a.id})">Eliminar</button>
          </td>
        </tr>
      `;
    });
  }

  window.deleteAdoption = async (id) => {
    if (confirm("¿Eliminar esta adopción?")) {
      await apiFetch(`/adoptions/${id}`, "DELETE");
      await loadAnimals(); // actualizar lista de no adoptados
      loadAdoptions();
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    await apiFetch("/adoptions", "POST", data);

    // marcar animal como adoptado
    await apiFetch(`/animals/${data.animal_id}`, "PUT", {
      ...data,
      adopted: "Y",
    });

    form.reset();
    await loadAnimals();
    loadAdoptions();
  });

  // Inicializar todo
  loadAnimals();
  loadAdopters();
  loadAdoptions();
});
