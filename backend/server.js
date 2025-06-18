const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const db = new sqlite3.Database("db.sqlite");

app.use(cors());
app.use(bodyParser.json());

// ───── Tablas ──────────────────────────────

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS animals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      adopted TEXT DEFAULT 'N'
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS adopters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS adoptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      animal_id INTEGER NOT NULL,
      adopter_id INTEGER NOT NULL,
      adoption_date TEXT NOT NULL,
      FOREIGN KEY (animal_id) REFERENCES animals(id),
      FOREIGN KEY (adopter_id) REFERENCES adopters(id)
    )`);
});


//GET ALL
app.get("/animals", (req, res) => {
  db.all("SELECT * FROM animals", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//POST ANIMALS

app.post("/animals", (req, res) => {
  const { name, species, adopted } = req.body;
  if (!name || !species)
    return res.status(400).json({ error: "Nombre y especie obligatorios" });

  db.run(
    "INSERT INTO animals (name, species, adopted) VALUES (?, ?, ?)",
    [name, species, adopted || "N"],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

//UPDATE ANIMALS

app.put("/animals/:id", (req, res) => {
  const { id } = req.params;
  const { name, species, adopted } = req.body;

  db.run(
    "UPDATE animals SET name = ?, species = ?, adopted = ? WHERE id = ?",
    [name, species, adopted, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(204).end();
    }
  );
});

//DELETE ANIMALS

app.delete("/animals/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM animals WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

// GET ADOPTERS
app.get("/adopters", (req, res) => {
  db.all("SELECT * FROM adopters", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// POST ADOPTERS
app.post("/adopters", (req, res) => {
  const { full_name, email } = req.body;
  if (!full_name || !email)
    return res.status(400).json({ error: "Nombre y email obligatorios" });

  db.run(
    "INSERT INTO adopters (full_name, email) VALUES (?, ?)",
    [full_name, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// UPDATE ADOPTERS

app.put("/adopters/:id", (req, res) => {
  const { id } = req.params;
  const { full_name, email } = req.body;

  db.run(
    "UPDATE adopters SET full_name = ?, email = ? WHERE id = ?",
    [full_name, email, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(204).end();
    }
  );
});

// DELETE ADOPTERS
app.delete("/adopters/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM adopters WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).end();
  });
});

// GET ALL ADOPTIONS

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

//POST ADOPTIONS
app.post("/adoptions", (req, res) => {
  const { animal_id, adopter_id, adoption_date } = req.body;

  db.get("SELECT adopted FROM animals WHERE id = ?", [animal_id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row)
      return res.status(404).json({ error: "Animal no encontrado" });

    if (row.adopted === "Y")
      return res.status(400).json({ error: "Este animal ya ha sido adoptado" });

    db.run(
      "INSERT INTO adoptions (animal_id, adopter_id, adoption_date) VALUES (?, ?, ?)",
      [animal_id, adopter_id, adoption_date],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        db.run(
          "UPDATE animals SET adopted = 'Y' WHERE id = ?",
          [animal_id],
          (err2) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.status(201).json({ id: this.lastID });
          }
        );
      }
    );
  });
});

//DELETE ADOPTIONS
app.delete("/adoptions/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT animal_id FROM adoptions WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row)
      return res.status(404).json({ error: "Adopción no encontrada" });

    const animalId = row.animal_id;

    db.run("DELETE FROM adoptions WHERE id = ?", [id], function (err2) {
      if (err2) return res.status(500).json({ error: err2.message });

      db.run(
        "UPDATE animals SET adopted = 'N' WHERE id = ?",
        [animalId],
        function (err3) {
          if (err3) return res.status(500).json({ error: err3.message });
          res.status(204).end();
        }
      );
    });
  });
});

app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});