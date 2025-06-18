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

    const errorDiv = document.getElementById("adopter-errors");
    if (errorDiv) errorDiv.remove();

    const method = data.id ? "PUT" : "POST";
    const url = data.id ? `/adopters/${data.id}` : "/adopters";

    try {
      await apiFetch(url, method, data);
      form.reset();
      loadAdopters();
    } catch (err) {
      const container = document.createElement("div");
      container.id = "adopter-errors";
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

  loadAdopters();
});
