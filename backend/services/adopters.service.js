const db = require("../config/db");

const getAllAdopters = async () => {
  const [rows] = await db.query("SELECT * FROM adopters");
  return rows;
};

const getAdopterById = async (id) => {
  const [rows] = await db.query("SELECT * FROM adopters WHERE id = ?", [id]);
  return rows[0];
};

const createAdopter = async (data) => {
  const { full_name, address, phone, email } = data;
  const [result] = await db.query(
    `INSERT INTO adopters (full_name, address, phone, email)
     VALUES (?, ?, ?, ?)`,
    [full_name, address, phone, email]
  );
  return result.insertId;
};

const updateAdopter = async (id, data) => {
  const { full_name, address, phone, email } = data;
  await db.query(
    `UPDATE adopters SET full_name=?, address=?, phone=?, email=? WHERE id=?`,
    [full_name, address, phone, email, id]
  );
};

const deleteAdopter = async (id) => {
  await db.query("DELETE FROM adopters WHERE id = ?", [id]);
};

module.exports = {
  getAllAdopters,
  getAdopterById,
  createAdopter,
  updateAdopter,
  deleteAdopter,
};
