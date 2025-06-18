const db = require("../config/db");
const pool = require("../config/db");

const getAllAnimals = async () => {
  const [rows] = await db.query("SELECT * FROM animals");
  return rows;
};

const getAnimalById = async (id) => {
  const [rows] = await db.query("SELECT * FROM animals WHERE id = ?", [id]);
  return rows[0];
};

const createAnimal = async (data) => {
  const { name, species, breed, age, health, intake_date, adopted } = data;
  const [result] = await db.query(
    `INSERT INTO animals (name, species, breed, age, health, intake_date, adopted)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, species, breed, age, health, intake_date, adopted || "N"]
  );
  return result.insertId;
};

const updateAnimal = async (id, data) => {
  const fields = [];
  const values = [];

  for (const key in data) {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  }

  const sql = `UPDATE animals SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  await pool.query(sql, values);
};

const deleteAnimal = async (id) => {
  await db.query("DELETE FROM animals WHERE id = ?", [id]);
};

module.exports = {
  getAllAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
