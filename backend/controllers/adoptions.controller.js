const { validationResult } = require("express-validator");
const adoptionService = require("../services/adoptions.service");

const getAdoptions = async (req, res) => {
  const adoptions = await adoptionService.getAllAdoptions();
  res.json(adoptions);
};

const createAdoption = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { animal_id, adopter_id, adoption_date } = req.body;

  const id = await adoptionService.createAdoption({ animal_id, adopter_id, adoption_date });
  res.status(201).json({ id });
};

const deleteAdoption = async (req, res) => {
  await adoptionService.deleteAdoption(req.params.id);
  res.status(204).end();
};

module.exports = {
  getAdoptions,
  createAdoption,
  deleteAdoption,
};
