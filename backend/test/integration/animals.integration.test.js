const request = require("supertest");
const app = require("../../server");
const pool = require("../../config/db");

describe("Animals API", () => {
  test("GET /animals devuelve 200", async () => {
    const res = await request(app).get("/animals");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /animals responde 400 si faltan campos", async () => {
    const res = await request(app).post("/animals").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  test("POST /animals responde 201 si los datos son válidos", async () => {
    const res = await request(app).post("/animals").send({
      name: "Simba",
      species: "Gato",
      breed: "Siames",
      age: 2,
      health: "Bueno",
      intake_date: "2024-10-01",
      adopted: "N"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("DELETE /animals/:id responde 204", async () => {
    const crear = await request(app).post("/animals").send({
      name: "TempAnimal",
      species: "Perro",
      breed: "Mestizo",
      age: 1,
      health: "Bueno",
      intake_date: "2024-06-01",
      adopted: "N"
    });
    const id = crear.body.id;

    const eliminar = await request(app).delete(`/animals/${id}`);
    expect(eliminar.statusCode).toBe(204);
  });
});
afterAll(async () => {
  await pool.end();
});