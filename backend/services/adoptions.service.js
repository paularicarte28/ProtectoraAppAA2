const db = require("../config/db");

const getAllAdoptions = async () => {
  const [rows] = await db.query(`
    SELECT adoptions.*, 
           animals.name AS animal_name, 
           adopters.full_name AS adopter_name
    FROM adoptions
    JOIN animals ON adoptions.animal_id = animals.id
    JOIN adopters ON adoptions.adopter_id = adopters.id
  `);
  return rows;
};

const createAdoption = async ({ animal_id, adopter_id, adoption_date }) => {
  const [result] = await db.query(
    `INSERT INTO adoptions (animal_id, adopter_id, adoption_date)
     VALUES (?, ?, ?)`,
    [animal_id, adopter_id, adoption_date]
  );

  // Marcar animal como adoptado
  await db.query("UPDATE animals SET adopted = 'Y' WHERE id = ?", [animal_id]);

  return result.insertId;
};

const deleteAdoption = async (id) => {
  // Obtener animal_id antes de eliminar
  const [[adoption]] = await db.query("SELECT animal_id FROM adoptions WHERE id = ?", [id]);

  if (adoption) {
    // Marcar animal como no adoptado
    await db.query("UPDATE animals SET adopted = 'N' WHERE id = ?", [adoption.animal_id]);

    // Borrar la adopción
    await db.query("DELETE FROM adoptions WHERE id = ?", [id]);
  }
};

module.exports = {
  getAllAdoptions,
  createAdoption,
  deleteAdoption,
};
