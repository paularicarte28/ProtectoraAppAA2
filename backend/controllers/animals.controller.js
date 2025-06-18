const { validationResult } = require("express-validator");
const animalService = require("../services/animals.service");

const getAnimals = async (req, res) => {
  const animals = await animalService.getAllAnimals();
  res.json(animals);
};

const getAnimal = async (req, res) => {
  const animal = await animalService.getAnimalById(req.params.id);
  if (!animal) return res.status(404).json({ error: "Animal no encontrado" });
  res.json(animal);
};

const createAnimal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const id = await animalService.createAnimal(req.body);
  res.status(201).json({ id });
};

const updateAnimal = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  await animalService.updateAnimal(req.params.id, req.body);
  res.status(204).end();
};

const deleteAnimal = async (req, res) => {
  await animalService.deleteAnimal(req.params.id);
  res.status(204).end();
};

module.exports = {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
