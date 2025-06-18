const {
  getAdoptions,
  createAdoption,
  deleteAdoption,
} = require("../../controllers/adoptions.controller");

const adoptionService = require("../../services/adoptions.service");
jest.mock("../../services/adoptions.service");

// simular errores validacion
jest.mock("express-validator", () => {
  const original = jest.requireActual("express-validator");
  return {
    ...original,
    validationResult: () => ({
      isEmpty: () => false,
      array: () => [{ msg: "El campo animal_id es obligatorio" }]
    }),
  };
});

const httpMocks = require("node-mocks-http");

describe("Adoptions Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAdoptions devuelve lista de adopciones", async () => {
    const mockData = [
      { id: 1, animal_name: "Luna", adopter_name: "Juan", adoption_date: "2024-01-01" }
    ];
    adoptionService.getAllAdoptions.mockResolvedValue(mockData);

    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    await getAdoptions(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(mockData);
  });

  test("createAdoption responde 400 si hay errores de validación", async () => {
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();

    await createAdoption(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData().errors).toBeDefined();
  });

  test("deleteAdoption devuelve 204 si todo va bien", async () => {
    const req = httpMocks.createRequest({ params: { id: 1 } });
    const res = httpMocks.createResponse();

    await deleteAdoption(req, res);
    expect(res.statusCode).toBe(204);
  });
});
