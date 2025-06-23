export default function AnimalTable({ animals, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Especie</th>
          <th>Raza</th>
          <th>Edad</th>
          <th>Salud</th>
          <th>Ingreso</th>
          <th>Adoptado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {animals.map((animal) => (
          <tr key={animal.id}>
            <td>{animal.name}</td>
            <td>{animal.species}</td>
            <td>{animal.breed}</td>
            <td>{animal.age}</td>
            <td>{animal.health}</td>
            <td>{animal.intake_date?.split("T")[0]}</td>
            <td>{animal.adopted === "Y" ? "Sí" : "No"}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(animal)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(animal.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
