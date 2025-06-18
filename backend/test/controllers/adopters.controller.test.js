const {
  getAnimals,
  getAnimal,
  createAnimal,
  deleteAnimal,
} = require("../../controllers/animals.controller");

const animalService = require("../../services/animals.service");
jest.mock("../../services/animals.service");

jest.mock("express-validator", () => {
  const original = jest.requireActual("express-validator");
  return {
    ...original,
    validationResult: () => ({
      isEmpty: () => false,
      array: () => [{ msg: "El nombre es obligatorio" }]
    }),
  };
});

const httpMocks = require("node-mocks-http");

describe("Animals Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAnimals devuelve lista de animales", async () => {
    const mockData = [{ id: 1, name: "Luna", species: "Perro" }];
    animalService.getAllAnimals.mockResolvedValue(mockData);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await getAnimals(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockData);
  });

  test("getAnimal devuelve 404 si no existe", async () => {
    animalService.getAnimalById.mockResolvedValue(null);

    const req = httpMocks.createRequest({ params: { id: 999 } });
    const res = httpMocks.createResponse();

    await getAnimal(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ error: "Animal no encontrado" });
  });

  test("createAnimal responde 400 si hay errores de validación", async () => {
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();

    await createAnimal(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().errors).toBeDefined();
  });

  test("deleteAnimal devuelve 204 si todo va bien", async () => {
    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    await deleteAnimal(req, res);
    expect(res.statusCode).toBe(204);
  });
});
