export default function AdopterForm({ form, setForm, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="row g-3 mb-3">
      <input type="hidden" value={form.id || ""} />
      <div className="col-md-3">
        <input
          required
          className="form-control"
          placeholder="Nombre completo"
          value={form.full_name || ""}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Dirección"
          value={form.address || ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>
      <div className="col-md-2">
        <input
          className="form-control"
          placeholder="Teléfono"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="col-md-3">
        <input
          className="form-control"
          placeholder="Correo electrónico"
          value={form.email || ""}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div className="col-md-1">
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
}
