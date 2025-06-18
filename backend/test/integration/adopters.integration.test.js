const request = require("supertest");
const app = require("../../server");

describe("Adopters API", () => {
  test("GET /adopters devuelve 200", async () => {
    const res = await request(app).get("/adopters");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /adopters responde 400 si faltan campos", async () => {
    const res = await request(app).post("/adopters").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  test("POST /adopters responde 201 si los datos son válidos", async () => {
    const res = await request(app).post("/adopters").send({
      full_name: "María López",
      address: "Calle Mayor 5",
      phone: "600000000",
      email: "maria@example.com"
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test("DELETE /adopters/:id responde 204", async () => {
    const crear = await request(app).post("/adopters").send({
      full_name: "Temp User",
      address: "Temporal",
      phone: "000000000",
      email: "temp@example.com"
    });
    const id = crear.body.id;

    
    const eliminar = await request(app).delete(`/adopters/${id}`);
    expect(eliminar.statusCode).toBe(204);
  });
});
