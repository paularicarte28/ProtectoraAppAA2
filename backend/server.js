const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./db.sqlite");


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    age INTEGER,
    health TEXT,
    intake_date TEXT,
    adopted TEXT DEFAULT 'N'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS adopters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    email TEXT UNIQUE
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS adoptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  animal_id INTEGER NOT NULL,
  adopter_id INTEGER NOT NULL,
  adoption_date TEXT NOT NULL,
  FOREIGN KEY (animal_id) REFERENCES animals(id),
  FOREIGN KEY (adopter_id) REFERENCES adopters(id)
)`);

});

//ANIMALES
// GET 
app.get("/animals", (req, res) => {
  db.all("SELECT * FROM animals", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST 
app.post("/animals", (req, res) => {
  const { name, species, breed, age, health, intake_date, adopted } = req.body;
  db.run(
    `INSERT INTO animals (name, species, breed, age, health, intake_date, adopted)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, species, breed, age, health, intake_date, adopted || 'N'],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// PUT 
app.put("/animals/:id", (req, res) => {
  const { id } = req.params;
  const { name, species, breed, age, health, intake_date, adopted } = req.body;
  db.run(
    `UPDATE animals SET name=?, species=?, breed=?, age=?, health=?, intake_date=?, adopted=? WHERE id=?`,
    [name, species, breed, age, health, intake_date, adopted, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE 
app.delete("/animals/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM animals WHERE id=?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

//  Adoptantes 

// GET 
app.get("/adopters", (req, res) => {
  db.all("SELECT * FROM adopters", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST 
app.post("/adopters", (req, res) => {
  const { full_name, address, phone, email } = req.body;
  db.run(
    `INSERT INTO adopters (full_name, address, phone, email)
     VALUES (?, ?, ?, ?)`,
    [full_name, address, phone, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// PUT 
app.put("/adopters/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, address, phone, email } = req.body;
  db.run(
    `UPDATE adopters SET full_name=?, address=?, phone=?, email=? WHERE id=?`,
    [full_name, address, phone, email, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE 
app.delete("/adopters/:id", (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM adopters WHERE id=?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});


//ADOPTIONS

//GET
app.get("/adoptions", (req, res) => {
  db.all(
    `SELECT adoptions.id, animals.name AS animal_name, adopters.full_name AS adopter_name, adoption_date
     FROM adoptions
     JOIN animals ON animals.id = adoptions.animal_id
     JOIN adopters ON adopters.id = adoptions.adopter_id`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});


app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});