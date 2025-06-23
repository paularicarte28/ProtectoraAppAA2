export default function AdopterTable({ adopters, onEdit, onDelete }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {adopters.map((a) => (
          <tr key={a.id}>
            <td>{a.full_name}</td>
            <td>{a.address}</td>
            <td>{a.phone}</td>
            <td>{a.email}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-1"
                onClick={() => onEdit(a)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
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
