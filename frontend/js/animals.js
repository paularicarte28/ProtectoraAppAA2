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

    const errorDiv = document.getElementById("animal-errors");
    if (errorDiv) errorDiv.remove();

    try {
      await apiFetch("/animals", "POST", data);
      form.reset();
      loadAnimals();
    } catch (err) {
      const container = document.createElement("div");
      container.id = "animal-errors";
      container.className = "alert alert-danger mt-2";

      try {
        const parsed = JSON.parse(err.message);
        if (parsed.errors) {
          container.innerHTML = parsed.errors.map(e => `<div>${e.msg}</div>`).join("");
        } else {
          container.textContent = parsed.error || "Error desconocido.";
        }
      } catch {
        container.textContent = "Error inesperado.";
      }

      form.after(container);
    }
  });


  loadAnimals();
});