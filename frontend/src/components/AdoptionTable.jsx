export default function AdoptionTable({ adoptions, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Animal</th>
          <th>Adoptante</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {adoptions.map((a) => (
          <tr key={a.id}>
            <td>{a.animal_name}</td>
            <td>{a.adopter_name}</td>
            <td>{a.adoption_date?.split("T")[0]}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(a.id)}
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
