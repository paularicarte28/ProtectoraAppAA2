const request = require("supertest");
const app = require("../../server");
const pool = require("../../config/db");

describe("Adoptions API", () => {
  let testAnimalId, testAdopterId;

  beforeAll(async () => {
    const animalRes = await request(app).post("/animals").send({
      name: "Luna",
      species: "Perro",
      adopted: "N"
    });
    testAnimalId = animalRes.body.id;

    const adopterRes = await request(app).post("/adopters").send({
      full_name: "Carlos Ruiz",
      email: "carlos@example.com"
    });
    testAdopterId = adopterRes.body.id;
  });

  test("GET /adoptions devuelve 200", async () => {
    const res = await request(app).get("/adoptions");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /adoptions responde 400 si faltan datos", async () => {
    const res = await request(app).post("/adoptions").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  test("POST /adoptions responde 201 si todo es correcto", async () => {
    const res = await request(app).post("/adoptions").send({
      animal_id: testAnimalId,
      adopter_id: testAdopterId,
      adoption_date: "2025-06-19"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("No permite adoptar un animal ya adoptado", async () => {
    const res = await request(app).post("/adoptions").send({
      animal_id: testAnimalId,
      adopter_id: testAdopterId,
      adoption_date: "2025-06-19"
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/ya ha sido adoptado/i);
  });
});

afterAll(async () => {
  await pool.end();
});