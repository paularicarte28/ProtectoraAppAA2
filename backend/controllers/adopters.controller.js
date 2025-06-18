const { validationResult } = require("express-validator");
const adopterService = require("../services/adopters.service");

const getAdopters = async (req, res) => {
  const adopters = await adopterService.getAllAdopters();
  res.json(adopters);
};

const getAdopter = async (req, res) => {
  const adopter = await adopterService.getAdopterById(req.params.id);
  if (!adopter) return res.status(404).json({ error: "Adoptante no encontrado" });
  res.json(adopter);
};

const createAdopter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const id = await adopterService.createAdopter(req.body);
  res.status(201).json({ id });
};

const updateAdopter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  await adopterService.updateAdopter(req.params.id, req.body);
  res.status(204).end();
};

const deleteAdopter = async (req, res) => {
  await adopterService.deleteAdopter(req.params.id);
  res.status(204).end();
};

module.exports = {
  getAdopters,
  getAdopter,
  createAdopter,
  updateAdopter,
  deleteAdopter,
};
