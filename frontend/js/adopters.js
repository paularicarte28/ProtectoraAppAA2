document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("adopter-form");
  const list = document.getElementById("adopter-list");

  function loadAdopters() {
    apiFetch("/adopters").then(data => {
      list.innerHTML = "";
      data.forEach(adopter => {
        list.innerHTML += `
          <tr>
            <td>${adopter.full_name}</td>
            <td>${adopter.address || ""}</td>
            <td>${adopter.phone || ""}</td>
            <td>${adopter.email || ""}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1" onclick='editAdopter(${JSON.stringify(adopter)})'>Editar</button>
              <button class="btn btn-sm btn-danger" onclick='deleteAdopter(${adopter.id})'>Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
  }

  window.editAdopter = (adopter) => {
    for (const key in adopter) {
      if (form[key]) form[key].value = adopter[key];
    }
  };

  window.deleteAdopter = async (id) => {
    if (confirm("¿Seguro que querés eliminar este adoptante?")) {
      await apiFetch(`/adopters/${id}`, "DELETE");
      loadAdopters();
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    if (!data.full_name) {
      alert("El campo 'Nombre completo' es obligatorio.");
      return;
    }

    const method = data.id ? "PUT" : "POST";
    const url = data.id ? `/adopters/${data.id}` : "/adopters";

    try {
      await apiFetch(url, method, data);
      form.reset();
      loadAdopters();
    } catch (err) {
      console.error("Error al guardar:", err.message);
      alert("Error: " + err.message);
    }
  });

  loadAdopters();
});
