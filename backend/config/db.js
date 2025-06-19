const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


pool.getConnection()
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.error("Error al conectar a la base de datos:", err));

module.exports = pool;